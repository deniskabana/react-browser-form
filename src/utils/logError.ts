type Phase = "init" | "event" | "data-flow";

export function logError(phase: Phase, message: string) {
  console.error(`[react-dumb-form]: ERROR (${phase}): ${message}`);
}
