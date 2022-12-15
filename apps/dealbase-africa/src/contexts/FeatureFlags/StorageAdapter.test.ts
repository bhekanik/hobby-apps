import { expect, SpyInstance, SpyInstanceFn, vi } from "vitest";
import { sessionStorageAdapter } from "./StorageAdapter";

describe("StorageAdapter", () => {
  let sessionStorageSpy: SpyInstance<[], Storage>;
  let handler: SpyInstanceFn<any[], [StorageEvent]>;

  beforeEach(() => {
    const sessionStorage = window.sessionStorage;
    sessionStorage.clear();
    sessionStorageSpy = vi.spyOn(window, "sessionStorage", "get");
    sessionStorageSpy.mockImplementation(() => sessionStorage);
    handler = vi.fn();
    window.addEventListener("storage", handler);
  });

  afterEach(() => {
    sessionStorageSpy.mockRestore();
    window.removeEventListener("storage", handler);
  });

  it("returns null if the item is not set", () => {
    expect(sessionStorageAdapter.getItem("test")).toBeNull();
  });

  it("returns the value if the item is set", () => {
    sessionStorage["test"] = "123";

    expect(sessionStorageAdapter.getItem("test")).toBe("123");
  });

  it("returns the null if sessionStorage is unavailable", () => {
    sessionStorageSpy.mockImplementation(() => {
      throw Error("test");
    });

    expect(sessionStorageAdapter.getItem("test")).toBeNull();
  });

  it("updates items in sessionStorage", () => {
    sessionStorageAdapter.setItem("test", "123");

    expect(sessionStorage["test"]).toBe("123");
  });

  it("dispatches a storage event when updating an item in sessionStorage", () => {
    sessionStorageAdapter.setItem("test", "123");

    expect(handler).toHaveBeenCalledWith(
      expect.objectContaining({
        key: "test",
        storageArea: sessionStorage,
        oldValue: null,
        newValue: "123",
      })
    );
  });

  it("fails silently when updating an item and sessionStorage is unavailable", () => {
    sessionStorageSpy.mockImplementation(() => {
      throw Error("test");
    });

    sessionStorageAdapter.setItem("test", "123");
  });

  it("removes an item in sessionStorage", () => {
    sessionStorage["test"] = "123";

    sessionStorageAdapter.removeItem("test");

    expect(sessionStorage.getItem("test")).toBeNull();
  });

  it("dispatches a storage event when removing an item in sessionStorage", () => {
    sessionStorage["test"] = "123";

    sessionStorageAdapter.removeItem("test");

    expect(handler).toHaveBeenCalledWith(
      expect.objectContaining({
        key: "test",
        storageArea: sessionStorage,
        oldValue: "123",
        newValue: null,
      })
    );
  });

  it("fails silently when removing an item and sessionStorage is unavailable", () => {
    sessionStorageSpy.mockImplementation(() => {
      throw Error("test");
    });

    sessionStorageAdapter.removeItem("test");
  });
});
