import "@testing-library/jest-dom";
/// <reference types="vitest/globals" />

// Throw if a console error matches the blacklist
const blacklist = [
  "Invalid prop",
  "Failed prop type",
  "Can't call setState (or forceUpdate) on an unmounted component",
  'Each child in an array or iterator should have a unique "key" prop',
];

const error = console.error;
console.error = (message: string, ...args: unknown[]) => {
  blacklist.forEach((item) => {
    if (message?.indexOf?.(item) !== -1) throw new Error(message);
  });

  error.apply(console, [message, ...args]);
};
