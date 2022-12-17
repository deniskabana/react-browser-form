import { DumbFormOptions, FieldsData } from "../types";

export function getFieldsData<Schema extends {}>(options: DumbFormOptions<Schema>): FieldsData<Schema> {
  return {
    // Names of fields, enum-like
    names: Object.keys(options.defaultValues).reduce((names, key) => ({ ...names, [key]: key }), {}) as any,

    // Array of fields that are tagged required
    required: options.validationSchema?.required?.fields ?? [],

    // Array of fields that are being validated
    validated: Object.keys(options.validationSchema?.validators ?? {}) as (keyof Schema)[],
  };
}
