class StorageAdapter {
  private readonly getStorageArea: () => Storage;

  constructor(getStorageArea: () => Storage) {
    this.getStorageArea = getStorageArea;
  }

  getItem = (key: string): string | null => {
    try {
      return this.getStorageArea().getItem(key);
    } catch {
      return null;
    }
  };

  setItem = (key: string, value: string): void => {
    try {
      const storageArea = this.getStorageArea();
      const oldValue = storageArea[key];

      storageArea.setItem(key, value);

      const event = new StorageEvent("storage", {
        key,
        storageArea,
        oldValue,
        newValue: value,
      });
      window.dispatchEvent(event);
    } catch {
      return;
    }
  };

  removeItem = (key: string): void => {
    try {
      const storageArea = this.getStorageArea();
      const oldValue = storageArea[key];

      storageArea.removeItem(key);

      const event = new StorageEvent("storage", {
        key,
        storageArea,
        oldValue,
        newValue: null,
      });
      window.dispatchEvent(event);
    } catch {
      return;
    }
  };
}

export const sessionStorageAdapter = new StorageAdapter(
  () => window.sessionStorage
);
