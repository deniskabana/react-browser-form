import { DataFlowState } from "../../types";
import { setDebugData } from "../../utils/setDebugData";
import { hydrateFormState } from "../hydrateFormState";
import { validateFormState } from "../validateFormState";

export function handleSubmitEvent<Schema>(dataFlowState: DataFlowState<Schema>): void {
  // DEBUG: Feedback for changeReason
  dataFlowState.changeReason = `Form submitted.\nSource: ${dataFlowState.event.source}`;

  // 1. Hydrate form state from DOM inputs
  hydrateFormState(dataFlowState);

  // 2. Populate changedData
  dataFlowState.changedData = dataFlowState.formState;

  // 3. Validate form state (validates only changedData)
  validateFormState(dataFlowState);

  // 4. Trigger callback if there are no errors
  if (!dataFlowState.hasErrors) {
    dataFlowState.callbacks.onSubmit(dataFlowState.formState);

    // DEBUG: Feedback from submit event
    setDebugData({ isSubmitted: true }, dataFlowState.options);
  }
}
