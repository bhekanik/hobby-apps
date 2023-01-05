import { confessionSchema } from "~/types/Confession";
import { getXataClient } from "~/xata";

const xata = getXataClient();

export const getConfession = async (confessionId: string) => {
  return await xata.db.confessions.read(confessionId);
};

export const getConfessions = async (roomId: string) => {
  const page = await xata.db.confessions
    .sort("likes", "desc")
    .sort("created_at", "desc")
    .getPaginated({
      pagination: {
        size: 15,
      },
      filter: {
        "room.id": roomId,
      },
    });

  return page;
};

export const createConfession = async (data: object) => {
  const confession = {
    ...data,
    likes: 0,
    views: 0,
    created_at: new Date(),
  };

  confessionSchema.parse(confession);

  return await xata.db.confessions.create(confession);
};

export const likeConfession = async (
  id: string,
  likes: number,
  action: "like" | "dislike"
) => {
  const newLikes = action === "like" ? likes + 1 : likes - 1;
  return await xata.db.confessions.update(id, {
    likes: newLikes,
  });
};

export const addConfessionView = async (id: string, views: number) => {
  const newViews = views + 1;
  return await xata.db.confessions.update(id, {
    views: newViews,
  });
};
