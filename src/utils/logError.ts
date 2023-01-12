type Phase = "init" | "event" | "data-flow";

export function logError(phase: Phase, message: string) {
  console.error(`[react-browser-form]: ERROR (${phase}): ${message}`);
}
