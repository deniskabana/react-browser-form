import { useEffect, useRef } from "react";
import { DEFAULT_OPTIONS } from "../constants";
import { useDataFlowHandler } from "../hooks/useDataFlowHandler";
import { useErrorManager } from "../hooks/useErrorManager";
import { useFormEventHandlers } from "../hooks/useFormEventHandlers";
import {
  BrowserFormOptions,
  BrowserFormOptionsInput,
  BrowserFormReturnType,
  EventSource,
  EventType,
  FieldsData,
  FormComponentProps,
  UserCallbacks,
} from "../types";
import { getFieldsData } from "../utils/getFieldsData";
import { protectOptionsCominations } from "../utils/protectOptionsCombinations";
import { setDebugData } from "../utils/setDebugData";
import { uniqueNameProtection } from "../utils/uniqueNameProtection";
import { useDirtyFieldsManager } from "./useDirtyFieldsManager";

/**
 * **React Browser Form** - React form state management written in TypeScript with performance and developer experience in mind.
 * Flexible and with built-in validation.
 * - [GitHub](https://github.com/deniskabana/react-browser-form)
 * - [Documentation](https://deniskabana.github.io/react-browser-form/)
 * - [Examples](https://deniskabana.github.io/react-browser-form/examples)
 */
export function useBrowserForm<Schema extends {}>(
  userOptions: BrowserFormOptionsInput<Schema>,
): BrowserFormReturnType<Schema> {
  protectOptionsCominations(userOptions);

  // INTERNAL STATE AND CONFIG
  // --------------------------------------------------------------------------------
  const options = useRef<BrowserFormOptions<Schema>>({
    ...DEFAULT_OPTIONS,
    ...(userOptions as any),
  }).current;

  const formState = useRef<Schema>({ ...options.defaultValues }).current;
  // Errors are stateful to trigger React's built-in re-rendering of DOM in children with new data
  const { errorData, setErrors } = useErrorManager<Schema>();
  const { isDirty, setIsDirty, dirtyFields, setDirtyFields } = useDirtyFieldsManager<Schema>();

  // STORED REFERENCES
  // --------------------------------------------------------------------------------
  const fieldsData = useRef<FieldsData<Schema>>(Object.freeze(getFieldsData(options))).current;
  const callbacks = useRef<UserCallbacks<Schema>>({
    onChange: data => options?.onChange && options.onChange({ ...data }),
    onSubmit: data => options?.onSubmit && options.onSubmit({ ...data }),
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
    setDirtyFields,
  );
  const formEventHandlers = useFormEventHandlers(handleDataFlow);

  // INITIALIZATION
  // --------------------------------------------------------------------------------
  useEffect(() => {
    uniqueNameProtection(options);
    handleDataFlow({ source: EventSource.User, type: EventType.FormInit, value: options.defaultValues });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // FORM COMPONENT PROPS
  // --------------------------------------------------------------------------------
  const formProps: FormComponentProps<Schema> = { ...formEventHandlers[EventSource.Form], name: options.name };

  // RETURN
  // --------------------------------------------------------------------------------
  const returnData: BrowserFormReturnType<Schema> = {
    // Values
    errorData,
    isDirty,
    dirtyFields,
    names: fieldsData.names,
    // Methods
    ...formEventHandlers[EventSource.User],
    // Form props
    formProps,
  };

  setDebugData({ returnData, formState }, options, true);

  return returnData;
}
