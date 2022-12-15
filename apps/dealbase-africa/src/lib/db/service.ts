import { Collections } from "types";
import { IRepository, IService, WithId } from "./types";

export class DbService implements IService {
  private repository: IRepository;

  constructor(repository: IRepository) {
    this.repository = repository;
  }

  public async getAll<T extends WithId>(collection: Collections): Promise<T[]> {
    return this.repository.getAll<T>(collection);
  }

  public async getById<T extends WithId>(
    collection: Collections,
    id: number
  ): Promise<T | null> {
    return this.repository.getById<T>(collection, id);
  }

  public async createMany<T>(
    collection: Collections,
    data: T[]
  ): Promise<(T & WithId)[]> {
    return this.repository.createMany<T>(collection, data);
  }

  public async create<T>(
    collection: Collections,
    data: T
  ): Promise<T & WithId> {
    return this.repository.create<T>(collection, data);
  }

  public async update<T extends WithId>(
    collection: Collections,
    data: Partial<T>,
    id?: number
  ): Promise<T | null> {
    return this.repository.update<T>(collection, data, id);
  }

  public async delete(collection: Collections, id: string): Promise<boolean> {
    return this.repository.delete(collection, id);
  }
}
