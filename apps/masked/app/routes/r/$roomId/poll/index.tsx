import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import {
  Form,
  useActionData,
  useCatch,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import { useEffect } from "react";
import invariant from "tiny-invariant";
import { ZodError } from "zod";
import { Button } from "~/components/FormElements/Button";
import Header from "~/components/Header";
import { RoomCodeShare } from "~/components/RoomCodeShare";
import { AppLayout } from "~/layouts/AppLayout";
import { badRequest } from "~/lib/badRequest";
import { config, ThemeColor } from "~/lib/config";
import { getRoomImageUrl } from "~/lib/getRoomImageUrl";
import { getChoices, voteForChoice } from "~/models/choices.server.";
import { getRoomPoll } from "~/models/polls.server.";
import { getRoom } from "~/models/rooms.server.";
import { Choice } from "~/types/Choice";
import { Poll } from "~/types/Poll";
import { Room } from "~/types/Room";
import { SerializeDate } from "~/types/SerializeDate";

interface LoaderData {
  room: Room;
  poll: Poll;
  choices: Choice[];
  url: string;
}

export const meta: MetaFunction = ({ data }) => {
  return {
    title: `${config.appName} -  ${data.poll?.question || ""}`,
    "twitter:title": `${config.appName} - ${data.poll?.question || ""}`,
    "og:title": `${config.appName} - ${data.poll?.question || ""}`,
    description: "Anonymous Poll",
    "twitter:description": "Anonymous Poll",
    "og:description": "Anonymous Poll",
    "og:image": data.url,
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:image:secure_url": data.url,
    "twitter:image": data.url,
  };
};

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.roomId);

  const room = await getRoom(params.roomId);
  const poll = await getRoomPoll(params.roomId);
  let choices = null;

  if (poll) {
    choices = await getChoices(poll.id);
  }

  const url = getRoomImageUrl(room, params.theme as ThemeColor, poll);

  return json({
    room,
    poll,
    url,
    choices,
  });
};

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const { vote: choiceId, ...choiceVotes } = Object.fromEntries(formData);

    const votes = choiceVotes[choiceId as string];

    const choice = await voteForChoice(choiceId as string, +votes);

    return json({ choice });
  } catch (error) {
    return badRequest({
      formError: (error as ZodError).message ?? `Required values are missing.`,
    });
  }
};

export default function Index() {
  const { room, poll, url, choices } = useLoaderData<LoaderData>();

  const actionData = useActionData();

  const navigate = useNavigate();

  useEffect(() => {
    if (!actionData) return;

    if (actionData.choice) {
      navigate(`/${config.roomsPath}/${room.id}/poll/results`);
    }
  }, [actionData]);

  return (
    <AppLayout>
      <div className="flex flex-col max-w-4xl gap-4 w-full mx-auto sticky top-0 bg-gray-800 z-20 border-b-[1px] border-gray-700">
        <Header room={room} home />
        <div className="flex flex-col gap-4 px-8 items-center justify-center w-full">
          <RoomCodeShare share className="w-full" room={room} />
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto z-10">
        <Form method="post" className="flex flex-col p-8 gap-4">
          <h3 className="text-3xl">{poll.question}</h3>
          <div className="flex flex-col gap-2 w-full justify-start items-start">
            {choices.map((choice: SerializeDate<Choice>) => (
              <label
                key={choice.id}
                className="flex flex-row gap-2 justify-start items-center w-full"
              >
                <input type="hidden" name={choice.id} value={choice.votes} />
                <input
                  type="radio"
                  name="vote"
                  value={choice.id}
                  className="accent-gray-800"
                />
                {choice.description}
              </label>
            ))}
          </div>
          <Button type="submit">Submit Vote</Button>
        </Form>
      </div>
    </AppLayout>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return (
      <AppLayout>
        <div className="flex flex-col max-w-4xl gap-4 w-full mx-auto sticky top-0 bg-gray-800 z-20 border-b-[1px] border-gray-700">
          <Header home />
        </div>
        <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto z-10">
          <div>Not found</div>
        </div>
      </AppLayout>
    );
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
