import { BrowserFormOptions } from "../types";

export function hydrateDomInputs<Schema>(options: BrowserFormOptions<Schema>, formState: Schema): void {
  // Explicit "any" because of TS issue - https://github.com/microsoft/TypeScript/issues/19437
  const domFormElem = (document.forms as any)[options.name];

  for (let key in formState) {
    const domInputElem = domFormElem.elements[key] as HTMLInputElement | undefined;

    if (domInputElem) {
      if (domInputElem.type === "checkbox") {
        domInputElem.checked = Boolean(formState[key]);
      } else {
        if (formState[key] === null) {
          domInputElem.value = "";
          break;
        }
        domInputElem.value = String(formState[key]);
      }
    }
  }
}
