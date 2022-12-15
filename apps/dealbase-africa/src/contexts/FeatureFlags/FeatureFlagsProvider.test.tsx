import { act, cleanup, render } from "@testing-library/react";
import { ReactNode } from "react";
import { expect, SpyInstance, SpyInstanceFn, vi } from "vitest";
import FeatureFlagsProvider from "./FeatureFlagsProvider";
import FeatureFlagsSource from "./FeatureFlagsSource";
import FeatureToggle from "./FeatureToggle";
import FeatureFlags, { FeatureFlagValue } from "./types";
import useAllFeatureFlags from "./useAllFeatureFlags";
import { disableFeature, enableFeature, getFeatures } from "./useLocalFlags";
import {
  clearEnvironment,
  DEVELOPMENT,
  Environment,
  getEnvironment,
  RELEASE,
  setEnvironment,
} from "./useOverridableEnvironment";
import { isValidFeatureFlagValue } from "./utils/isValidFeatureFlagValue";

describe.skip("FeatureFlagsProvider", () => {
  let sessionStorageSpy: SpyInstance<[], Storage> | undefined;
  let defaultEnvironment: Environment;
  let development: FeatureFlags;
  let release: FeatureFlags;
  const FEATURE = "FEATURE";
  const ALTFEATURE = "ALTFEATURE";
  const EXPERIMENTAL = "experimental";
  let child: ReactNode;
  let altChild: ReactNode;

  beforeEach(() => {
    const sessionStorage = window.sessionStorage;
    sessionStorage.clear();
    sessionStorageSpy = vi.spyOn(
      global as never as Window,
      "sessionStorage",
      "get"
    );
    sessionStorageSpy.mockImplementation(() => sessionStorage);

    defaultEnvironment = RELEASE;
    development = { [EXPERIMENTAL]: true };
    release = { [EXPERIMENTAL]: false };

    child = <span data-testid="test">test</span>;
    altChild = <span data-testid="alttest">test</span>;
  });

  afterEach(() => {
    sessionStorageSpy?.mockRestore();
    cleanup();
  });

  describe("feature toggle", () => {
    it("does not show the child if the feature flag is not set", () => {
      const tree = (
        <FeatureFlagsProvider
          defaultEnvironment={defaultEnvironment}
          development={development}
          release={release}
        >
          <FeatureToggle feature={FEATURE}>{child}</FeatureToggle>
        </FeatureFlagsProvider>
      );

      const { queryByTestId } = render(tree);

      expect(queryByTestId("test")).toBeNull();
    });

    it("does not show the child if the feature flag is false", () => {
      release = { [FEATURE]: false };

      const tree = (
        <FeatureFlagsProvider
          defaultEnvironment={defaultEnvironment}
          development={development}
          release={release}
        >
          <FeatureToggle feature={FEATURE}>{child}</FeatureToggle>
        </FeatureFlagsProvider>
      );

      const { queryByTestId } = render(tree);

      expect(queryByTestId("test")).toBeNull();
    });

    it("does show the child if the feature flag is true", () => {
      release = { [FEATURE]: true };

      const tree = (
        <FeatureFlagsProvider
          defaultEnvironment={defaultEnvironment}
          development={development}
          release={release}
        >
          <FeatureToggle feature={FEATURE}>{child}</FeatureToggle>
        </FeatureFlagsProvider>
      );

      const { queryByTestId } = render(tree);

      expect(queryByTestId("test")).not.toBeNull();
    });

    it("does show the child if the feature flag is set to a string", () => {
      release = { [FEATURE]: "abc" };

      const tree = (
        <FeatureFlagsProvider
          defaultEnvironment={defaultEnvironment}
          development={development}
          release={release}
        >
          <FeatureToggle feature={FEATURE}>{child}</FeatureToggle>
        </FeatureFlagsProvider>
      );

      const { queryByTestId } = render(tree);

      expect(queryByTestId("test")).not.toBeNull();
    });

    it("does show the child if the feature flag is set to a number", () => {
      release = { [FEATURE]: 0 };

      const tree = (
        <FeatureFlagsProvider
          defaultEnvironment={defaultEnvironment}
          development={development}
          release={release}
        >
          <FeatureToggle feature={FEATURE}>{child}</FeatureToggle>
        </FeatureFlagsProvider>
      );

      const { queryByTestId } = render(tree);

      expect(queryByTestId("test")).not.toBeNull();
    });

    it("does not show the child if the feature flag is false in the local flags", () => {
      release = { [FEATURE]: true };
      disableFeature(FEATURE);

      const tree = (
        <FeatureFlagsProvider
          defaultEnvironment={defaultEnvironment}
          development={development}
          release={release}
        >
          <FeatureToggle feature={FEATURE}>{child}</FeatureToggle>
        </FeatureFlagsProvider>
      );

      const { queryByTestId } = render(tree);

      expect(queryByTestId("test")).toBeNull();
    });

    it("does show the child if the feature flag is true in the local flags", () => {
      release = { [FEATURE]: false };
      enableFeature(FEATURE);

      const tree = (
        <FeatureFlagsProvider
          defaultEnvironment={defaultEnvironment}
          development={development}
          release={release}
        >
          <FeatureToggle feature={FEATURE}>{child}</FeatureToggle>
        </FeatureFlagsProvider>
      );

      const { queryByTestId } = render(tree);

      expect(queryByTestId("test")).not.toBeNull();
    });

    it("does show multiple children if the feature flags are true in the local flags", () => {
      release = { [FEATURE]: false, [ALTFEATURE]: false };
      enableFeature([FEATURE, ALTFEATURE]);

      const tree = (
        <FeatureFlagsProvider
          defaultEnvironment={defaultEnvironment}
          development={development}
          release={release}
        >
          <FeatureToggle feature={FEATURE}>{child}</FeatureToggle>
          <FeatureToggle feature={ALTFEATURE}>{altChild}</FeatureToggle>
        </FeatureFlagsProvider>
      );

      const { queryByTestId } = render(tree);

      expect(queryByTestId("test")).not.toBeNull();
      expect(queryByTestId("alttest")).not.toBeNull();
    });
  });

  describe("all flags", () => {
    let allFlagsFunc: SpyInstanceFn<FeatureFlags[], null>;
    function TestFeatureFlags({
      children,
    }: {
      children: (flags: FeatureFlags) => null;
    }) {
      const flags = useAllFeatureFlags();
      return children(flags);
    }

    beforeEach(() => {
      allFlagsFunc = vi.fn();
      allFlagsFunc.mockReturnValue(null);
    });

    it("allows you to access all flags", () => {
      release = { test: true };

      const tree = (
        <FeatureFlagsProvider
          defaultEnvironment={defaultEnvironment}
          development={development}
          release={release}
        >
          <TestFeatureFlags>{allFlagsFunc}</TestFeatureFlags>
        </FeatureFlagsProvider>
      );

      render(tree);

      expect(allFlagsFunc).toHaveBeenCalledWith(release);
    });

    it("updates the flags when they change", () => {
      release = { test: true };

      const tree = (
        <FeatureFlagsProvider
          defaultEnvironment={defaultEnvironment}
          development={development}
          release={release}
        >
          <TestFeatureFlags>{allFlagsFunc}</TestFeatureFlags>
        </FeatureFlagsProvider>
      );

      render(tree);
      act(() => {
        disableFeature("test");
      });

      expect(allFlagsFunc).toHaveBeenLastCalledWith({ test: false });
    });
  });

  describe("feature environment", () => {
    it("uses the release feature set if the environment is 'release'", () => {
      const tree = (
        <FeatureFlagsProvider
          defaultEnvironment={RELEASE}
          development={development}
          release={release}
        >
          <FeatureToggle feature={EXPERIMENTAL}>{child}</FeatureToggle>
        </FeatureFlagsProvider>
      );

      const { queryByTestId } = render(tree);

      expect(queryByTestId("test")).toBeNull();
    });

    it("uses the development feature set if the environment is 'development'", () => {
      const tree = (
        <FeatureFlagsProvider
          defaultEnvironment={DEVELOPMENT}
          development={development}
          release={release}
        >
          <FeatureToggle feature={EXPERIMENTAL}>{child}</FeatureToggle>
        </FeatureFlagsProvider>
      );

      const { queryByTestId } = render(tree);

      expect(queryByTestId("test")).not.toBeNull();
    });

    it("allows you to switch to the feature environment", () => {
      const tree = (
        <FeatureFlagsProvider
          defaultEnvironment={RELEASE}
          development={development}
          release={release}
        >
          <FeatureToggle feature={EXPERIMENTAL}>{child}</FeatureToggle>
        </FeatureFlagsProvider>
      );

      const { queryByTestId } = render(tree);

      act(() => {
        setEnvironment(DEVELOPMENT);
      });

      expect(queryByTestId("test")).not.toBeNull();
    });
  });

  describe("remote flags", () => {
    it("shows the child if the remote feature flag resolves to true", async () => {
      release = { [FEATURE]: false };
      const { promise, resolve } = createPromise();

      const tree = (
        <FeatureFlagsProvider
          defaultEnvironment={defaultEnvironment}
          development={development}
          release={release}
          remote={promise}
        >
          <FeatureToggle feature={FEATURE}>{child}</FeatureToggle>
        </FeatureFlagsProvider>
      );

      const { queryByTestId } = render(tree);

      expect(queryByTestId("test")).toBeNull();

      await act(async () => {
        resolve({ [FEATURE]: true });
        await promise;
      });

      expect(queryByTestId("test")).not.toBeNull();
    });

    it("hides the child if the remote feature flag resolves to false", async () => {
      release = { [FEATURE]: true };
      const { promise, resolve } = createPromise();

      const tree = (
        <FeatureFlagsProvider
          defaultEnvironment={defaultEnvironment}
          development={development}
          release={release}
          remote={promise}
        >
          <FeatureToggle feature={FEATURE}>{child}</FeatureToggle>
        </FeatureFlagsProvider>
      );

      const { queryByTestId } = render(tree);

      expect(queryByTestId("test")).not.toBeNull();

      await act(async () => {
        resolve({ [FEATURE]: false });
        await promise;
      });

      expect(queryByTestId("test")).toBeNull();
    });

    it("ignores the remote flags if they reject", async () => {
      release = { [FEATURE]: true };
      const { promise, reject } = createPromise();

      const tree = (
        <FeatureFlagsProvider
          defaultEnvironment={defaultEnvironment}
          development={development}
          release={release}
          remote={promise}
        >
          <FeatureToggle feature={FEATURE}>{child}</FeatureToggle>
        </FeatureFlagsProvider>
      );

      const { queryByTestId } = render(tree);

      expect(queryByTestId("test")).not.toBeNull();

      await act(async () => {
        reject(new Error("test"));
        await promise.catch(() => null);
      });

      expect(queryByTestId("test")).not.toBeNull();
    });

    it("ignores the remote flags if they are null", async () => {
      release = { [FEATURE]: true };
      const { promise, resolve } = createPromise();

      const tree = (
        <FeatureFlagsProvider
          defaultEnvironment={defaultEnvironment}
          development={development}
          release={release}
          remote={promise}
        >
          <FeatureToggle feature={FEATURE}>{child}</FeatureToggle>
        </FeatureFlagsProvider>
      );

      const { queryByTestId } = render(tree);

      expect(queryByTestId("test")).not.toBeNull();

      await act(async () => {
        resolve({ [FEATURE]: null });
        await promise;
      });

      expect(queryByTestId("test")).not.toBeNull();
    });

    function createPromise(): {
      promise: Promise<FeatureFlagsSource>;
      resolve: (value: FeatureFlagsSource) => void;
      reject: (reason: Error) => void;
    } {
      let resolve: (value: FeatureFlagsSource) => void;
      let reject: (reason: Error) => void;
      const promise = new Promise<FeatureFlagsSource>((res, rej) => {
        resolve = res;
        reject = rej;
      });

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return { promise, resolve, reject };
    }
  });

  describe("applyDevTools", () => {
    interface FeatureFlagsDevTools extends Window {
      isFeatureEnabled(feature: string): boolean | null;
      enableFeature(feature: string): FeatureFlags;
      disableFeature(feature: string): FeatureFlags;
      getFeatures(): FeatureFlags;
      clearFeatures(): void;
      getEnvironment(): Environment | null;
      setEnvironment(environment: Environment): void;
      clearEnvironment(): void;
      getFeatureValue(feature: string): FeatureFlagValue | null;
      changeFeatureValue(
        feature: string,
        value: FeatureFlagValue
      ): FeatureFlags;
    }

    let window: FeatureFlagsDevTools;
    beforeEach(() => {
      window = {} as never as FeatureFlagsDevTools;
    });

    it("adds isFeatureEnabled to the window object", () => {
      release = { [FEATURE]: true };

      const tree = (
        <FeatureFlagsProvider
          defaultEnvironment={defaultEnvironment}
          development={development}
          release={release}
          applyDevTools={window}
        >
          <FeatureToggle feature={FEATURE}>{child}</FeatureToggle>
        </FeatureFlagsProvider>
      );

      render(tree);

      expect(window.isFeatureEnabled(FEATURE)).toEqual(true);
    });

    it("adds enableFeature to the window object", () => {
      const tree = (
        <FeatureFlagsProvider
          defaultEnvironment={defaultEnvironment}
          development={development}
          release={release}
          applyDevTools={window}
        >
          <FeatureToggle feature={FEATURE}>{child}</FeatureToggle>
        </FeatureFlagsProvider>
      );

      render(tree);

      expect(window.enableFeature).toBe(enableFeature);
    });

    it("adds disableFeature to the window object", () => {
      const tree = (
        <FeatureFlagsProvider
          defaultEnvironment={defaultEnvironment}
          development={development}
          release={release}
          applyDevTools={window}
        >
          <FeatureToggle feature={FEATURE}>{child}</FeatureToggle>
        </FeatureFlagsProvider>
      );

      render(tree);

      expect(window.disableFeature).toBe(disableFeature);
    });

    it("adds getFeatures to the window object", () => {
      const tree = (
        <FeatureFlagsProvider
          defaultEnvironment={defaultEnvironment}
          development={development}
          release={release}
          applyDevTools={window}
        >
          <FeatureToggle feature={FEATURE}>{child}</FeatureToggle>
        </FeatureFlagsProvider>
      );

      render(tree);

      expect(window.getFeatures).toBe(getFeatures);
    });

    it("adds getEnvironment to the window object", () => {
      const tree = (
        <FeatureFlagsProvider
          defaultEnvironment={defaultEnvironment}
          development={development}
          release={release}
          applyDevTools={window}
        >
          <FeatureToggle feature={FEATURE}>{child}</FeatureToggle>
        </FeatureFlagsProvider>
      );

      render(tree);

      expect(window.getEnvironment).toBe(getEnvironment);
    });

    it("adds setEnvironment to the window object", () => {
      const tree = (
        <FeatureFlagsProvider
          defaultEnvironment={defaultEnvironment}
          development={development}
          release={release}
          applyDevTools={window}
        >
          <FeatureToggle feature={FEATURE}>{child}</FeatureToggle>
        </FeatureFlagsProvider>
      );

      render(tree);

      expect(window.setEnvironment).toBe(setEnvironment);
    });

    it("adds clearEnvironment to the window object", () => {
      const tree = (
        <FeatureFlagsProvider
          defaultEnvironment={defaultEnvironment}
          development={development}
          release={release}
          applyDevTools={window}
        >
          <FeatureToggle feature={FEATURE}>{child}</FeatureToggle>
        </FeatureFlagsProvider>
      );

      render(tree);

      expect(window.clearEnvironment).toBe(clearEnvironment);
    });

    it("adds getFeatureValue to the window object", () => {
      release = { [FEATURE]: "abc" };

      const tree = (
        <FeatureFlagsProvider
          defaultEnvironment={defaultEnvironment}
          development={development}
          release={release}
          applyDevTools={window}
        >
          <FeatureToggle feature={FEATURE}>{child}</FeatureToggle>
        </FeatureFlagsProvider>
      );

      render(tree);

      expect(window.getFeatureValue(FEATURE)).toBe("abc");
    });

    it("adds changeFeatureValue to the window object", () => {
      release = { [FEATURE]: "abc" };

      const tree = (
        <FeatureFlagsProvider
          defaultEnvironment={defaultEnvironment}
          development={development}
          release={release}
          applyDevTools={window}
        >
          <FeatureToggle feature={FEATURE}>{child}</FeatureToggle>
        </FeatureFlagsProvider>
      );

      render(tree);

      expect(window.changeFeatureValue(FEATURE, "def")).toEqual({
        [FEATURE]: "def",
      });
    });
  });

  describe("validate feature flag value", () => {
    it("should check that the feature flag value is valid", () => {
      expect(isValidFeatureFlagValue(null)).toBe(false);
      expect(isValidFeatureFlagValue(true)).toBe(true);
      expect(isValidFeatureFlagValue(10)).toBe(true);
      expect(isValidFeatureFlagValue("abc")).toBe(true);
      expect(isValidFeatureFlagValue({})).toBe(false);
      expect(isValidFeatureFlagValue([1, 2, 3])).toBe(false);
    });
  });
});
