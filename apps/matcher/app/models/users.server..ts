import { User, userSchema } from "~/types/User";
import { getXataClient } from "~/xata";

const xata = getXataClient();

export const getUser = async (userId: string) => {
  return await xata.db.users.read(userId);
};

export const getAllUsers = async () => {
  return await xata.db.users.sort("created_at", "desc").getMany();
};

export const login = async (username: string, password: string) => {
  return await xata.db.users
    .filter({
      username,
      password,
    })
    .getFirst();
};

export const register = async (newUser: Omit<User, "created_at" | "id">) => {
  const user: User = {
    ...newUser,
    created_at: new Date(),
  };

  userSchema.parse(user);

  return await xata.db.users.create(user);
};
