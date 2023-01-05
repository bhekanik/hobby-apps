import { commentSchema } from "~/types/Comment";
import { getXataClient } from "~/xata";

const xata = getXataClient();

export const getComment = async (commentId: string) => {
  return await xata.db.comments.read(commentId);
};

export const getAllComments = async () => {
  const comments = await xata.db.comments.sort("created_at", "asc").getAll();

  return comments;
};

export const getComments = async (confessionId: string) => {
  const comments = await xata.db.comments.sort("created_at", "desc").getAll({
    filter: {
      "post.id": confessionId,
    },
  });

  return comments;
};

export const createComment = async (
  content: string,
  poster: string,
  confessionId: string
) => {
  const comment = {
    content,
    poster,
    post: confessionId,
    created_at: new Date(),
  };

  commentSchema.parse(comment);

  return await xata.db.comments.create(comment);
};
