import { DataFlowState } from "../types";
import { transformValueType } from "./transformValueType";

export function getDomInputValue<Schema>(dataFlowState: DataFlowState<Schema>): any {
  const targetInput = dataFlowState.event.nativeEvent?.target as HTMLInputElement;

  if (!targetInput || !targetInput.name) {
    return;
  }

  if (!(dataFlowState.fieldsData.names as any)[targetInput.name]) {
    return;
  }

  const value = targetInput.type === "checkbox" ? targetInput.checked : targetInput.value;
  return transformValueType(targetInput.name as keyof Schema, value, dataFlowState);
}
