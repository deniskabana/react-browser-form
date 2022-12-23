import { DataFlowState, EventSource, EventType } from "../../types";
import { hydrateDomInputs } from "../../utils/hydrateDomInputs";
import { getDomInputValue } from "../getDomInputValue";
import { hydrateFormState } from "../hydrateFormState";
import { transformValueType } from "../transformValueType";
import { validateFormState } from "../validateFormState";

export function handleChangeEvent<Schema>(dataFlowState: DataFlowState<Schema>): void {
  const { options } = dataFlowState;

  // 1. USER CHANGE EVENT
  // --------------------------------------------------------------------------------

  if (dataFlowState.event.source === EventSource.User) {
    if (dataFlowState.event.type !== EventType.FormInit) {
      // DEBUG: Feedback for changeReason
      dataFlowState.changeReason = `Change form values programatically.\nSource: ${dataFlowState.event.source}`;
    }

    const eventValue = dataFlowState.event.value;
    if (!eventValue) return;

    // 1.1. Set form to dirty. This is done on the first change, with no deep comparison
    if (!dataFlowState.isDirty) dataFlowState.setIsDirty(true);

    // 1.2. Populate changedData, quit if no value was provided
    dataFlowState.changedData = eventValue;

    // 1.3. Validate form state (validates only changedData)
    validateFormState(dataFlowState);

    // 1.4. Populate formState with transformed data
    // TODO: Figure out a better way to do transformations
    for (let key in dataFlowState.changedData) {
      (dataFlowState.formState as any)[key] = transformValueType(
        key as keyof Schema,
        dataFlowState.changedData[key],
        dataFlowState,
      );
    }

    // 1.5. Hydrate DOM inputs from form state
    hydrateDomInputs(options, dataFlowState.formState);

    // 1.6. Trigger callback
    dataFlowState.callbacks.onChange({ ...dataFlowState.formState });
  }

  // 2. FORM CHANGE EVENT
  // --------------------------------------------------------------------------------

  if (dataFlowState.event.source === EventSource.Form) {
    const targetInput = dataFlowState.event.nativeEvent?.target as HTMLInputElement;
    const fieldName = targetInput?.name;

    if (!targetInput || !fieldName) return;

    // 2.1. Set form to dirty. This is done on the first change, with no deep comparison
    if (!dataFlowState.isDirty && targetInput && fieldName) dataFlowState.setIsDirty(true);

    // 2.2. Conditional execution and revalidation
    const hasOnChangeMode = options.mode === "onChange";
    const isLiveField = options.liveChangeFields.includes(fieldName as keyof Schema);
    const shouldRevalidate =
      isLiveField ||
      (options.errorRevalidateMode === "onChange" && dataFlowState.errorData.errors[fieldName as keyof Schema]);

    const shouldExecute = hasOnChangeMode || shouldRevalidate;
    if (!shouldExecute) return;

    // 2.3. Hydrate form state from DOM inputs
    hydrateFormState(dataFlowState, [fieldName]);

    // 2.4. Populate changedData with the single input value that has changed
    const value = getDomInputValue(dataFlowState);
    dataFlowState.changedData[fieldName as keyof Schema] = value;

    // 2.5. Populate formState with transformed data
    // TODO: Figure out a better way to do transformations
    dataFlowState.formState[fieldName as keyof Schema] = transformValueType(
      fieldName as keyof Schema,
      value,
      dataFlowState,
    );

    // 2.6. If live field changed, populate changedData with all errored fields for revalidation - live fields are often conditional / dependent
    if (isLiveField) {
      for (let key in dataFlowState.errorData.errors) {
        dataFlowState.changedData[key] = dataFlowState.formState[key];
      }
    }

    // 2.7. Validate form state (validates only changedData)
    validateFormState(dataFlowState);

    // DEBUG: Feedback for changeReason
    if (hasOnChangeMode)
      dataFlowState.changeReason = `Changed form state - onChange mode.\nSource: ${dataFlowState.event.source}`;
    if (shouldRevalidate)
      dataFlowState.changeReason = `Changed form state - error revalidation.\nSource: ${dataFlowState.event.source}`;
    if (isLiveField)
      dataFlowState.changeReason = `Changed form state - live field.\nSource: ${dataFlowState.event.source}`;

    // 2.8. Trigger callback
    if (hasOnChangeMode || isLiveField) {
      dataFlowState.callbacks.onChange(dataFlowState.formState);
    }
  }
}
