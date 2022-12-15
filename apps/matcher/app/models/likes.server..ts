import { Like, likeSchema } from "~/types/Like";
import { getXataClient } from "~/xata";

const xata = getXataClient();

export const getLike = async (likeId: string) => {
  return await xata.db.likes.read(likeId);
};

export const getAllLikes = async () => {
  return await xata.db.likes.sort("created_at", "desc").getMany();
};

type GetByToOrFrom =
  | { to: string; from: string }
  | { to: string; from?: never }
  | { to?: never; from: string };

export const getLikesByToOrFrom = async (options: GetByToOrFrom) => {
  const filter = {};

  if (options.to) (filter as { to: string }).to = options.to;
  if (options.from) (filter as { from: string }).from = options.from;

  return await xata.db.likes
    .select(["*", "to.*", "from.*"])
    .filter(filter)
    .getMany();
};

export const createLikes = async (
  newLikes: Omit<Like, "created_at" | "id">[]
) => {
  const likes = newLikes.map((newLike) => {
    const like = {
      ...newLike,
      created_at: new Date(),
    };

    likeSchema.parse(like);

    return like;
  });

  return await xata.db.likes.create(likes);
};
