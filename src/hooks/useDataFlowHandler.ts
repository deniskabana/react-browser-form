import { DataFlowEvent, DataFlowState, EventType, HandleDataFlow } from "../types";
import { handleBlurEvent } from "../data-flow/event-handlers/handleBlurEvent";
import { handleChangeEvent } from "../data-flow/event-handlers/handleChangeEvent";
import { handleResetEvent } from "../data-flow/event-handlers/handleResetEvent";
import { handleSubmitEvent } from "../data-flow/event-handlers/handleSubmitEvent";
import { logError } from "../utils/logError";

export function useDataFlowHandler<Schema>(
  options: DataFlowState<Schema>["options"],
  formState: DataFlowState<Schema>["formState"],
  fieldsData: DataFlowState<Schema>["fieldsData"],
  callbacks: DataFlowState<Schema>["callbacks"],
  errors: DataFlowState<Schema>["errors"],
  setErrors: DataFlowState<Schema>["setErrors"],
  isDirty: DataFlowState<Schema>["isDirty"],
  setIsDirty: DataFlowState<Schema>["setIsDirty"]
): HandleDataFlow<Schema> {
  return function handleDataFlow(event: DataFlowEvent<Schema>) {
    // An object reference to be passed around to all data flow functions
    const dataFlowState: DataFlowState<Schema> = {
      hasErrors: errors.count > 0,
      event,
      options,
      changedData: {},
      formState,
      fieldsData,
      callbacks,
      errors,
      setErrors,
      isDirty,
      setIsDirty,
      // Debug, dev and test helper
      changeReason: null,
    };

    switch (event.type) {
      case EventType.Submit:
        handleSubmitEvent(dataFlowState);
        break;

      case EventType.Reset:
        handleResetEvent(dataFlowState);
        break;

      case EventType.Change:
        handleChangeEvent(dataFlowState);
        break;

      case EventType.Blur:
        handleBlurEvent(dataFlowState);
        break;

      case EventType.FormInit:
        handleResetEvent(dataFlowState);
        break;

      default:
        logError("data-flow", "An unsupported event type provided");
    }
  };
}
