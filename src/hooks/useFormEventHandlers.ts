import {
  EventSource,
  EventType,
  FormEventHandler,
  FormEventHandlers,
  HandleDataFlow,
  UserEventHandler,
} from "../types";

export function useFormEventHandlers<Schema>(handleDataFlow: HandleDataFlow<Schema>): FormEventHandlers<Schema> {
  // USER EVENTS
  // --------------------------------------------------------------------------------
  const handleUserSetValues: UserEventHandler<Schema> = value => {
    handleDataFlow({ source: EventSource.User, type: EventType.Change, value });
  };
  const handleUserSubmit: UserEventHandler<Schema> = () => {
    handleDataFlow({ source: EventSource.User, type: EventType.Submit });
  };
  const handleUserReset: UserEventHandler<Schema> = value => {
    handleDataFlow({ source: EventSource.User, type: EventType.Reset, value });
  };

  // DOM FORM EVENTS
  // --------------------------------------------------------------------------------
  const handleFormChange: FormEventHandler = event => {
    handleDataFlow({ source: EventSource.Form, type: EventType.Change, nativeEvent: event });
  };
  const handleFormSubmit: FormEventHandler = event => {
    event.preventDefault();
    handleDataFlow({ source: EventSource.Form, type: EventType.Submit, nativeEvent: event });
  };
  const handleFormBlur: FormEventHandler = event => {
    handleDataFlow({ source: EventSource.Form, type: EventType.Blur, nativeEvent: event });
  };
  const handleFormReset: FormEventHandler = event => {
    // A deliberately unsupported event! Stop exeuction.
    event.preventDefault();
    handleDataFlow({ source: EventSource.Form, type: EventType.Reset, nativeEvent: event });
  };

  return {
    // Exposed methods
    [EventSource.User]: {
      setValues: handleUserSetValues,
      submit: handleUserSubmit,
      reset: handleUserReset,
    },
    // Form handlers
    [EventSource.Form]: {
      onChange: handleFormChange,
      onSubmit: handleFormSubmit,
      onBlur: handleFormBlur,
      onReset: handleFormReset,
    },
  };
}
