import { BrowserFormOptions } from "../types";
import { logError } from "./logError";

export function uniqueNameProtection<Schema>(options: BrowserFormOptions<Schema>) {
  if (document.querySelectorAll(`form[name="${options.name}"]`)?.length > 1) {
    logError("init", `Form name "${options.name}" is not unique! This can lead to critical bugs!`);
  }
}
