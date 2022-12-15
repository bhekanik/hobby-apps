import { act, cleanup, renderHook } from "@testing-library/react-hooks";
import { expect, SpyInstance, vi } from "vitest";
import useOverridableEnvironment, {
  clearEnvironment,
  DEVELOPMENT,
  ENVIRONMENT_OVERRIDE,
  getEnvironment,
  RELEASE,
  setEnvironment,
} from "./useOverridableEnvironment";

describe("useOverridableEnvironment", () => {
  const development = Object.freeze({ development: true });
  const release = Object.freeze({ release: true });
  let sessionStorageSpy: SpyInstance<[], Storage>;

  beforeEach(() => {
    const sessionStorage = window.sessionStorage;
    sessionStorage.clear();
    sessionStorageSpy = vi.spyOn(window, "sessionStorage", "get");
    sessionStorageSpy.mockImplementation(() => sessionStorage);
  });
  afterEach(() => {
    sessionStorageSpy.mockRestore();
    cleanup();
  });

  it("picks the default environment when development is the default", () => {
    const { result } = renderHook(() =>
      useOverridableEnvironment(DEVELOPMENT, development, release)
    );

    expect(result.current).toBe(development);
  });

  it("picks the default environment when release is the default", () => {
    const { result } = renderHook(() =>
      useOverridableEnvironment(RELEASE, development, release)
    );

    expect(result.current).toBe(release);
  });

  it("picks the release environment when the default is the null", () => {
    const { result } = renderHook(() =>
      useOverridableEnvironment(null, development, release)
    );

    expect(result.current).toBe(release);
  });

  it("picks the environment override when it is set", () => {
    setEnvironment(DEVELOPMENT);

    const { result } = renderHook(() =>
      useOverridableEnvironment(RELEASE, development, release)
    );

    expect(result.current).toBe(development);
  });

  it("picks the default environment when sessionStorage is unavailable", () => {
    sessionStorageSpy.mockImplementation(() => {
      throw Error("test");
    });

    const { result } = renderHook(() =>
      useOverridableEnvironment(RELEASE, development, release)
    );

    expect(result.current).toBe(release);
  });

  it("switches the environment when the environment override changes", () => {
    const { result } = renderHook(() =>
      useOverridableEnvironment(RELEASE, development, release)
    );

    act(() => {
      setEnvironment(DEVELOPMENT);
    });

    expect(result.current).toBe(development);
  });

  it("switches the environment back to the default when the environment override is removed", () => {
    const { result } = renderHook(() =>
      useOverridableEnvironment(RELEASE, development, release)
    );

    act(() => {
      clearEnvironment();
    });

    expect(result.current).toBe(release);
  });

  it("does not switch the environment if the environment override is set on local storage", () => {
    const { result } = renderHook(() =>
      useOverridableEnvironment(RELEASE, development, release)
    );
    const event = new StorageEvent("storage", {
      key: ENVIRONMENT_OVERRIDE,
      newValue: DEVELOPMENT,
      storageArea: window.localStorage,
    });
    act(() => {
      window.dispatchEvent(event);
    });

    expect(result.current).toBe(release);
  });

  it("allows you to use the getEnvironment helper to get the environment override", () => {
    setEnvironment(RELEASE);

    expect(getEnvironment()).toBe(RELEASE);
  });

  it("allows you to clear the environment override", () => {
    setEnvironment(RELEASE);
    clearEnvironment();

    expect(getEnvironment()).toBe(null);
  });

  it("fails gracefully when sessionStorage is unavailable and you try to use the helpers", () => {
    sessionStorageSpy.mockImplementation(() => {
      throw Error("test");
    });

    clearEnvironment();
    setEnvironment(DEVELOPMENT);

    expect(getEnvironment()).toBe(null);
  });
});
