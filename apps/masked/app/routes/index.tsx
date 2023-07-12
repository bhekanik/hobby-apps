import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { Form, useActionData, useCatch, useNavigate } from "@remix-run/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ZodError } from "zod";
import { Button } from "~/components/FormElements/Button";
import { Input } from "~/components/FormElements/Input";
import { LinkButton } from "~/components/FormElements/LinkButton";
import Header from "~/components/Header";
import { AppLayout } from "~/layouts/AppLayout";
import { badRequest } from "~/lib/badRequest";
import { config, ThemeColor } from "~/lib/config";
import { getMainAppImageUrl } from "~/lib/getMainAppImageUrl";
import { createRoom, RoomType } from "~/models/rooms.server.";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const { name, _action, type, secret } = Object.fromEntries(formData);

  try {
    if (_action === "create") {
      const result = await createRoom((name as string) ?? "", type as RoomType);
      return json(result);
    }
    if (_action === "create_ama") {
      const result = await createRoom(
        (name as string) ?? "",
        type as RoomType,
        secret as string,
      );
      return json(result);
    }
    if (_action === "create_poll") {
      const result = await createRoom(
        (name as string) ?? "",
        "poll",
        secret as string,
      );
      return json(result);
    }
  } catch (error) {
    console.log("error:", error);
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

export const loader: LoaderFunction = async ({ params, ...rest }) => {
  const url = getMainAppImageUrl(params.theme as ThemeColor);

  return json({ url });
};

export default function Index() {
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const room = useActionData();

  const [roomCode, setRoomCode] = useState("");

  const [roomType, setRoomType] = useState<RoomType>("default");

  const handleRoomTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setRoomType(value as RoomType);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (room?.id) {
      navigate(`/${config.roomsPath}/${room.id}`);
    }
  }, [room]);

  return (
    <AppLayout>
      <Header />
      <Form
        ref={formRef}
        method="post"
        className="flex gap-4 flex-col mb-4 px-8"
      >
        <p className="mb-4">{config.appDescription}</p>
        <span className="text-bold">Already have a room code?</span>
        <div className="flex gap-2">
          <Input
            value={roomCode}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setRoomCode(e.target.value)}
            placeholder="Enter Room Code"
          />

          <LinkButton
            to={`/${config.roomsPath}/${roomCode}/posts`}
            aria-label="copy"
            className="text-lg"
          >
            Join Room
          </LinkButton>
        </div>
        <p>Or create a new room. You have two options here.</p>
        <p>
          A default room allows anyone with the room link to make posts and
          everyone with the room link can see all posts made.
        </p>
        <p>
          For an AMA room only the creator of the room (or anyone with the room
          secret) can see all posts and can make comments on them. Everyone else
          can only make posts and view their own posts and comments made on
          them.
        </p>
        <div className="w-full flex flex-row gap-2 justify-center items-center">
          <Input name="name" ref={nameRef} placeholder="Room Name (Optional)" />

          <div className="flex flex-row gap-2 justify-center items-center">
            <label className="flex flex-row gap-2 justify-center items-center">
              <input
                type="radio"
                name="type"
                value="default"
                defaultChecked
                onChange={handleRoomTypeChange}
                className="accent-gray-800"
              />
              Default
            </label>
            <label className="flex flex-row gap-2 justify-center items-center">
              <input
                type="radio"
                name="type"
                value="ama"
                onChange={handleRoomTypeChange}
                className="accent-gray-800"
              />
              AMA
            </label>
          </div>
        </div>
        {roomType === "ama" && (
          <div>
            <span>AMA rooms need a secret.</span>
            <Input
              name="secret"
              placeholder="Create a Room Secret"
              required={roomType === "ama"}
            />
          </div>
        )}
        <Button
          type="submit"
          name="_action"
          value={roomType === "ama" ? "create_ama" : "create"}
        >
          {roomType === "ama" ? "Create New AMA Room" : "Create New Room"}
        </Button>
        <p>Or create a poll</p>
        <Button type="submit" name="_action" value="create_poll">
          Create Poll
        </Button>
      </Form>
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
