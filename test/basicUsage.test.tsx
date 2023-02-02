import { renderHook } from "@testing-library/react";
import { useBrowserForm } from "../src/index";
import { EMPTY_DEFAULTS } from "./utils/constants";

/**
 * Try if just basic rendering works
 */
describe("Basic usage", () => {
  it("is initialized without errors", () => {
    const { result } = renderHook(() => useBrowserForm(EMPTY_DEFAULTS));
    expect(result.current.isDirty).toBe(false);
  });
});
