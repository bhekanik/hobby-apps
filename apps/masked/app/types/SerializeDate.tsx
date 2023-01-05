export type SerializeDate<T> =
  | T
  | (Omit<T, "created_at"> & { created_at: string });
