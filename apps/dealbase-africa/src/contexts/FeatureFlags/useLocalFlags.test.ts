import { act, cleanup, renderHook } from "@testing-library/react-hooks";
import { expect, SpyInstance, vi } from "vitest";
import useLocalFlags, {
  changeFeatureValue,
  clearFeatures,
  disableFeature,
  enableFeature,
  FEATURE_OVERRIDES,
  getFeatures,
} from "./useLocalFlags";

describe("useLocalFlags", () => {
  let sessionStorageSpy: SpyInstance<[], Storage> | undefined;

  beforeEach(() => {
    const sessionStorage = window.sessionStorage;
    sessionStorage.clear();
    sessionStorageSpy = vi.spyOn(window, "sessionStorage", "get");
    sessionStorageSpy.mockImplementation(() => sessionStorage);
  });
  afterEach(() => {
    sessionStorageSpy?.mockRestore();
    cleanup();
  });

  it("returns an empty object if no flags have been set", () => {
    const { result } = renderHook(() => useLocalFlags());

    expect(result.current).toEqual({});
  });

  it("returns the local flags if they are set", () => {
    enableFeature("enabled");
    disableFeature("disabled");

    const { result } = renderHook(() => useLocalFlags());

    expect(result.current).toEqual({
      enabled: true,
      disabled: false,
    });
  });

  it("returns an empty array if the local flags cannot be retrieved", () => {
    sessionStorage[FEATURE_OVERRIDES] = "bob";

    const { result } = renderHook(() => useLocalFlags());

    expect(result.current).toEqual({});
  });

  it("returns the updated flags when they are changed in sessionStorage", () => {
    const { result } = renderHook(() => useLocalFlags());

    act(() => {
      enableFeature("changed");
    });

    expect(result.current).toEqual({
      changed: true,
    });
  });

  it("does not rerender when localStorage changes", () => {
    let renderCount = 0;
    renderHook(() => {
      renderCount++;
      return useLocalFlags();
    });

    const event = new StorageEvent("storage", {
      key: FEATURE_OVERRIDES,
      storageArea: window.localStorage,
    });
    act(() => {
      window.dispatchEvent(event);
    });

    expect(renderCount).toEqual(1);
  });

  it("allows you to clear all flags", () => {
    enableFeature("enabled");
    disableFeature("disabled");
    const { result } = renderHook(() => useLocalFlags());

    act(() => {
      clearFeatures();
    });

    expect(result.current).toEqual({});
  });

  it("allows you to get all flags through a helper function", () => {
    enableFeature("enabled");
    disableFeature("disabled");

    expect(getFeatures()).toEqual({
      enabled: true,
      disabled: false,
    });
  });

  it("returns an empty set of features if they have not been set", () => {
    expect(getFeatures()).toEqual({});
  });

  it("updates a local flag with a new number value", () => {
    const { result } = renderHook(() => useLocalFlags());
    act(() => {
      changeFeatureValue("abc", 123);
    });
    expect(result.current).toEqual({ abc: 123 });
  });

  it("updates a local flag with a new string value", () => {
    const { result } = renderHook(() => useLocalFlags());
    act(() => {
      changeFeatureValue("abc", "def");
    });
    expect(result.current).toEqual({ abc: "def" });
  });

  it("updates a local flag with a new boolean value", () => {
    const { result } = renderHook(() => useLocalFlags());
    act(() => {
      changeFeatureValue("abc", false);
    });
    expect(result.current).toEqual({ abc: false });
  });
});
