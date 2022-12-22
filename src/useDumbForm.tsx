import React from "react";
import { DEFAULT_OPTIONS } from "./constants";
import { useDataFlowHandler } from "./hooks/useDataFlowHandler";
import { useErrorManager } from "./hooks/useErrorManager";
import { useFormEventHandlers } from "./hooks/useFormEventHandlers";
import {
  DumbFormOptions,
  DumbFormOptionsInput,
  DumbFormReturnType,
  EventSource,
  EventType,
  FieldsData,
  FormComponentProps,
  UserCallbacks,
} from "./types";
import { getFieldsData } from "./utils/getFieldsData";
import { protectOptionsCominations } from "./utils/protectOptionsCombinations";
import { setDebugData } from "./utils/setDebugData";
import { uniqueNameProtection } from "./utils/uniqueNameProtection";

/**
 * **React Dumb Form** - The simplest forms wrapper you will ever use in React.
 * LINKS (TODO):
 * - [API and documentation](https://github.com/deniskabana/react-dumb-form).
 * - [Examples](https://github.com/deniskabana/react-dumb-form/tree/main/examples).
 * @param options **Options can not be changed once initialized to prevent side effects.**
 */
export function useDumbForm<Schema extends {}>(userOptions: DumbFormOptionsInput<Schema>): DumbFormReturnType<Schema> {
  // INTERNAL STATE AND CONFIG
  // --------------------------------------------------------------------------------
  const options = React.useRef<DumbFormOptions<Schema>>({
    ...DEFAULT_OPTIONS,
    ...(userOptions as any),
  }).current;
  const formState = React.useRef<Schema>({ ...options.defaultValues }).current;
  // Errors are stateful to trigger React's built-in re-rendering of DOM in children with new data
  const { errorData, setErrors } = useErrorManager<Schema>();
  const [isDirty, setIsDirty] = React.useState(false);

  // STORED REFERENCES
  // --------------------------------------------------------------------------------
  const fieldsData = React.useRef<FieldsData<Schema>>(Object.freeze(getFieldsData(options))).current;
  const callbacks = React.useRef<UserCallbacks<Schema>>({
    onChange: data => options?.onChange && options.onChange({ ...data }),
    onSubmit: data => options.onSubmit({ ...data }),
  }).current;

  // INTERNAL FUNCTIONS
  // --------------------------------------------------------------------------------
  const handleDataFlow = useDataFlowHandler(
    options,
    formState,
    fieldsData,
    callbacks,
    errorData,
    setErrors,
    isDirty,
    setIsDirty,
  );
  const formEventHandlers = useFormEventHandlers(handleDataFlow, options);

  // INITIALIZATION
  // --------------------------------------------------------------------------------
  React.useEffect(() => {
    protectOptionsCominations(options);
    uniqueNameProtection(options);
    handleDataFlow({ source: EventSource.User, type: EventType.FormInit, value: options.defaultValues });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // FORM COMPONENT PROPS
  // --------------------------------------------------------------------------------
  const formProps: FormComponentProps<Schema> = { ...formEventHandlers[EventSource.Form], name: options.name };

  // RETURN
  // --------------------------------------------------------------------------------
  const returnData: DumbFormReturnType<Schema> = {
    // Values
    errorData,
    isDirty,
    names: fieldsData.names,
    // Methods
    ...formEventHandlers[EventSource.User],
    // Form props
    formProps,
  };

  setDebugData({ returnData }, options);

  return returnData;
}
