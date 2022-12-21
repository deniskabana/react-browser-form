import React from "react";
import { ErrorManager, ErrorsObject } from "../types";

export function useErrorManager<Schema>(): ErrorManager<Schema> {
  const [stateErrors, stateSetErrors] = React.useState<ErrorsObject<Schema>>({ count: 0, errors: {} });

  const generateErrorsObject = (errors: Partial<Record<keyof Schema, string>>): ErrorsObject<Schema> => {
    return {
      count: Object.keys(errors).length,
      errors: errors,
    };
  };

  // RETURNED METHODS
  // --------------------------------------------------------------------------------

  const setErrors: ErrorManager<Schema>["setErrors"] = errors => {
    stateSetErrors(generateErrorsObject(errors));
  };

  return {
    errorData: stateErrors,
    setErrors,
  };
}
