import { Poll, pollSchema } from "~/types/Poll";
import { getXataClient } from "~/xata";

const xata = getXataClient();

export const getPoll = async (pollId: string) => {
  return await xata.db.polls.read(pollId);
};

export const getPolls = async () => {
  return await xata.db.polls.sort("created_at").getPaginated({
    pagination: {
      size: 15,
    },
  });
};

export const getRoomPoll = async (roomId: string) => {
  const poll = await xata.db.polls.sort("created_at", "desc").getFirst({
    filter: {
      "room.id": roomId,
    },
  });

  return poll;
};

export const createPoll = async (question: string, roomId: string) => {
  const poll: Poll = {
    question,
    room: roomId,
    created_at: new Date(),
  };

  pollSchema.parse(poll);

  return await xata.db.polls.create(poll);
};
