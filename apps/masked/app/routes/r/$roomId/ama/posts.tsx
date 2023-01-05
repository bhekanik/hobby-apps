import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import {
  Form,
  Link,
  useActionData,
  useCatch,
  useLoaderData,
  useSubmit,
} from "@remix-run/react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import ClampLines from "react-clamp-lines";
import { AiOutlineClose } from "react-icons/ai";
import invariant from "tiny-invariant";
import { ZodError } from "zod";
import CardFooter from "~/components/CardFooter";
import { Button } from "~/components/FormElements/Button";
import { Input } from "~/components/FormElements/Input";
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
  invariant(params.roomId);

  const confessionsPage = await getConfessions(params.roomId);
  const comments = await getAllComments();
  const room = await getRoom(params.roomId);

  const url = getRoomImageUrl(room, params.theme as ThemeColor);

  // if (page.hasNextPage()) {
  //   const secondPage = await page.nextPage()
  // }

  if (room?.type === "default") {
    redirect(`/${config.roomsPath}/${room.id}/posts`);
  }

  return json({
    room,
    confessions: confessionsPage.records,
    url,
    comments,
  });
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

  const [secret, setSecret] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setSecret(value);
  };

  const [isCommenting, setIsCommenting] = useState(false);

  const [currentPost, setCurrentPost] = useState<string | null>(null);

  const onOpenComment = (open: boolean, id: string) => {
    setIsCommenting(open);
    if (!open) {
      setCurrentPost(null);
    } else setCurrentPost(id);
  };

  const commentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isCommenting && commentRef.current) {
      commentRef.current.contentEditable = "true";
      commentRef.current.focus();
    }
  }, [isCommenting]);

  const actionData = useActionData();

  useEffect(() => {
    if (!actionData?.formError && actionData?.id && currentPost) {
      onOpenComment(false, currentPost);
      setCurrentPost(null);
    }
  }, [actionData]);

  const submit = useSubmit();

  useEffect(() => {
    const interval = setInterval(() => {
      submit(null, { method: "get" });
    }, 6000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const content = commentRef.current?.innerText;
    formData.set("comment", content as string);
    formData.set("id", id as string);
    formData.set("_action", "comment");
    submit(formData, { method: "post" });
  };

  return (
    <AppLayout>
      <div className="flex flex-col max-w-4xl gap-4 w-full mx-auto sticky top-0 bg-gray-800 z-20 border-b-[1px] border-gray-700">
        <Header room={room} home />
        <div className="flex flex-col gap-4 px-8 items-center justify-center w-full">
          <RoomCodeShare share className="w-full" room={room} />
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto z-10">
        {room.type === "ama" && secret !== room.secret ? (
          <div className="p-8">
            <Input
              placeholder="Room Secret"
              onChange={handleChange}
              required={room.type === "ama"}
            />
          </div>
        ) : (
          <ul className="flex flex-col gap-1 overflow-auto">
            {confessions.length === 0 && (
              <div className="flex flex-col gap-4 p-8 pb-0 items-center justify-center w-full h-full">
                <p>No posts yet. Share the link to get the ball rolling.</p>
              </div>
            )}

            {confessions?.map((confession) => (
              <li
                key={confession.id}
                className="flex flex-col gap-2 hover:drop-shadow-md border-b-[1px] border-gray-700"
              >
                <div className="flex items-center justify-between px-8 pt-4">
                  <Link to={`/${config.postsPath}/ama/${confession.id}`}>
                    <h3 className="font-bold text-lg flex-1 whitespace-nowrap text-ellipsis">
                      {confession.title}
                    </h3>
                  </Link>
                </div>

                <Link to={`/${config.postsPath}/ama/${confession.id}`}>
                  <ClampLines
                    text={confession.content}
                    id="really-unique-id"
                    lines={2}
                    ellipsis="..."
                    moreText="(click for more)"
                    lessText="(click for less)"
                    innerElement="p"
                    className="px-8 pb-4"
                  />
                </Link>

                <CardFooter
                  comments={comments.filter((c) => c.post.id === confession.id)}
                  confession={confession}
                  room={room}
                  share={room.type === "ama"}
                  onOpenComment={(open) =>
                    onOpenComment(open, confession.id as string)
                  }
                />

                {isCommenting && currentPost === confession.id && (
                  <Form
                    method="post"
                    className="flex flex-col px-8 pb-2"
                    onSubmit={(e) => handleSubmit(e, confession.id as string)}
                  >
                    <div className="flex flex-row justify-between items-center py-2 border-t-[1px] border-gray-700">
                      <div className="flex items-center justify-center gap-2 text-gray-500">
                        <Button
                          color="secondary"
                          onClick={() => {
                            onOpenComment(false, currentPost as string);
                          }}
                          className="hover:bg-slate-600 border-none bg-none text-lg p-2 rounded-full"
                        >
                          <AiOutlineClose />
                        </Button>
                        <span className="text-gray-400">
                          Type your comment below
                        </span>
                      </div>

                      <input type="hidden" name="id" value={confession.id} />
                      <input type="hidden" name="poster" value={"Room Owner"} />

                      <Button
                        name="_action"
                        type="submit"
                        value="comment"
                        className="text-sm py-1 flex items-center justify-center"
                      >
                        Comment
                      </Button>
                    </div>

                    <div
                      ref={commentRef}
                      className="p-0 rounded-3xl px-6 py-6 bg-gray-700 outline-none border-t-[1px] border-gray-700"
                    />
                  </Form>
                )}
              </li>
            ))}
          </ul>
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
