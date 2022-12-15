import { SupabaseRepository } from "./repositories/supabase";
import { DbService } from "./service";

const supabaseRepository = new SupabaseRepository();

export const db = new DbService(supabaseRepository);
