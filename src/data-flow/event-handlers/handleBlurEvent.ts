import { DataFlowState } from "../../types";
import { getDomInputValue } from "../getDomInputValue";
import { hydrateFormState } from "../hydrateFormState";
import { validateFormState } from "../validateFormState";

export function handleBlurEvent<Schema>(dataFlowState: DataFlowState<Schema>): void {
  const { options } = dataFlowState;
  const targetInput = dataFlowState.event.nativeEvent?.target as HTMLInputElement;

  if (!targetInput || !targetInput.name) return;

  // 1. Conditional execution and revalidation
  const hasOnBlurMode = options.mode === "onBlur" || options.mode === "onBlurUnlessError";
  const shouldRevalidate =
    dataFlowState.errorData.errors[targetInput.name as keyof Schema] &&
    dataFlowState.options.errorRevalidateMode === "onBlur" &&
    (options.mode === "onBlurUnlessError" || options.mode === "onSubmitUnlessError");

  const shouldExecute = hasOnBlurMode || shouldRevalidate;
  if (!shouldExecute) return;

  // 2. Hydrate form state from DOM inputs
  hydrateFormState(dataFlowState, [targetInput.name]);

  // 3. Populate changedData with the single input value that has changed
  const value = getDomInputValue(dataFlowState);
  dataFlowState.changedData[targetInput.name as keyof Schema] = value;

  // 4. Validate form state (validates only changedData)
  validateFormState(dataFlowState);

  // DEBUG: Feedback for changeReason
  if (hasOnBlurMode)
    dataFlowState.changeReason = `Blur form - ${options.mode} mode.\nSource: ${dataFlowState.event.source}`;
  if (shouldRevalidate)
    dataFlowState.changeReason = `Blur form - error revalidation.\nSource: ${dataFlowState.event.source}`;

  // 5. Trigger callback
  if (hasOnBlurMode) {
    dataFlowState.callbacks.onChange(dataFlowState.formState);
  }
}
