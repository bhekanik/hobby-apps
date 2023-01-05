import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import { useCatch, useLoaderData, useSubmit } from "@remix-run/react";
import { useEffect } from "react";
import invariant from "tiny-invariant";
import { ZodError } from "zod";
import ConfessionCard from "~/components/ConfessionCard";
import { ConfessionForm } from "~/components/ConfessionForm";
import Header from "~/components/Header";
import { RoomCodeShare } from "~/components/RoomCodeShare";
import { AppLayout } from "~/layouts/AppLayout";
import { badRequest } from "~/lib/badRequest";
import { config, ThemeColor } from "~/lib/config";
import { getRoomImageUrl } from "~/lib/getRoomImageUrl";
import { createComment, getAllComments } from "~/models/comments.server.";
import {
  createConfession,
  getConfessions,
  likeConfession,
} from "~/models/confessions.server.";
import { getRoom } from "~/models/rooms.server.";
import { CommentWithPost } from "~/types/Comment";
import { Confession } from "~/types/Confession";
import { Room } from "~/types/Room";

interface LoaderData {
  room: Room;
  confessions: Confession[];
  comments: CommentWithPost[];
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
    // "og:url": data.url,
    // "twitter:url": data.url,
  };
};

export const loader: LoaderFunction = async ({ params }) => {
  try {
    invariant(params.roomId);

    const confessionsPage = await getConfessions(params.roomId);
    const comments = await getAllComments();
    const room = await getRoom(params.roomId);

    const url = getRoomImageUrl(room, params.theme as ThemeColor);

    if (room?.type === "ama") {
      redirect(`/${config.roomsPath}/${room.id}/ama/posts`);
    }

    if (room?.type === "poll") {
      redirect(`/${config.roomsPath}/${room.id}/poll`);
    }

    return json({
      room,
      confessions: confessionsPage.records,
      url,
      comments,
    });
  } catch (error) {
    return badRequest({
      formError: (error as ZodError).message ?? `Required values are missing.`,
    });
  }
};

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const { title, content, _action, id, likes, roomId, comment, poster } =
      Object.fromEntries(formData);

    if (_action === "comment") {
      const result = await createComment(
        comment as string,
        poster as string,
        id as string
      );
      return json(result);
    }

    if (_action === "create") {
      const result = await createConfession({
        title,
        content,
        room: roomId,
      });
      return json(result);
    }

    if ((_action === "like" || _action === "dislike") && likes && id) {
      await likeConfession(id as string, +likes, _action);
      return null;
    }
    return null;
  } catch (error) {
    return badRequest({
      formError: (error as ZodError).message ?? `Required values are missing.`,
    });
  }
};

export default function Index() {
  const { room, comments, confessions } = useLoaderData<LoaderData>();

  const submit = useSubmit();

  useEffect(() => {
    const interval = setInterval(() => {
      submit(null, { method: "get" });
    }, 6000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <AppLayout>
      <div className="flex flex-col max-w-4xl gap-4 w-full mx-auto sticky top-0 bg-gray-800 z-20 border-b-[1px] border-gray-700">
        <Header room={room} home />
        <div className="flex flex-col gap-4 px-8 items-center justify-center w-full">
          <RoomCodeShare className="w-full" room={room} />
        </div>
        <ConfessionForm room={room} />
      </div>
      <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto z-10">
        {confessions.length === 0 && (
          <div className="flex flex-col gap-4 p-8 pb-0 items-center justify-center w-full h-full">
            <p>No posts yet. Share the room link to get the ball rolling.</p>
          </div>
        )}

        <ul className="flex flex-col gap-1 overflow-auto">
          {confessions?.map((confession) => (
            <ConfessionCard
              key={confession.id}
              confession={confession}
              room={room}
              comments={comments.filter((c) => c.post.id === confession.id)}
            />
          ))}
        </ul>
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
