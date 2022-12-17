export function transformValueType(value: any, defaultValue: any) {
  // Catch nullified values (if programmatically set)
  if (value === null) return value;
  // Convert empty strings to null if not string | boolean
  if (typeof defaultValue !== "boolean" && typeof defaultValue !== "string" && value === "") return null;

  switch (typeof defaultValue) {
    case "string":
      return String(value);

    case "number":
      return Number(value);

    case "boolean":
      // Special case handling here - truthy value
      return Boolean(value === "false" ? false : value);

    default:
      return value;
  }
}
