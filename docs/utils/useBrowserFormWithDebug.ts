import { useBrowserForm as RBF, BrowserFormOptionsInput, BrowserFormReturnType } from "../../dist";
export * from "../../dist";

export function useBrowserForm<Schema extends {}>(
  options: BrowserFormOptionsInput<Schema>,
): BrowserFormReturnType<Schema> {
  return RBF<Schema>({ ...options, debug: true });
}
