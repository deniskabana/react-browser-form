import { DataFlowState } from "../../types";
import { hydrateFormState } from "../hydrateFormState";
import { validateFormState } from "../validateFormState";

export function handleSubmitEvent<Schema>(dataFlowState: DataFlowState<Schema>): void {
  hydrateFormState(dataFlowState);

  dataFlowState.changedData = dataFlowState.formState;
  // Testing & debugging info
  dataFlowState.changeReason = `Form submitted. Source: ${dataFlowState.event.source}`;

  validateFormState(dataFlowState);

  // Condiitonally only submit if there are no errors
  if (!dataFlowState.hasErrors) {
    // Return a new object instance since RDF internally uses a ref for formState
    dataFlowState.callbacks.onSubmit(dataFlowState.formState);
  }
}
