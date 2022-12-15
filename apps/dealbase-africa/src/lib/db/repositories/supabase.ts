import { supabase } from "src/lib/supabaseClient";
import { Collections } from "types";
import { IRepository, WithId } from "../types";

export class SupabaseRepository implements IRepository {
  constructor() {
    //
  }

  public async getAll<T extends WithId>(collection: Collections): Promise<T[]> {
    return JSON.parse(window.localStorage.getItem(collection) || "[]");
  }

  public async getById<T extends WithId>(
    collection: Collections,
    id: number
  ): Promise<T | null> {
    const tableData = await this.getAll<T>(collection);
    return tableData.find((item: T) => item.id === id) || null;
  }

  public async create<T>(
    collection: Collections,
    data: T
  ): Promise<T & WithId> {
    const { data: savedData, error } = await supabase
      .from(collection)
      .insert([data])
      .single();

    if (error) throw error;

    return savedData;
  }

  public async createMany<T>(
    collection: Collections,
    data: T[]
  ): Promise<(T & WithId)[]> {
    const { data: savedData, error } = await supabase
      .from(collection)
      .insert(data);

    if (error) throw error;

    return savedData;
  }

  public async update<T extends WithId>(
    collection: Collections,
    data: Partial<T>,
    id: number
  ): Promise<T | null> {
    const { data: updatedData, error } = await supabase
      .from(collection)
      .update(data)
      .match({ id })
      .single();

    if (error) throw error;

    return updatedData;
  }

  public async delete(collection: Collections, id: string): Promise<boolean> {
    const { error } = await supabase.from(collection).delete().eq("id", id);

    if (error) throw error;

    return true;
  }
}
