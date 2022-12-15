import { cleanup, render } from "@testing-library/react";
import { expect } from "vitest";
import FeatureFlagsBridge from "./FeatureFlagsBridge";
import FlagsContext from "./FlagsContext";
import FeatureFlags from "./types";

describe("FeatureFlagsBridge", () => {
  let target: FeatureFlags;
  beforeEach(() => {
    target = {};
  });
  afterEach(cleanup);

  it("sets the feature flags on the target object", () => {
    render(
      <FlagsContext.Provider value={{ test: true }}>
        <FeatureFlagsBridge target={target} />
      </FlagsContext.Provider>
    );

    expect(target).toHaveProperty("test", true);
  });

  it("updates the feature flags on the target object when the flags change", () => {
    const { rerender } = render(
      <FlagsContext.Provider value={{ test: true }}>
        <FeatureFlagsBridge target={target} />
      </FlagsContext.Provider>
    );

    rerender(
      <FlagsContext.Provider value={{ test: false }}>
        <FeatureFlagsBridge target={target} />
      </FlagsContext.Provider>
    );

    expect(target).toHaveProperty("test", false);
  });

  it("renders its children", () => {
    const { getByTestId } = render(
      <FlagsContext.Provider value={{ test: true }}>
        <FeatureFlagsBridge target={target}>
          <span data-testid="test">test</span>
        </FeatureFlagsBridge>
      </FlagsContext.Provider>
    );

    expect(getByTestId("test")).toHaveProperty("textContent", "test");
  });
});
