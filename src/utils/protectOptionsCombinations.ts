import { DumbFormOptions } from "../types";
import { logError } from "./logError";

/** TypeScript will try to catch these errors build-time, but some users might still use the any type to override our constraints. */
export function protectOptionsCominations<Schema>(options: DumbFormOptions<Schema>) {
  const {
    name,
    defaultValues,
    onSubmit,
    onChange,
    validationSchema,
    validateAfterInit,
    mode,
    liveChangeFields,
    debug,
  } = options;

  // ERRORS - prevent further execution to prevent bugs
  // --------------------------------------------------------------------------------
  if (!name || name.length < 1) throw new Error("Option 'name' required!");
  if (!defaultValues) throw new Error("Option 'defaultValues' required!");
  if (typeof onSubmit !== "function") throw new Error("Option 'onSubmit' required!");
  if (validateAfterInit && !validationSchema)
    throw new Error("react-dumb-form: Option 'validationSchema' is required if 'validateAfterInit' is true.");

  if (validationSchema) {
    const validationKeys = Object.keys(validationSchema);
    if (validationKeys.length === 0 || validationKeys.length > 2)
      throw new Error("react-dumb-form: Incorrect 'validationSchema' structure. Check the documentation.");

    const validationKeysSet = new Set(validationKeys);
    validationKeysSet.delete("required");
    validationKeysSet.delete("validators");
    if (validationKeysSet.size !== 0)
      throw new Error("react-dumb-form: Incorrect 'validationSchema' structure. Check the documentation.");
  }

  if (mode === "onChange" && typeof onChange !== "function")
    throw new Error("react-dumb-form: 'onChange' function is required if using mode 'onChange'.");

  if (liveChangeFields && liveChangeFields.length > 0) {
    if (typeof onChange !== "function")
      throw new Error("react-dumb-form: 'onChange' function is required if using 'liveChangeFields'.");
  }

  if (debug && process.env.NODE_ENV === "production")
    throw new Error("react-dumb-form: DO NOT USE debug IN PRODUCTION! VERY UNSAFE!");

  // WARNINGS - should not stop exeuction in production environment
  // --------------------------------------------------------------------------------
  if (process.env.NODE_ENV === "production") return;

  if (mode === "onChange") {
    if (liveChangeFields && liveChangeFields.length > 0)
      logError("init", "When using 'onChange' mode, liveChangeFields should not be specified.");
  }
}
