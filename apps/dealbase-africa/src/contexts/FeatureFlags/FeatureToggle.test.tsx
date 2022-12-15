import { act, cleanup, render } from "@testing-library/react";
import { ReactNode } from "react";
import { expect } from "vitest";
import { ApiContext } from "./ApiContext";
import FeatureFlagsBrokerImpl from "./FeatureFlagsBroker";
import FeatureToggle from "./FeatureToggle";

describe("FeatureToggle", () => {
  let broker: FeatureFlagsBrokerImpl;
  let child: ReactNode;
  beforeEach(() => {
    broker = new FeatureFlagsBrokerImpl();
    child = <span data-testid="test">test</span>;
  });
  afterEach(cleanup);

  it("does not render the child if the defaultValue is false and there is no provider", () => {
    const tree = <FeatureToggle feature="test">{child}</FeatureToggle>;
    const { queryByTestId } = render(tree);

    expect(queryByTestId("test")).toBeNull();
  });

  it("renders the child if the defaultValue is true and there is no provider", () => {
    const tree = (
      <FeatureToggle feature="test" defaultValue={true}>
        {child}
      </FeatureToggle>
    );
    const { queryByTestId } = render(tree);

    expect(queryByTestId("test")).not.toBeNull();
  });

  it("does not render the child if there is a provider and the flag is not set", () => {
    const tree = (
      <ApiContext.Provider value={broker}>
        <FeatureToggle feature="test">{child}</FeatureToggle>
      </ApiContext.Provider>
    );
    const { queryByTestId } = render(tree);

    expect(queryByTestId("test")).toBeNull();
  });

  it("does render the child if the defaultValue is true and the flag is not set", () => {
    const tree = (
      <ApiContext.Provider value={broker}>
        <FeatureToggle feature="test" defaultValue={true}>
          {child}
        </FeatureToggle>
      </ApiContext.Provider>
    );
    const { queryByTestId } = render(tree);

    expect(queryByTestId("test")).not.toBeNull();
  });

  it("does not render the child if the defaultValue is true, but the flag is set to false", () => {
    broker.setFlags({ test: false });
    const tree = (
      <ApiContext.Provider value={broker}>
        <FeatureToggle feature="test" defaultValue={true}>
          {child}
        </FeatureToggle>
      </ApiContext.Provider>
    );
    const { queryByTestId } = render(tree);

    expect(queryByTestId("test")).toBeNull();
  });

  it("renders if the flag is turned on and the child is undefined", () => {
    broker.setFlags({ test: true });
    const tree = (
      <ApiContext.Provider value={broker}>
        <FeatureToggle feature="test" defaultValue={true}>
          {undefined}
        </FeatureToggle>
      </ApiContext.Provider>
    );

    render(tree); // This will throw an error if undefined is returned
  });

  it("renders the child if the flag is switched on", () => {
    broker.setFlags({ test: false });
    const tree = (
      <ApiContext.Provider value={broker}>
        <FeatureToggle feature="test" defaultValue={true}>
          {child}
        </FeatureToggle>
      </ApiContext.Provider>
    );
    const { queryByTestId } = render(tree);

    expect(queryByTestId("test")).toBeNull();

    act(() => broker.setFlags({ test: true }));

    expect(queryByTestId("test")).not.toBeNull();
  });

  it("removes the child if the flag is switched off", () => {
    broker.setFlags({ test: true });
    const tree = (
      <ApiContext.Provider value={broker}>
        <FeatureToggle feature="test" defaultValue={true}>
          {child}
        </FeatureToggle>
      </ApiContext.Provider>
    );
    const { queryByTestId } = render(tree);

    expect(queryByTestId("test")).not.toBeNull();

    act(() => broker.setFlags({ test: false }));

    expect(queryByTestId("test")).toBeNull();
  });
});
