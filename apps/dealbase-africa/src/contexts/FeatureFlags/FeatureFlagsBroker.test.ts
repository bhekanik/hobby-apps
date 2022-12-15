import { expect, SpyInstanceFn, vi } from "vitest";
import FeatureFlagsBrokerImpl from "./FeatureFlagsBroker";
import { FeatureFlagChangedEvent } from "./types";

describe("FeatureFlagsBroker", () => {
  let broker: FeatureFlagsBrokerImpl;

  beforeEach(() => {
    broker = new FeatureFlagsBrokerImpl();
  });

  describe("isFeatureEnabled", () => {
    it("returns null if the flag is not set", () => {
      expect(broker.isFeatureEnabled("test")).toBeNull();
    });

    it("returns true if the flag is true", () => {
      broker.setFlags({ test: true });

      expect(broker.isFeatureEnabled("test")).toBe(true);
    });

    it("returns false if the flag is false", () => {
      broker.setFlags({ test: false });

      expect(broker.isFeatureEnabled("test")).toBe(false);
    });

    it("returns true if the flag becomes true", () => {
      broker.setFlags({ test: false });
      broker.setFlags({ test: true });

      expect(broker.isFeatureEnabled("test")).toBe(true);
    });
  });

  describe("addListener/RemoveListener", () => {
    const FEATURE = "FEATURE";
    let handler: SpyInstanceFn<any[], [FeatureFlagChangedEvent]>;
    beforeEach(() => {
      handler = vi.fn();
      broker.addListener(FEATURE, handler);
    });
    afterEach(() => {
      broker.removeListener(FEATURE, handler);
    });

    it("calls the handler when the flag is set", () => {
      expect(handler).not.toHaveBeenCalled();

      broker.setFlags({ [FEATURE]: true });

      expect(handler).toHaveBeenCalledWith(
        expect.objectContaining({
          feature: FEATURE,
          oldValue: null,
          newValue: true,
        })
      );
    });

    it("calls the handler when the flag is changed", () => {
      expect(handler).not.toHaveBeenCalled();

      broker.setFlags({ [FEATURE]: true });
      broker.setFlags({ [FEATURE]: false });

      expect(handler).toHaveBeenCalledTimes(2);
      expect(handler).toHaveBeenLastCalledWith(
        expect.objectContaining({
          feature: FEATURE,
          oldValue: true,
          newValue: false,
        })
      );
    });

    it("calls the handler when the flag is unset", () => {
      expect(handler).not.toHaveBeenCalled();

      broker.setFlags({ [FEATURE]: true });
      broker.setFlags({});

      expect(handler).toHaveBeenCalledTimes(2);
      expect(handler).toHaveBeenLastCalledWith(
        expect.objectContaining({
          feature: FEATURE,
          oldValue: true,
          newValue: null,
        })
      );
    });

    it("does not call the handler after it has been removed", () => {
      broker.removeListener(FEATURE, handler);

      broker.setFlags({ [FEATURE]: true });

      expect(handler).not.toHaveBeenCalled();
    });

    it("does not call the handler if the flag does not change", () => {
      broker.setFlags({ [FEATURE]: true });
      handler.mockReset();

      broker.setFlags({ [FEATURE]: true, test: true });

      expect(handler).not.toHaveBeenCalled();
    });
  });
});
