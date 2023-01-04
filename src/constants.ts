import { DumbFormOptions } from "./types";

export const DEFAULT_OPTIONS: Partial<DumbFormOptions<any>> = {
  mode: "onSubmitUnlessError",
  revalidationStrategy: "onChange",
  liveChangeFields: [],
  validateAfterInit: false,
};

export const DEFAULT_REQUIRED_ERROR_MESSAGE = "This field is required.";
export const DEFAULT_VALIDATION_ERROR_MESSAGE = "This field is incorrect.";
