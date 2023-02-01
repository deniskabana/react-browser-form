import { ERRORS } from "../constants";
import { BrowserFormOptions } from "../types";
import { logError } from "./logError";

/** TypeScript will try to catch these errors build-time, but some users might still use the any type to override our constraints. */
export function protectOptionsCominations<Schema>(options: BrowserFormOptions<Schema>) {
  const { name, defaultValues, onChange, validationSchema, validateAfterInit, mode, liveFields } = options;

  // ERRORS - prevent further execution to prevent bugs
  // --------------------------------------------------------------------------------

  // Missing or invalid name
  if (!name || name.length < 1) throw new Error(ERRORS.NAME_INVALID);
  // Missing default values
  if (!defaultValues) throw new Error(ERRORS.MISSING_DEFAULT_VALUES);
  // Missing validationSchema if validateAfterInit is used
  if (validateAfterInit && !validationSchema) throw new Error(ERRORS.VALIDATION_SCHEMA_REQUIRED);

  // TODO: Add more options to take 3rd party validators into account

  // Verify validation schema if provided
  if (validationSchema) {
    const validationKeys = Object.keys(validationSchema);
    // Verify structure - we always want 1 or 2 entries
    if (validationKeys.length === 0 || validationKeys.length > 2) throw new Error(ERRORS.INCORRECT_VALIDATION_SCHEMA);

    // TODO:  Add more validations to make sure everything is provided - only ifs
  }

  // WARNINGS - should not stop exeuction in production environment
  // --------------------------------------------------------------------------------
  if (process.env.NODE_ENV === "production") return;

  // Warn if onChange mode is used without an onChange function
  if (mode === "onChange" && typeof onChange !== "function") logError("init", ERRORS.ONCHANGE_MODE_ONCHANGE_FN);

  // Warn if liveFields are used without an onChange function
  if (liveFields && liveFields.length > 0 && typeof onChange !== "function")
    logError("init", ERRORS.LIVE_FIELDS_ONCHANGE_FN);

  // Warn not to use onChange and liveFields together
  if (mode === "onChange" && liveFields && liveFields.length > 0) logError("init", ERRORS.ONCHANGE_AND_LIVEFIELDS);
}
