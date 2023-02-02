import { renderHook } from "@testing-library/react";
import { useBrowserForm } from "../src/index";
import { ERRORS } from "../src/constants";
import { generateMessage } from "../src/utils/logError";
import { EMPTY_DEFAULTS } from "./utils/constants";

/**
 * Verify initialization of different configs
 */
describe("Incorrect options combination protection", () => {
  describe("Throwing errors", () => {
    // Mock console.error to not pollute output
    let consoleErrorFn: jest.SpyInstance;
    beforeEach(() => {
      consoleErrorFn = jest.spyOn(console, "error").mockImplementation();
    });
    afterEach(() => consoleErrorFn.mockRestore());

    it("should fail if invalid 'name' provided", () => {
      expect(() => {
        renderHook(() => useBrowserForm({ defaultValues: {} } as any));
      }).toThrow(ERRORS.NAME_INVALID);
    });

    it("should fail if invalid 'defaultValues' provided", () => {
      expect(() => {
        renderHook(() => useBrowserForm({ name: "test" } as any));
      }).toThrow(ERRORS.MISSING_DEFAULT_VALUES);
    });

    it("should fail if invalid 'validationSchema' provided when 'validateAfterInit' is true", () => {
      expect(() => {
        renderHook(() => useBrowserForm({ ...EMPTY_DEFAULTS, validateAfterInit: true }));
      }).toThrow(ERRORS.VALIDATION_SCHEMA_REQUIRED);
    });

    it("should fail if invalid 'validationSchema' provided", () => {
      expect(() => {
        renderHook(() =>
          useBrowserForm({
            ...EMPTY_DEFAULTS,
            validationSchema: {} as any,
          }),
        );
      }).toThrow(ERRORS.INCORRECT_VALIDATION_SCHEMA);

      expect(() => {
        renderHook(() =>
          useBrowserForm({
            ...EMPTY_DEFAULTS,
            validationSchema: {
              required: {},
              validators: {},
              incorrectKey: null,
            } as any,
          }),
        );
      }).toThrow(ERRORS.INCORRECT_VALIDATION_SCHEMA);
    });
  });

  describe("Showing console warnings", () => {
    // Spy on console.warn to verify correct errors thrown at correct times
    let consoleWarnMock: jest.SpyInstance;
    beforeEach(() => {
      consoleWarnMock = jest.spyOn(console, "warn").mockImplementation();
    });
    afterEach(() => consoleWarnMock.mockRestore());

    it("should warn if mode: 'onChange' is used without 'onChange()' callback", () => {
      renderHook(() => useBrowserForm({ ...EMPTY_DEFAULTS, mode: "onChange" }));
      expect(consoleWarnMock).toHaveBeenCalledWith(
        generateMessage("init", ERRORS.ONCHANGE_MODE_ONCHANGE_FN, "warning"),
      );
    });

    it("should warn if using 'liveFields' without 'onChange()' callback", () => {
      renderHook(() => useBrowserForm({ ...EMPTY_DEFAULTS, liveFields: [""] }));
      expect(consoleWarnMock).toHaveBeenCalledWith(generateMessage("init", ERRORS.LIVE_FIELDS_ONCHANGE_FN, "warning"));
    });

    it("should warn if both 'liveFields' and mode: 'onChange' used", () => {
      renderHook(() => useBrowserForm({ ...EMPTY_DEFAULTS, liveFields: [""], mode: "onChange" }));
      expect(consoleWarnMock).toHaveBeenCalledWith(generateMessage("init", ERRORS.ONCHANGE_AND_LIVEFIELDS, "warning"));
    });
  });
});
