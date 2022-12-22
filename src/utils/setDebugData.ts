import { DataFlowEvent, DumbFormOptions, DumbFormReturnType } from "../types";

// Intentionally declared outside of types.ts due to usage intentions
// Most fields are populated when an action was initiated
export interface DebugData<Schema> {
  /** All of the returned data - includes listeners, isDirty, errors, names, etc. */
  returnData: DumbFormReturnType<Schema>;
  /** Timestamp of last DebugData change */
  timestamp?: number;
  /** The reason for change the event handlers provide */
  changeReason?: string;
  /** React dumb form's internal data flow event - includes source and type of the event */
  event?: DataFlowEvent<Schema>;
  /** Updated formState after event transformations */
  formState?: Schema;
  /** Whether the form has already been submitted */
  isSubmitted?: boolean;
}

/**
 * Set debug data - useful for docs, testing, debugging and understanding the data flow
 * **NEVER USE THIS FOR ANYTHING ELSE.**
 */
export function setDebugData<Schema>(
  data: Partial<Omit<DebugData<Schema>, "timestamp">>,
  options: DumbFormOptions<any>,
) {
  if (!options.debug || typeof window === "undefined") return;

  // Set up a new debug object if it doesn't exist yet
  if (!(window as any).__rdf_debug) (window as any).__rdf_debug = {};
  if (!(window as any).__rdf_debug[options.name]) (window as any).__rdf_debug[options.name] = {};

  // Add or replace fields on the debug object
  // This object might be replaced with a Proxy, do not overwrite it
  for (let key in data) {
    (window as any).__rdf_debug[options.name][key] = (data as any)[key];
  }
  (window as any).__rdf_debug[options.name].timestamp = Date.now();
}
