import { BrowserFormOptions } from "../types";
import { logError } from "./logError";

/** TypeScript will try to catch these errors build-time, but some users might still use the any type to override our constraints. */
export function protectOptionsCominations<Schema>(options: BrowserFormOptions<Schema>) {
  const { name, defaultValues, onChange, validationSchema, validateAfterInit, mode, liveFields } = options;

  // ERRORS - prevent further execution to prevent bugs
  // --------------------------------------------------------------------------------

  if (!name || name.length < 1) throw new Error("Option 'name' required!");
  if (!defaultValues) throw new Error("Option 'defaultValues' required!");
  if (validateAfterInit && !validationSchema)
    throw new Error("react-browser-form: Option 'validationSchema' is required if 'validateAfterInit' is true.");

  if (validationSchema) {
    const validationKeys = Object.keys(validationSchema);
    if (validationKeys.length === 0 || validationKeys.length > 2)
      throw new Error("react-browser-form: Incorrect 'validationSchema' structure. Check the documentation.");

    const validationKeysSet = new Set(validationKeys);
    validationKeysSet.delete("required");
    validationKeysSet.delete("validators");
    if (validationKeysSet.size !== 0)
      throw new Error("react-browser-form: Incorrect 'validationSchema' structure. Check the documentation.");
  }

  if (mode === "onChange" && typeof onChange !== "function")
    throw new Error("react-browser-form: 'onChange' function is required if using mode 'onChange'.");

  if (liveFields && liveFields.length > 0) {
    if (typeof onChange !== "function")
      throw new Error("react-browser-form: 'onChange' function is required if using 'liveFields'.");
  }

  // WARNINGS - should not stop exeuction in production environment
  // --------------------------------------------------------------------------------

  if (process.env.NODE_ENV === "production") return;

  if (mode === "onChange") {
    if (liveFields && liveFields.length > 0)
      logError("init", "When using 'onChange' mode, liveFields should be empty.");
  }
}
