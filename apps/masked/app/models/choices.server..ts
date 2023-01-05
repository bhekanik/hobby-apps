import { Choice, choiceSchema } from "~/types/Choice";
import { getXataClient } from "~/xata";

const xata = getXataClient();

export const getChoice = async (choiceId: string) => {
  return await xata.db.choices.read(choiceId);
};

export const getAllChoices = async () => {
  const choices = await xata.db.choices.sort("created_at", "asc").getAll();

  return choices;
};

export const getChoices = async (pollId: string) => {
  const choices = await xata.db.choices.sort("created_at", "desc").getAll({
    filter: {
      "poll.id": pollId,
    },
  });

  return choices;
};

export const createChoice = async (description: string, pollId: string) => {
  const choice: Choice = {
    description,
    poll: pollId,
    votes: 0,
    percentage: 0.0,
    created_at: new Date(),
  };

  choiceSchema.parse(choice);

  return await xata.db.choices.create(choice);
};

export const voteForChoice = async (choiceId: string, votes: number) => {
  const newVotes = votes + 1;
  const newChoice = await xata.db.choices.update(choiceId, {
    votes: newVotes,
  });

  return newChoice;
};
