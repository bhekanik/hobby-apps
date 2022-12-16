import { createCookieSessionStorage, redirect } from "@remix-run/node";
import bcrypt from "bcryptjs";
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
  try {
    const user = await xata.db.users
      .filter({
        username,
      })
      .getFirst();

    if (!user) return null;

    const { password: passwordHash, ...returnUser } = user;

    const isPasswordCorrect = await bcrypt.compare(password, passwordHash);

    if (!isPasswordCorrect) return null;

    return returnUser;
  } catch (error) {
    throw error;
  }
};

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "matcher_session",
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

function getUserSession(request: Request) {
  return storage.getSession(request.headers.get("Cookie"));
}

export async function getUserId(request: Request) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") return null;
  return userId;
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return userId;
}

export async function getCurrentUser(request: Request) {
  const userId = await getUserId(request);
  if (typeof userId !== "string") {
    return null;
  }

  try {
    const user = await xata.db.users.filter({
      id: userId,
    });
    return user;
  } catch {
    throw logout(request);
  }
}

export async function logout(request: Request) {
  const session = await getUserSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await storage.getSession();
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

export const register = async (newUser: Omit<User, "created_at" | "id">) => {
  try {
    const { password, ...remainingUser } = newUser;
    const passwordHash = await bcrypt.hash(password, 10);
    const user: User = {
      ...remainingUser,
      password: passwordHash,
      created_at: new Date(),
    };

    userSchema.parse(user);

    const createdUser = await xata.db.users.create(user);

    return {
      id: createdUser.id,
      username: createdUser.username,
      firstname: createdUser.firstname,
      lastname: createdUser.lastname,
      gender: createdUser.gender,
      whatsapp_username: createdUser.whatsapp_username,
      created_at: createdUser.created_at,
    };
  } catch (error) {
    throw error;
  }
};
