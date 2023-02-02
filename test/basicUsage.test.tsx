import { renderHook } from "@testing-library/react";
import { useBrowserForm } from "../src/index";
import { EMPTY_DEFAULTS } from "./utils/constants";

/**
 * Try if just basic rendering works
 */
describe("Basic usage", () => {
  it("is initialized without errors", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useBrowserForm({ ...EMPTY_DEFAULTS, onChange: callback, onSubmit: callback }));
    expect(result.current.isDirty).toBe(false);
    expect(callback).not.toBeCalled();
  });
});
