import React from "react";
import { expect } from "vitest";
import { getDisplayName } from "./reactHelpers";

describe("reactHelpers", () => {
  describe("getDisplayName", () => {
    it("returns the displayName if it is set", () => {
      const Component = () => null;
      Component.displayName = "DisplayName";

      expect(getDisplayName(Component)).toEqual("DisplayName");
    });

    it("returns the name if it is set", () => {
      class Name extends React.Component<unknown> {}

      expect(getDisplayName(Name)).toEqual("Name");
    });

    it("returns 'Component' if name and displayName are not set", () => {
      const Component = () => null;

      expect(getDisplayName(Component)).toEqual("Component");
    });
  });
});
