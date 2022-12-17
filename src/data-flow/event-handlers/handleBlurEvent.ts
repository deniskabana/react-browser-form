import { DataFlowState } from "../../types";
import { getDomInputValue } from "../getDomInputValue";
import { hydrateFormState } from "../hydrateFormState";
import { validateFormState } from "../validateFormState";

export function handleBlurEvent<Schema>(dataFlowState: DataFlowState<Schema>): void {
  const targetInput = dataFlowState.event.nativeEvent?.target as HTMLInputElement;
  const { options } = dataFlowState;

  // Conditional execution
  const hasOnBlurMode = options.mode === "onBlur" || options.mode === "onBlurUnlessError";
  const shouldRevalidate =
    dataFlowState.options.errorRevalidateMode === "onBlur" &&
    dataFlowState.errors.errorData[targetInput.name as keyof Schema];

  const shouldExecute = hasOnBlurMode || shouldRevalidate;
  if (!shouldExecute) return;

  hydrateFormState(dataFlowState);
  const value = getDomInputValue(dataFlowState);
  dataFlowState.changedData[targetInput.name as keyof Schema] = value;
  validateFormState(dataFlowState);

  // Testing & debugging info
  if (hasOnBlurMode) dataFlowState.changeReason = `Blur form - onBlurX mode. Source: ${dataFlowState.event.source}`;
  if (shouldRevalidate)
    dataFlowState.changeReason = `Blur form - error revalidation. Source: ${dataFlowState.event.source}`;

  // Trigger callback
  if (hasOnBlurMode) {
    dataFlowState.callbacks.onChange(dataFlowState.formState);
  }
}
