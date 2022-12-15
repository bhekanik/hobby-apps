import { act, cleanup, renderHook } from "@testing-library/react-hooks";
import { useContext } from "react";
import { expect, vi } from "vitest";
import { ApiContext } from "./ApiContext";
import FeatureFlagsBrokerImpl from "./FeatureFlagsBroker";
import { useFeatureFlag } from "./useFeatureFlag";

vi.mock("react", async () => ({
  ...(await vi.importActual<Record<string, unknown>>("react")),
  useContext: vi.fn(),
}));

describe("useFeatureFlag", () => {
  let broker: FeatureFlagsBrokerImpl;

  beforeEach(() => {
    broker = new FeatureFlagsBrokerImpl();

    vi.mocked(useContext).mockRestore();
    vi.mocked(useContext).mockImplementation((context) => {
      expect(context).toBe(ApiContext);
      return broker;
    });
  });
  afterEach(cleanup);

  it("returns the null if a flag is not set", () => {
    const { result } = renderHook(() => useFeatureFlag("test"));

    expect(result.current).toBeNull();
  });

  it("returns the value from the broker if it is set", () => {
    broker.setFlags({ test: false });
    const { result } = renderHook(() => useFeatureFlag("test"));

    expect(result.current).toBe(false);
  });

  it("updates the value when it is changed in the broker", () => {
    broker.setFlags({ test: true });
    const { result } = renderHook(() => useFeatureFlag("test"));

    expect(result.current).toBe(true);
    act(() => {
      broker.setFlags({ test: false });
    });

    expect(result.current).toBe(false);
  });

  it("updates the value to null if it is unset in the broker", () => {
    broker.setFlags({ test: false });
    const { result } = renderHook(() => useFeatureFlag("test"));

    act(() => {
      broker.setFlags({});
    });

    expect(result.current).toBeNull();
  });

  it("does not update the value after the hook has unmounted", () => {
    broker.setFlags({ test: false });
    const { result, unmount } = renderHook(() => useFeatureFlag("test"));

    unmount();
    act(() => {
      broker.setFlags({ test: true });
    });

    expect(result.current).toBe(false);
  });
});
