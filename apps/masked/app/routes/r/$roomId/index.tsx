import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { Form, useActionData, useCatch, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import invariant from "tiny-invariant";
import { ZodError } from "zod";
import { Button } from "~/components/FormElements/Button";
import { Input } from "~/components/FormElements/Input";
import { LinkButton } from "~/components/FormElements/LinkButton";
import { Textarea } from "~/components/FormElements/Textarea";
import Header from "~/components/Header";
import { RoomCodeShare } from "~/components/RoomCodeShare";
import { AppLayout } from "~/layouts/AppLayout";
import { badRequest } from "~/lib/badRequest";
import { config, ThemeColor } from "~/lib/config";
import { getMainAppImageUrl } from "~/lib/getMainAppImageUrl";
import { createChoice } from "~/models/choices.server.";
import { createPoll } from "~/models/polls.server.";
import { getRoom } from "~/models/rooms.server.";
import { Poll } from "~/types/Poll";

interface ActionData {
  poll: Poll;
  choices: Choice[];
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const { question, roomId, ...choices } = Object.fromEntries(formData);

  try {
    const poll = await createPoll(question as string, roomId as string);

    const choicePromises: Promise<any>[] = [];
    Object.values(choices).forEach((choice) => {
      choicePromises.push(createChoice(choice as string, poll.id));
    });

    const newChoices = await Promise.all(choicePromises);

    return json({ poll, choices: newChoices });
  } catch (error) {
    return badRequest({
      formError: (error as ZodError).message ?? `Required values are missing.`,
    });
  }
};

export const meta: MetaFunction = ({ data }) => {
  return {
    title: config.appName,
    "twitter:title": config.appName,
    "og:title": config.appName,
    description: config.appDescription,
    "twitter:description": config.appDescription,
    "og:description": config.appDescription,
    "og:image": data?.url,
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:image:secure_url": data?.url,
    "twitter:image": data?.url,
  };
};

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.roomId);

  const room = await getRoom(params.roomId);

  const url = getMainAppImageUrl(params.theme as ThemeColor);

  return json({
    room,
    url,
  });
};

interface Choice {
  name: string;
  required: boolean;
  placeholder: string;
}

export default function Index() {
  const { room } = useLoaderData();
  const [choiceCounter, setChoiceCounter] = useState(2);

  const [choices, setChoices] = useState<Choice[]>([
    {
      name: "choice_1",
      required: true,
      placeholder: "Choice 1",
    },
    {
      name: "choice_2",
      required: true,
      placeholder: "Choice 2",
    },
  ]);

  const handleAddChoice = () => {
    setChoices((currentChoices) => [
      ...currentChoices,
      {
        name: `choice_${choiceCounter + 1}`,
        required: true,
        placeholder: `Choice ${choiceCounter + 1}`,
      },
    ]);
    setChoiceCounter((currentChoiceCounter) => currentChoiceCounter + 1);
  };

  const handleRemoveChoice = (index: number) => {
    setChoices((currentChoices) =>
      currentChoices.filter((_, idx) => idx !== index)
    );
  };

  const [pollCreated, setPollCreated] = useState(false);

  const actionData = useActionData<ActionData>();

  useEffect(() => {
    if (!actionData) return;
    if (actionData.poll && actionData.choices) {
      setPollCreated(true);
    }
  }, [actionData]);

  return (
    <AppLayout>
      <Header room={room} home />
      <div className="w-full flex flex-col gap-2 px-8">
        {room.type !== "poll" && (
          <>
            <p className="w-full text-center mb-2">
              Your Room Link. Use this link to access your room.{" "}
              {room.type === "ama" ? (
                <span>You will need your secret to see the posts.</span>
              ) : (
                <span>
                  Share this with anyone you want to invite to the room.
                </span>
              )}
            </p>

            <RoomCodeShare room={room} />
          </>
        )}

        {room.type === "poll" && pollCreated && (
          <>
            <p className="w-full text-center mb-2">
              Your Room Link. Use this link to access your room.{" "}
              <span>
                Share this with anyone you want to invite to the room.
              </span>
            </p>

            <RoomCodeShare poll room={room} />
          </>
        )}

        {room.type === "ama" && (
          <div className="py-4">
            <p className="w-full text-center mb-4">
              Your share Link. This is used to add posts to your room.
            </p>
            <RoomCodeShare room={room} share />
          </div>
        )}

        {room.type === "ama" && (
          <LinkButton
            to={`/${config.roomsPath}/${room.id}/ama/posts`}
            color="accent"
          >
            Enter Room{room.name && `: ${room.name}`}
          </LinkButton>
        )}

        {room.type === "default" && (
          <LinkButton
            to={`/${config.roomsPath}/${room.id}/posts`}
            color="accent"
          >
            Enter Room{room.name && `: ${room.name}`}
          </LinkButton>
        )}

        {room.type === "poll" && !pollCreated && (
          <Form method="post" className="my-4">
            <fieldset className="flex gap-2 flex-col">
              <Input type="hidden" name="roomId" value={room.id} />
              <Textarea
                rows={3}
                name="question"
                required
                className="w-full p-2 bg-gray-700"
                placeholder="Ask a question."
              />

              <fieldset className="flex flex-col gap-2">
                {choices.map((choice: Choice, index: number) => (
                  <fieldset key={choice.name} className="flex gap-2 flex-1">
                    <Input
                      name={choice.name}
                      required={choice.required}
                      placeholder={choice.placeholder}
                    />
                    {index > 1 && (
                      <Button
                        className="flex items-center flex-1"
                        onClick={() => handleRemoveChoice(index)}
                      >
                        ⨉
                      </Button>
                    )}
                  </fieldset>
                ))}
                <Button className="flex items-center" onClick={handleAddChoice}>
                  +
                </Button>
              </fieldset>

              <Button type="submit">"Submit"</Button>
            </fieldset>
          </Form>
        )}

        {room.type === "poll" && pollCreated && (
          <LinkButton
            to={`/${config.roomsPath}/${room.id}/poll`}
            color="accent"
          >
            Open Poll{room.name && `: ${room.name}`}
          </LinkButton>
        )}
      </div>
    </AppLayout>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return (
    <AppLayout>
      <div className="flex flex-col max-w-4xl gap-4 w-full mx-auto sticky top-0 bg-gray-800 z-20 border-b-[1px] border-gray-700">
        <Header home />
      </div>
      <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto z-10">
        <div>An unexpected error occurred: {error.message}</div>;
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
