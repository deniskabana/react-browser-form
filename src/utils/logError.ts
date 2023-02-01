import { ERROR_PREFIX } from "../constants";

type Phase = "init" | "event" | "data-flow";

type Severity = "error" | "warning";

export function generateMessage(phase: Phase, message: string, severity: Severity = "error") {
  return `${ERROR_PREFIX} ${severity} during ${phase}: ${message}`;
}

export function logError(phase: Phase, message: string, severity: Severity = "error") {
  if (severity === "error") {
    console.error(generateMessage(phase, message, severity));
  } else if (severity === "warning") {
    console.warn(generateMessage(phase, message, severity));
  }
}
