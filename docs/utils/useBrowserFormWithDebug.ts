import { useBrowserForm as RBF, BrowserFormOptionsInput, BrowserFormReturnType } from "node_modules/react-browser-form";
export * from "node_modules/react-browser-form";

export function useBrowserForm<Schema extends {}>(
  options: BrowserFormOptionsInput<Schema>,
): BrowserFormReturnType<Schema> {
  return RBF<Schema>({ ...options, debug: true });
}
