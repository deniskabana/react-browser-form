import { DataFlowEvent, DataFlowState, EventType, HandleDataFlow } from "../types";
import { handleBlurEvent } from "../data-flow/event-handlers/handleBlurEvent";
import { handleChangeEvent } from "../data-flow/event-handlers/handleChangeEvent";
import { handleResetEvent } from "../data-flow/event-handlers/handleResetEvent";
import { handleSubmitEvent } from "../data-flow/event-handlers/handleSubmitEvent";
import { logError } from "../utils/logError";
import { setDebugData } from "../utils/setDebugData";

// TODO: Consider changing dataFlowState structure to object of getters/setters for cleaner code if no performance impact
export function useDataFlowHandler<Schema>(
  options: DataFlowState<Schema>["options"],
  formState: DataFlowState<Schema>["formState"],
  fieldsData: DataFlowState<Schema>["fieldsData"],
  callbacks: DataFlowState<Schema>["callbacks"],
  errorData: DataFlowState<Schema>["errorData"],
  setErrors: DataFlowState<Schema>["setErrors"],
  isDirty: DataFlowState<Schema>["isDirty"],
  setIsDirty: DataFlowState<Schema>["setIsDirty"],
): HandleDataFlow<Schema> {
  return function handleDataFlow(event: DataFlowEvent<Schema>) {
    // An object reference to be passed around to all data flow functions
    const dataFlowState: DataFlowState<Schema> = {
      hasErrors: errorData.count > 0,
      event,
      options,
      changedData: {},
      formState,
      fieldsData,
      callbacks,
      errorData,
      setErrors,
      isDirty,
      setIsDirty,
      changeReason: "",
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

    setDebugData(
      {
        formState: dataFlowState.formState,
        changeReason: dataFlowState.changeReason,
        event: dataFlowState.event,
      },
      options,
    );
  };
}
