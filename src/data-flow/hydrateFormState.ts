import { DataFlowState } from "../types";
import { transformValueType } from "./transformValueType";

export function hydrateFormState<Schema>(dataFlowState: DataFlowState<Schema>): void {
  // Explicit "any" because of TS issue - https://github.com/microsoft/TypeScript/issues/19437
  const domFormElem = (document.forms as any)[dataFlowState.options.name];

  // Use defaultValues instead of formState when hydrating formState
  Object.keys(dataFlowState.options.defaultValues).forEach(key => {
    const domInputElem = domFormElem.elements[key] as HTMLInputElement | undefined;

    if (domInputElem) {
      const value = domInputElem.type === "checkbox" ? domInputElem.checked : domInputElem.value;
      (dataFlowState.formState as any)[key] = transformValueType(value, dataFlowState.options.defaultValues[key]);
    }
  });
}
