import { DataFlowState, EventSource } from "../../types";
import { hydrateDomInputs } from "../../utils/hydrateDomInputs";
import { getDomInputValue } from "../getDomInputValue";
import { hydrateFormState } from "../hydrateFormState";
import { transformValueType } from "../transformValueType";
import { validateFormState } from "../validateFormState";

export function handleChangeEvent<Schema>(dataFlowState: DataFlowState<Schema>): void {
  const { options } = dataFlowState;
  // Conditional execution
  const hasOnChangeMode = options.mode === "onChange";

  // USER CHANGE EVENT
  // --------------------------------------------------------------------------------
  if (dataFlowState.event.source === EventSource.User) {
    const eventValue = dataFlowState.event.value;

    if (!dataFlowState.isDirty) dataFlowState.setIsDirty(true);

    if (!eventValue) return;
    dataFlowState.changedData = eventValue;

    for (let key in dataFlowState.changedData) {
      (dataFlowState.formState as any)[key] = transformValueType(
        dataFlowState.changedData[key],
        dataFlowState.options.defaultValues[key]
      );
    }

    validateFormState(dataFlowState);
    hydrateDomInputs(dataFlowState.options, dataFlowState.formState);

    // Trigger callback
    dataFlowState.callbacks.onChange({ ...dataFlowState.formState });
  }

  // FORM CHANGE EVENT
  // --------------------------------------------------------------------------------
  if (dataFlowState.event.source === EventSource.Form) {
    const targetInput = dataFlowState.event.nativeEvent?.target as HTMLInputElement;

    if (!dataFlowState.isDirty && targetInput && targetInput.name) dataFlowState.setIsDirty(true);

    // Validate fields with errors only to save performance and improve UX
    const shouldRevalidate =
      options.errorRevalidateMode === "onChange" && dataFlowState.errors.errorData[targetInput.name as keyof Schema];
    const isLiveField = options.liveChangeFields.includes(targetInput.name as keyof Schema);

    const shouldExecute = hasOnChangeMode || shouldRevalidate || isLiveField;
    if (!shouldExecute) return;

    hydrateFormState(dataFlowState);

    const value = getDomInputValue(dataFlowState);
    dataFlowState.changedData[targetInput.name as keyof Schema] = value;
    dataFlowState.formState[targetInput.name as keyof Schema] = value;

    // Treating all errored fields as changed data will force re-validation and state update
    // This allows to use conditional fields with validation
    if (isLiveField) {
      for (let key in dataFlowState.errors.errorData) {
        dataFlowState.changedData[key] = dataFlowState.formState[key];
      }
    }

    if (shouldRevalidate || isLiveField) validateFormState(dataFlowState);

    // Testing & debugging info
    if (hasOnChangeMode)
      dataFlowState.changeReason = `Changed form state - onChange mode. Source: ${dataFlowState.event.source}`;
    if (shouldRevalidate)
      dataFlowState.changeReason = `Changed form state - error revalidation. Source: ${dataFlowState.event.source}`;
    if (isLiveField)
      dataFlowState.changeReason = `Changed form state - live field. Source: ${dataFlowState.event.source}`;

    // Trigger callback
    if (hasOnChangeMode || isLiveField) {
      dataFlowState.callbacks.onChange(dataFlowState.formState);
    }
  }
}
