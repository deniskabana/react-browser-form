import { DataFlowState } from "../types";
import { logError } from "../utils/logError";
import { transformValueType } from "./transformValueType";

export function getDomInputValue<Schema>(dataFlowState: DataFlowState<Schema>): any {
  const targetInput = dataFlowState.event.nativeEvent?.target as HTMLInputElement;

  if (!targetInput || !targetInput.name) {
    logError("event", "No DOM input element was targeted on form blur.");
    return;
  }

  if (!(dataFlowState.fieldsData.names as any)[targetInput.name]) {
    logError("event", "This DOM input name was not provided in schema.");
    return;
  }

  const value = targetInput.type === "checkbox" ? targetInput.checked : targetInput.value;
  return transformValueType(value, dataFlowState.options.defaultValues[targetInput.name]);
}
