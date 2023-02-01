import { BrowserFormOptions } from "./types";

/** Default options according to the schema */
export const DEFAULT_OPTIONS: Partial<BrowserFormOptions<unknown>> = {
  mode: "onSubmitUnlessError",
  revalidationStrategy: "onChange",
  liveFields: [],
  validateAfterInit: false,
};

/** Default validation messages */
export const DEFAULT_REQUIRED_ERROR_MESSAGE = "This field is required.";
export const DEFAULT_VALIDATION_ERROR_MESSAGE = "This field is incorrect.";

/** Errors returned from options combination protection */
const ERROR_PREFIX = "[react-browser-form]:";
export const ERRORS = {
  // ERRORS
  NAME_INVALID: `${ERROR_PREFIX} Option 'name' required!`,
  MISSING_DEFAULT_VALUES: `${ERROR_PREFIX} Option 'defaultValues' required!`,
  VALIDATION_SCHEMA_REQUIRED: `${ERROR_PREFIX} Option 'validationSchema' is required if 'validateAfterInit' is true.`,
  INCORRECT_VALIDATION_SCHEMA: `${ERROR_PREFIX} Incorrect 'validationSchema' structure. Check the documentation.`,
  // WARNING
  ONCHANGE_MODE_ONCHANGE_FN: "'onChange' function is required if using mode: 'onChange'.",
  LIVE_FIELDS_ONCHANGE_FN: "'onChange' function is required if using 'liveFields'.",
  ONCHANGE_AND_LIVEFIELDS: "When using 'onChange' mode, liveFields should be empty.",
};
