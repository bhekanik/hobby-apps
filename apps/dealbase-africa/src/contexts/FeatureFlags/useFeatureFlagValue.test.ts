import { cleanup, renderHook } from "@testing-library/react-hooks";
import { useContext } from "react";
import { expect, vi } from "vitest";
import { ApiContext } from "./ApiContext";
import FeatureFlagsBrokerImpl from "./FeatureFlagsBroker";
import useFeatureFlagValue from "./useFeatureFlagValue";

vi.mock("react", async () => ({
  ...(await vi.importActual<Record<string, unknown>>("react")),
  useContext: vi.fn(),
}));

describe("useFeatureFlagValue", () => {
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
    const { result } = renderHook(() => useFeatureFlagValue("test"));
    expect(result.current).toBeNull();
  });

  it("returns a boolean value from the broker", () => {
    broker.setFlags({ test: false });
    const { result } = renderHook(() => useFeatureFlagValue("test"));
    expect(result.current).toBe(false);
  });

  it("returns a string value from the broker", () => {
    broker.setFlags({ test: "abc" });
    const { result } = renderHook(() => useFeatureFlagValue("test"));
    expect(result.current).toBe("abc");
  });

  it("returns a number value from the broker", () => {
    broker.setFlags({ test: 123 });
    const { result } = renderHook(() => useFeatureFlagValue("test"));
    expect(result.current).toBe(123);
  });
});
