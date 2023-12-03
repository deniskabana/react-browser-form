import { DataFlowState, EventType } from "../../types";
import { hydrateDomInputs } from "../../utils/hydrateDomInputs";
import { transformValueType } from "../transformValueType";
import { validateFormState } from "../validateFormState";

export function handleResetEvent<Schema>(dataFlowState: DataFlowState<Schema>): void {
  const shouldResetWithValues = !!dataFlowState.event.value;

  // 1. Populate changedData with values if provided, with defaultValues otherwise
  if (shouldResetWithValues) {
    dataFlowState.changedData = { ...dataFlowState.event.value };
    // DEBUG: Feedback for changeReason
    dataFlowState.changeReason = `Reset form with provided values.\nSource: ${dataFlowState.event.source}`;
  } else {
    dataFlowState.changedData = { ...dataFlowState.options.defaultValues };
    // DEBUG: Feedback for changeReason
    dataFlowState.changeReason = `Reset form to defaults.\nSource: ${dataFlowState.event.source}`;
  }

  // 2. Populate formState with transformed data, IF NOT A FORM INIT EVENT
  if (dataFlowState.event.type !== EventType.FormInit) {
    // Reset dirty fields and isDirty
    dataFlowState.isDirty = false;
    dataFlowState.setDirtyFields([]);

    for (let key in dataFlowState.changedData) {
      (dataFlowState.formState as any)[key] = transformValueType(
        key as keyof Schema,
        dataFlowState.changedData[key],
        dataFlowState,
      );
    }
  } else {
    // DEBUG: Provide no change reason if initializing the form
    dataFlowState.changeReason = "";
  }

  // 3. Hydrate DOM inputs from form state
  hydrateDomInputs(dataFlowState.options, dataFlowState.formState);

  // 4. Validate form state if not initializing or requested upon initialization (validates only changedData)
  if (dataFlowState.event.type !== EventType.FormInit || dataFlowState.options.validateAfterInit) {
    validateFormState(dataFlowState);
  }

  // 5. Trigger callback
  if (dataFlowState.event.type !== EventType.FormInit) {
    dataFlowState.callbacks.onChange(dataFlowState.formState);
  }
}
