import { act, cleanup, renderHook } from "@testing-library/react-hooks";
import { expect } from "vitest";
import FeatureFlagsSource from "./FeatureFlagsSource";
import useRemoteFlags from "./useRemoteFlags";

describe("useRemoteFlags", () => {
  afterEach(cleanup);

  it("returns an empty object while the promise is unresolved", async () => {
    const { promise, resolve } = createPromise();

    const { result } = renderHook(() => useRemoteFlags(promise));

    expect(result.current).toEqual({});

    await act(async () => {
      resolve({});
      await promise;
    });
  });

  it("returns the resolved flags", async () => {
    const { promise, resolve } = createPromise();

    const { result } = renderHook(() => useRemoteFlags(promise));

    await act(async () => {
      resolve({ experimental: true });
      await promise;
    });

    expect(result.current).toEqual({
      experimental: true,
    });
  });

  it("returns the resolved flags for multiple flag sources", async () => {
    const { promise, resolve } = createPromise();

    const { result } = renderHook(() => useRemoteFlags(promise));

    await act(async () => {
      resolve([{ experimental: true }, { otherFlag: true }]);
      await promise;
    });

    expect(result.current).toEqual({
      experimental: true,
      otherFlag: true,
    });
  });

  it("ignores the resolved flags if the promise has changed", async () => {
    const { promise: promise1, resolve: resolve1 } = createPromise();
    const { promise: promise2, resolve: resolve2 } = createPromise();

    const { result, rerender } = renderHook(
      ({ promise }) => useRemoteFlags(promise),
      {
        initialProps: {
          promise: promise1,
        },
      }
    );

    rerender({ promise: promise2 });
    await act(async () => {
      resolve1({ experimental: true });
      await promise1;
    });

    expect(result.current).toEqual({});

    await act(async () => {
      resolve2({ experimental: false });
      await promise2;
    });

    expect(result.current).toEqual({ experimental: false });
  });

  it("returns an empty object if the promise is rejected", async () => {
    const { promise, reject } = createPromise();

    const { result } = renderHook(() => useRemoteFlags(promise));

    await act(async () => {
      reject(new Error("test"));
      await promise.catch(() => null);
    });

    expect(result.current).toEqual({});
  });

  function createPromise(): {
    promise: Promise<FeatureFlagsSource | FeatureFlagsSource[]>;
    resolve: (value: FeatureFlagsSource | FeatureFlagsSource[]) => void;
    reject: (reason: Error) => void;
  } {
    let resolve: (value: FeatureFlagsSource | FeatureFlagsSource[]) => void;
    let reject: (reason: Error) => void;
    const promise = new Promise<FeatureFlagsSource | FeatureFlagsSource[]>(
      (res, rej) => {
        resolve = res;
        reject = rej;
      }
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return { promise, resolve, reject };
  }
});
