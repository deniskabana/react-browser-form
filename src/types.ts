// BROWSER FORM HOOK TYPES
// --------------------------------------------------------------------------------

/** An options object to configure how you use this form.
 * - [Options API](https://deniskabana.github.io/react-browser-form/documentation/options-api)
 */
export interface BrowserFormOptionsInput<Schema> {
  /**
   * Form DOM name attribute - **must be unique**. Used to access inputs through `document.forms`, to read all events and hydrate the form data and the DOM inputs.
   * - [Options API](https://deniskabana.github.io/react-browser-form/documentation/options-api)
   */
  name: string;

  /**
   * Default values need to match your schema. **Do not change these - it will result in incorrect behavior.**
   * - [Options API](https://deniskabana.github.io/react-browser-form/documentation/options-api)
   */
  defaultValues: Schema & { [key: string]: any };

  /**
   * A callback for when the form is submitted. **Will not trigger if there are errors during validation!**
   * - [Options API](https://deniskabana.github.io/react-browser-form/documentation/options-api)
   */
  onSubmit?: (data: Schema) => void;

  /**
   * This method is useful when using `onChange` mode, live fields, setting or resetting values, etc.
   * - [Options API](https://deniskabana.github.io/react-browser-form/documentation/options-api)
   */
  onChange?: (data: Schema) => void;

  /**
   * A dead-simple validation with a validator schema that has access to single field and all form data. Throw `ValidationError` with an error message if field validation fails.
   * - [Options API](https://deniskabana.github.io/react-browser-form/documentation/options-api)
   * - [Documentation](https://deniskabana.github.io/react-browser-form/documentation/validation-and-transformation)
   * - [Examples](https://deniskabana.github.io/react-browser-form/examples/validation)
   */
  validationSchema?: ValidationSchema<Schema>;

  /**
   * A dead-simple type and value transformation schema. Useful when you need easy data processing, input masking or just recast types.
   * - [Options API](https://deniskabana.github.io/react-browser-form/documentation/options-api)
   * - [Documentation](https://deniskabana.github.io/react-browser-form/documentation/validation-and-transformation)
   * - [Example](https://deniskabana.github.io/react-browser-form/examples/advanced/value-transformation)
   */
  transformationSchema?: TransformationSchema<Schema>;

  /**
   * Whether to perform validation right after mounting the form - before the first render.
   * - [Options API](https://deniskabana.github.io/react-browser-form/documentation/options-api)
   */
  validateAfterInit?: boolean;

  /**
   * Options:
   * - `onSubmitUnlessError`: Hydrate and validate upon form submit event. Inputs with errors re-validate on input change until the error is resolved.
   * - `onSubmit`: Hydrate and validate upon form submit event. The fastest option if not validating, reliant on browser handling and keeping inputs mounted.
   * - `onBlurUnlessError`: Hydrate and validate the form on every input blur. Inputs with errors re-validate on input change until the error is resolved.
   * - `onBlur`: Hydrate and validate the form on every input blur. Recommended for forms with more complex validation logic.
   * - `onChange`: The React way of handling forms. - the slowest method. Only good for live data handling. It is recommended to use live fields instead.
   *
   * Further reading:
   * - [Options API](https://deniskabana.github.io/react-browser-form/documentation/options-api)
   * - [Example](https://deniskabana.github.io/react-browser-form/examples/basic/form-modes)
   *
   * @default "onSubmitUnlessError"
   */
  mode?: "onSubmitUnlessError" | "onSubmit" | "onBlurUnlessError" | "onBlur" | "onChange";

  /**
   * A revalidation strategy for inputs with errors. To be used with any *unlessError mode. Choose `onBlur` if your validation is demanding.
   * - [Options API](https://deniskabana.github.io/react-browser-form/documentation/options-api)
   * - [Example](https://deniskabana.github.io/react-browser-form/examples/validation/revalidation-strategies)
   *
   * @default "onChange"
   */
  revalidationStrategy?: "onChange" | "onBlur";

  /**
   * A subset of fields that will trigger update and validation of specified fields on every input change. Useful for conditional operations within forms, dependent fields, etc.
   * - [Options API](https://deniskabana.github.io/react-browser-form/documentation/options-api)
   * - [Example](https://deniskabana.github.io/react-browser-form/examples/advanced/live-fields)
   */
  liveFields?: (keyof Schema)[];

  /** **DO NOT USE IN PRODUCTION**. UNDOCUMENTED ON PURPOSE. This is meant for tests, library development and docs. */
  debug?: boolean;
}

export type BrowserFormOptions<Schema> = Required<BrowserFormOptionsInput<Schema>>;

/** An object returned after initialization.
 * - [Return types API](https://deniskabana.github.io/react-browser-form/documentation/return-types-api)
 */
export interface BrowserFormReturnType<Schema> {
  // REQUIRED TO USE
  // --------------------------------------------------------------------------------

  /**
   * Props that will attach to DOM form node - `<form {...formProps} />`. This is necessary for React Browser Form to function as it uses the built-in browser form management mechanisms an React events.
   * - [Return types API](https://deniskabana.github.io/react-browser-form/documentation/return-types-api)
   */
  formProps: FormComponentProps<Schema>;

  // OPTIONAL TO USE
  // --------------------------------------------------------------------------------

  /**
   * **Optional but recommended.** Names object prevents errors during development. You can pass name as a string to inputs optionally, but you will lose out on compile-time errors.
   * - [Return types API](https://deniskabana.github.io/react-browser-form/documentation/return-types-api)
   */
  names: Record<keyof Schema, string>;

  /**
   * Errors object that keeps tracks of errors and their count.
   * - [Return types API](https://deniskabana.github.io/react-browser-form/documentation/return-types-api)
   *
   * @example { count: 1, errors: { password: "Error message" } }
   */
  errorData: ErrorsObject<Schema>;

  /**
   * Whether the form has been touched by the user. No deep comparisons happen internally. Reset will clear this value.
   * - [Return types API](https://deniskabana.github.io/react-browser-form/documentation/return-types-api)
   */
  isDirty: boolean;

  /**
   * An array of strings referencing the names of inputs considered "dirty". Reset will clear this value.
   * - [Return types API](https://deniskabana.github.io/react-browser-form/documentation/return-types-api)
   */
  dirtyFields: Array<keyof Schema>;

  // METHODS
  // --------------------------------------------------------------------------------

  /**
   * Lets you programatically submit the form. Useful when using non-standard or controlled inputs.
   * - [Return types API](https://deniskabana.github.io/react-browser-form/documentation/return-types-api)
   * - [Example](https://deniskabana.github.io/react-browser-form/examples/basic/form-methods)
   */
  submit: SubmitMethod;

  /**
   * Programatically reset the form. If no values are provided, `defaultValues` are used. If values are provided, they need to cover the entire Schema. Triggers the `onChange` event and validation and reset dirty fields.
   * - [Return types API](https://deniskabana.github.io/react-browser-form/documentation/return-types-api)
   * - [Example](https://deniskabana.github.io/react-browser-form/examples/basic/form-methods)
   */
  reset: ResetMethod<Schema>;

  /**
   * Allows to set a subset of values programmatically (this gets merged with the current form state). It will trigger an `onChange` event and validation.
   * **Setting the values programatically does change the dirty status of both the fields and the whole form.**
   * - [Return types API](https://deniskabana.github.io/react-browser-form/documentation/return-types-api)
   * - [Example](https://deniskabana.github.io/react-browser-form/examples/basic/form-methods)
   */
  setValues: SetValuesMethod<Schema>;
}

// EXPOSED METHODS
// --------------------------------------------------------------------------------

/**
 * Lets you programatically submit the form. Useful when using non-standard or controlled inputs.
 * - [Return types API](https://deniskabana.github.io/react-browser-form/documentation/return-types-api)
 * - [Example](https://deniskabana.github.io/react-browser-form/examples/basic/form-methods)
 */
export type SubmitMethod = VoidFunction;

/**
 * Programatically reset the form. If no values are provided, `defaultValues` are used. If values are provided, they need to cover the entire Schema. Triggers the `onChange` event and validation.
 * - [Return types API](https://deniskabana.github.io/react-browser-form/documentation/return-types-api)
 * - [Example](https://deniskabana.github.io/react-browser-form/examples/basic/form-methods)
 */
export type ResetMethod<Schema> = (values?: Schema) => void;

/**
 * Allows to set a subset of values programmatically (this gets merged with the current form state). It will trigger an `onChange` event and validation.
 * - [Return types API](https://deniskabana.github.io/react-browser-form/documentation/return-types-api)
 * - [Example](https://deniskabana.github.io/react-browser-form/examples/basic/form-methods)
 */
export type SetValuesMethod<Schema> = (values: Partial<Schema>) => void;

// VALUE TRANSFORMATION
// --------------------------------------------------------------------------------

export type TransformationFn<Schema, Key extends keyof Schema> = (
  fieldData: unknown,
  formState?: Schema,
) => Schema[Key];

/**
 * A dead-simple type and value transformation schema. Useful when you need easy data processing, input masking or just recast types.
 * - [Options API](https://deniskabana.github.io/react-browser-form/documentation/options-api)
 * - [Documentation](https://deniskabana.github.io/react-browser-form/documentation/validation-and-transformation)
 * - [Example](https://deniskabana.github.io/react-browser-form/examples/advanced/value-transformation)
 */
export interface TransformationSchema<Schema> {
  /** By default a transformation based on input[type] is applied, managing the correct types for primitive types. */
  disableDefaultTransformation?: boolean;

  /** Singular fields to transform. Can not use `transformAllData` if `fields` is used. Provide the name of the primitive type or your own transform function. */
  fields?: {
    [Field in keyof Schema]?: TransformationFn<Schema, Field> | "number" | "string" | "boolean";
  };
}

// DIRTY FIELDS
// --------------------------------------------------------------------------------

export interface DirtyFieldsManager<Schema> {
  isDirty: boolean;
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>;
  dirtyFields: Array<keyof Schema>;
  setDirtyFields: (fields: Array<keyof Schema>) => void;
  resetDirtyState: () => void;
}

// VALIDATION AND ERROR HANDLING
// --------------------------------------------------------------------------------

export interface ErrorManager<Schema> {
  errorData: ErrorsObject<Schema>;
  setErrors: (errors: Partial<Record<keyof Schema, string>>) => void;
}

/**
 * Errors object that keeps tracks of errors and their count.
 * - [Return types API](https://deniskabana.github.io/react-browser-form/documentation/return-types-api)
 *
 * @example { count: 1, errors: { password: "Error message" } }
 */
export interface ErrorsObject<Schema> {
  count: number;
  /** Contains an object that ties field name to a custom error message (if any). */
  errors: Partial<Record<keyof Schema, string>>;
}

/**
 * A validation function that receives all the latest form data.
 * @param fieldData Data of the field that the validation function is tied to.
 * @param formState **Optional.** The whole form state object. Use if any of your data are tied together.
 * @throws `ValidationError` if the validation failed.
 */
export type ValidationFn<Schema, Key extends keyof Schema> = (fieldData: Schema[Key], formState: Schema) => void;

export type ValidationValidatorsFields<Schema> = {
  [Field in keyof Schema]?: ValidationFn<Schema, Field> | Array<ValidationFn<Schema, Field>>;
};

export type ValidationRequiredFields<Schema> = { fields: (keyof Schema)[]; message?: string };

/**
 * A dead-simple validation with a validator schema that has access to single field and all form data. Throw `ValidationError` with an error message if field validation fails.
 * - [Options API](https://deniskabana.github.io/react-browser-form/documentation/options-api)
 * - [Documentation](https://deniskabana.github.io/react-browser-form/documentation/validation-and-transformation)
 * - [Examples](https://deniskabana.github.io/react-browser-form/examples/validation)
 */
export type ValidationSchema<Schema> =
  | {
      validators?: ValidationValidatorsFields<Schema>;
      required: ValidationRequiredFields<Schema>;
    }
  | {
      validators: ValidationValidatorsFields<Schema>;
      required?: ValidationRequiredFields<Schema>;
    };

// INTERNAL DATA
// --------------------------------------------------------------------------------

export interface FieldsData<Schema> {
  names: Record<keyof Schema, string>;
  required: (keyof Schema)[];
  validated: (keyof Schema)[];
}

/**
 * Props that will attach to DOM form node - `<form {...formProps} />`. This is necessary for React Browser Form to function as it uses the built-in browser form management mechanisms an React events.
 * - [Return types API](https://deniskabana.github.io/react-browser-form/documentation/return-types-api)
 */
export type FormComponentProps<Schema> = FormEventHandlers<Schema>[EventSource.Form] & {
  name: BrowserFormOptions<Schema>["name"];
};

export interface UserCallbacks<Schema> {
  onSubmit: (data: Schema) => void;
  onChange: (data: Schema) => void;
}

// DATA FLOW
// --------------------------------------------------------------------------------

export enum EventSource {
  User = "User",
  Form = "Form",
}

export enum EventType {
  /** Submit event */
  Submit = "Submit",
  /** Any type of reset or clear action */
  Reset = "Reset",
  /** `EventType.Change` gets called for all listeners - `onChange`, `onBlur` and `onSubmit` */
  Change = "Change",
  /** `EventType.Blur` when a form input is blurred (loses focus) */
  Blur = "Blur",
  /** A special type of event triggered programmatically during init phase. Under the hood it just calls `reset()` without calling `onChange()` or hydrating */
  FormInit = "FormInit",
}

export type FormEventHandler = (event: React.FormEvent<HTMLFormElement>) => void;
export type UserEventHandler<Schema> = (value?: Partial<Schema>) => void;

export interface FormEventHandlers<Schema> {
  [EventSource.User]: {
    setValues: UserEventHandler<Schema>;
    submit: UserEventHandler<Schema>;
    reset: UserEventHandler<Schema>;
  };
  [EventSource.Form]: {
    onChange: FormEventHandler;
    onSubmit: FormEventHandler;
    onBlur: FormEventHandler;
    onReset: FormEventHandler;
  };
}

export interface DataFlowEvent<Schema> {
  source: EventSource;
  type: EventType;
  value?: Partial<Schema>;
  nativeEvent?: React.FormEvent<HTMLFormElement>;
}

export interface DataFlowState<Schema> {
  hasErrors: boolean;
  event: DataFlowEvent<Schema>;
  options: BrowserFormOptions<Schema>;
  changedData: Partial<Schema>;
  changeReason: string;
  formState: Schema;
  fieldsData: FieldsData<Schema>;
  callbacks: UserCallbacks<Schema>;
  errorData: ErrorsObject<Schema>;
  setErrors: ErrorManager<Schema>["setErrors"];
  isDirty: boolean;
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>;
  setDirtyFields: DirtyFieldsManager<Schema>["setDirtyFields"];
  resetDirtyState: DirtyFieldsManager<Schema>["resetDirtyState"];
}

export type DataFlowFn<Schema> = (dataFlowState: DataFlowState<Schema>) => void;

// Function used in browser-form wrapper
export type HandleDataFlow<Schema> = (event: DataFlowEvent<Schema>) => void;
