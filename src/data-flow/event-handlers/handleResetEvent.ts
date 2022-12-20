import { DataFlowState, EventType } from "../../types";
import { hydrateDomInputs } from "../../utils/hydrateDomInputs";
import { transformValueType } from "../transformValueType";
import { validateFormState } from "../validateFormState";

export function handleResetEvent<Schema>(dataFlowState: DataFlowState<Schema>): void {
  if (dataFlowState.event.value) {
    // Reset form to values supplied by the user
    dataFlowState.changedData = { ...dataFlowState.event.value };
    // Testing & debugging info
    dataFlowState.changeReason = `Reset form with provided values. Source: ${dataFlowState.event.source}`;
  } else {
    // Reset form to default values
    dataFlowState.changedData = { ...dataFlowState.options.defaultValues };
    // Testing & debugging info
    dataFlowState.changeReason = `Reset form to defaults. Source: ${dataFlowState.event.source}`;
  }

  // Only update formState when not initializing - reset is also used in initialization
  if (dataFlowState.event.type !== EventType.FormInit) {
    for (let key in dataFlowState.changedData) {
      (dataFlowState.formState as any)[key] = transformValueType(
        dataFlowState.changedData[key],
        dataFlowState.options.defaultValues[key],
      );
    }

    // Trigger callback
    dataFlowState.callbacks.onChange(dataFlowState.formState);
  } else {
    // Testing & debugging info
    dataFlowState.changeReason = "";
  }

  hydrateDomInputs(dataFlowState.options, dataFlowState.formState);

  // Conditionally validate - no validation on init unless requested
  if (dataFlowState.event.type === EventType.FormInit && !dataFlowState.options.validateAfterInit) return;
  validateFormState(dataFlowState);
}
