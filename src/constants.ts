import { BrowserFormOptions } from "./types";

/** Default options according to the schema */
export const DEFAULT_OPTIONS: Partial<BrowserFormOptions<unknown>> = {
  mode: "onSubmitUnlessError",
  revalidationStrategy: "onChange",
  liveFields: [],
  validateAfterInit: false,
};

export const DEFAULT_REQUIRED_ERROR_MESSAGE = "This field is required.";
export const DEFAULT_VALIDATION_ERROR_MESSAGE = "This field is incorrect.";
