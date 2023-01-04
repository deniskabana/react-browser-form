// DUMB FORM HOOK TYPES
// --------------------------------------------------------------------------------

export interface DumbFormOptionsInput<Schema> {
  /** Form DOM name attribute - **must be unique**. Used to access inputs through `document.forms`, to read all events and hydrate the form data and the DOM inputs. */
  name: string;

  /** Default values need to match your schema. These are used for a lot of the iteration. */
  defaultValues: Schema & { [key: string]: any };

  /** A callback for when the form is submitted. **Will not trigger if there are errors during validation!** */
  onSubmit?: (data: Schema) => void;

  /** This method is useful when using `onChange` mode, live fields, setting or resetting values, etc. */
  onChange?: (data: Schema) => void;

  /** A dead-simple validation with a validator schema that has access to all the data. Throw `ValidationError` if field validation fails. */
  validationSchema?: ValidationSchema<Schema>;

  /** A dead-simple type and value transformation schema. Useful when you need easy data processing, input masking or just recast types. */
  transformationSchema?: TransformationSchema<Schema>;

  /** Whether to perform validation right after mounting the form - before the first render. */
  validateAfterInit?: boolean;

  /**
   * - `onSubmitUnlessError` **(DEFAULT)**: Hydrate and validate upon form submit event. Inputs with errors re-validate on input change until the error is resolved. **Reliant on browser handling and keeping inputs mounted**.
   * - `onSubmit`: Hydrate and validate upon form submit event. **The fastest option if not validating, reliant on browser handling and keeping inputs mounted**.
   * - `onBlur`: Hydrate and validate the form on every input blur. **Very fast. Recommended for forms with more complex validation logic.**
   * - `onBlurUnlessError`: Hydrate and validate the form on every input blur. Inputs with errors re-validate on input change until the error is resolved.
   * - `onChange`: The de facto original React way of handling forms. **The slowest method. Only good for live data handling.** Good use-cases could be auto-suggestion, prefetching, etc.
   * @default "onSubmitUnlessError"
   */
  mode?: "onSubmitUnlessError" | "onSubmit" | "onBlurUnlessError" | "onBlur" | "onChange";

  /**
   * A revalidation strategy after an error is found. To be used with any unlessError mode. Choose `onBlur` if your validation is demanding.
   * @default "onChange"
   */
  revalidationStrategy?: "onChange" | "onBlur";

  /** A subset of fields that will trigger update **and validation of fields with errors** on every input change. **Useful for conditional operations within forms.** */
  liveFields?: (keyof Schema)[];

  /** **DO NOT USE IN PRODUCTION**. This is meant for tests, library development and docs. */
  debug?: boolean;
}

export type DumbFormOptions<Schema> = Required<DumbFormOptionsInput<Schema>>;

export interface DumbFormReturnType<Schema> {
  /** **Optional.** Name helpers to prevent errors during development. You can pass `name` as a string but you will not get warned if `password` does not exist in provided schema. */
  names: Record<keyof Schema, string>;

  /**
   * Errors object that keeps tracks of errors and their count.
   * @example { count: 1, errors: { password: "Error message" } } */
  errorData: ErrorsObject<Schema>;

  /** Whether the form has been touched by the user. */
  isDirty: boolean;

  /** Props to attach to your DOM form component. */
  formProps: FormComponentProps<Schema>;

  /** Programatically submit the form. */
  submit: SubmitMethod;

  /**
   * Programatically reset the form with optional values. Triggers the `onChange` event and validation.
   */
  reset: ResetMethod<Schema>;

  /**
   * Allows to set a subset of values programmatically (this gets merged with form state).
   * It will trigger an `onChange` event and validation.
   */
  setValues: SetValuesMethod<Schema>;
}

// EXPOSED METHODS
// --------------------------------------------------------------------------------

export type SubmitMethod = VoidFunction;
export type ResetMethod<Schema> = (values?: Schema) => void;
export type SetValuesMethod<Schema> = (values: Partial<Schema>) => void;

// VALUE TRANSFORMATION
// --------------------------------------------------------------------------------

export type TransformationFn<Schema, Key extends keyof Schema> = (fieldData: unknown) => Schema[Key];

export type TransformationAllFn<Schema> = (formState: Schema) => any;

/** Transform your values either to a type or provide your own transformations. */
export interface TransformationSchema<Schema> {
  /** By default a transformation based on input[type] is applied, managing the correct types for primitive types. */
  disableDefaultTransformation?: boolean;

  /** Singular fields to transform. Can not use `transformAllData` if `fields` is used. Provide the name of the primitive type or your own transform function. */
  fields?: {
    [Field in keyof Schema]?: TransformationFn<Schema, Field> | "number" | "string" | "boolean";
  };

  /** Transform all data en masse. Can not use `fields` if `transformAllData` is used. */
  transformAllData?: TransformationAllFn<Schema>;
}

// VALIDATION AND ERROR HANDLING
// --------------------------------------------------------------------------------

export interface ErrorManager<Schema> {
  errorData: ErrorsObject<Schema>;
  setErrors: (errors: Partial<Record<keyof Schema, string>>) => void;
}

export interface ErrorsObject<Schema> {
  count: number;
  /** Contains an object that ties field name to a custom error message (if any) */
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

/** You can use either validators, required or both. */
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

export type FormComponentProps<Schema> = FormEventHandlers<Schema>[EventSource.Form] & {
  name: DumbFormOptions<Schema>["name"];
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
  options: DumbFormOptions<Schema>;
  changedData: Partial<Schema>;
  changeReason: string;
  formState: Schema;
  fieldsData: FieldsData<Schema>;
  callbacks: UserCallbacks<Schema>;
  errorData: ErrorsObject<Schema>;
  setErrors: ErrorManager<Schema>["setErrors"];
  isDirty: boolean;
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>;
}

export type DataFlowFn<Schema> = (dataFlowState: DataFlowState<Schema>) => void;

// Function used in dumb-form wrapper
export type HandleDataFlow<Schema> = (event: DataFlowEvent<Schema>) => void;
