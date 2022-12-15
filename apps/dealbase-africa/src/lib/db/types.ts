import { Collections } from "types";

export interface WithId {
  id: number;
}

export interface CRUD {
  getAll<T extends WithId>(collection: Collections): Promise<T[]>;
  getById<T extends WithId>(
    collection: Collections,
    id: number
  ): Promise<T | null>;
  create<T>(collection: Collections, data: T): Promise<T & WithId>;
  createMany<T>(collection: Collections, data: T[]): Promise<(T & WithId)[]>;
  update<T extends WithId>(
    collection: Collections,
    data: Partial<T>,
    id?: number
  ): Promise<T | null>;
  delete(collection: Collections, id: string): Promise<boolean>;
}

export interface IRepository {
  getAll<T extends WithId>(collection: Collections): Promise<T[]>;
  getById<T extends WithId>(
    collection: Collections,
    id: number
  ): Promise<T | null>;
  create<T>(collection: Collections, data: T): Promise<T & WithId>;
  createMany<T>(collection: Collections, data: T[]): Promise<(T & WithId)[]>;
  update<T extends WithId>(
    collection: Collections,
    data: Partial<T>,
    id?: number
  ): Promise<T | null>;
  delete(collection: Collections, id: string): Promise<boolean>;
}

export interface IService {
  getAll<T extends WithId>(collection: Collections): Promise<T[]>;
  getById<T extends WithId>(
    collection: Collections,
    id: number
  ): Promise<T | null>;
  create<T extends WithId>(collection: Collections, data: T): Promise<T>;
  update<T extends WithId>(
    collection: Collections,
    data: Partial<T>,
    id?: number
  ): Promise<T | null>;
  delete(collection: Collections, id: string): Promise<boolean>;
}
