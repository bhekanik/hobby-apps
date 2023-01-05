import { json, LoaderFunction, MetaFunction } from "@remix-run/node";
import { Form, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { ChoiceResult } from "~/components/ChoiceResult";
import { Button } from "~/components/FormElements/Button";
import Header from "~/components/Header";
import { RoomCodeShare } from "~/components/RoomCodeShare";
import { AppLayout } from "~/layouts/AppLayout";
import { config, ThemeColor } from "~/lib/config";
import { getRoomImageUrl } from "~/lib/getRoomImageUrl";
import { getChoices } from "~/models/choices.server.";
import { getRoomPoll } from "~/models/polls.server.";
import { getRoom } from "~/models/rooms.server.";
import { Choice } from "~/types/Choice";
import { Poll } from "~/types/Poll";
import { Room } from "~/types/Room";

interface LoaderData {
  room: Room;
  poll: Poll;
  choices: Choice[];
  url: string;
}

export const meta: MetaFunction = ({ data }) => {
  return {
    title: `${config.appName} - Room Name: ${
      data.room?.name || "Unnamed Room"
    }`,
    "twitter:title": `${config.appName} - Room Name: ${
      data.room?.name || "Unnamed Room"
    }`,
    "og:title": `${config.appName} - Room Name: ${
      data.room?.name || "Unnamed Room"
    }`,
    description: config.appDescription,
    "twitter:description": config.appDescription,
    "og:description": config.appDescription,
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

  const url = getRoomImageUrl(room, params.theme as ThemeColor);

  return json({
    room,
    poll,
    url,
    choices,
  });
};

export default function Index() {
  const { room, poll, url, choices } = useLoaderData<LoaderData>();

  const totalVotes = choices.reduce((acc: number, cur: Choice) => {
    return acc + cur.votes;
  }, 0);

  return (
    <AppLayout>
      <div className="flex flex-col max-w-4xl gap-4 w-full mx-auto sticky top-0 bg-gray-800 z-20 border-b-[1px] border-gray-700">
        <Header room={room} home />
        <div className="flex flex-col gap-4 px-8 items-center justify-center w-full">
          <RoomCodeShare poll className="w-full" room={room} />
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto z-10">
        <div className="flex flex-col p-8 gap-4">
          <h3 className="text-3xl">{poll.question}</h3>
          <div className="flex flex-col gap-2 w-full justify-start items-start">
            {choices.map((choice: Choice) => (
              <ChoiceResult
                key={choice.id}
                choice={choice}
                totalVotes={totalVotes}
              />
            ))}
          </div>
          <Form method="get">
            <Button type="submit" className="px-8">
              Get latest results
            </Button>
          </Form>
        </div>
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
