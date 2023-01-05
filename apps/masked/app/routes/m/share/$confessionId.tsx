import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { Link, useCatch, useFetcher, useLoaderData } from "@remix-run/react";
import { formatDistance } from "date-fns";
import { FormEvent, useEffect, useRef, useState } from "react";
import ClampLines from "react-clamp-lines";
import { AiOutlineArrowLeft, AiOutlineClose } from "react-icons/ai";
import invariant from "tiny-invariant";
import { ZodError } from "zod";
import ConfessionPageFooter from "~/components/ConfessionPageFooter";
import { Button } from "~/components/FormElements/Button";
import { LinkButton } from "~/components/FormElements/LinkButton";
import Header from "~/components/Header";
import { useClickOutside } from "~/hooks/useClickOutside";
import { AppLayout } from "~/layouts/AppLayout";
import { badRequest } from "~/lib/badRequest";
import { config, ThemeColor } from "~/lib/config";
import { getConfessionImageUrl } from "~/lib/getConfessionImageUrl";
import { createComment, getComments } from "~/models/comments.server.";
import { getConfession, likeConfession } from "~/models/confessions.server.";
import { getRoom } from "~/models/rooms.server.";
import { CommentWithPost } from "~/types/Comment";
import { ConfessionWithRoom } from "~/types/Confession";
import { Room } from "~/types/Room";

interface LoaderData {
  room: Room;
  confession: ConfessionWithRoom;
  comments: CommentWithPost[];
  url: string;
}

export const meta: MetaFunction = ({ data }) => {
  return {
    title: data.confession.title,
    "twitter:title": data.confession.title,
    "og:title": data.confession.title,
    description: data.confession.content,
    "twitter:description": data.confession.content,
    "og:description": data.confession.content,
    "og:image": data.url,
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:image:secure_url": data.url,
    "twitter:image": data.url,
  };
};

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.confessionId);

  const confession = await getConfession(params.confessionId);
  const comments = await getComments(params.confessionId);
  const room = await getRoom(confession?.room?.id ?? "");

  const url = getConfessionImageUrl(confession!, params.theme as ThemeColor);

  // if (page.hasNextPage()) {
  //   const secondPage = await page.nextPage()
  // }

  return json({ room, confession, url, comments });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const { _action, id, likes, comment, poster } = Object.fromEntries(formData);

  try {
    if (_action === "comment") {
      const result = await createComment(
        comment as string,
        poster as string,
        id as string
      );
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
  const { confession, room, comments } = useLoaderData<LoaderData>();

  const [isCommenting, setIsCommenting] = useState(false);

  const [commentContainerRef] = useClickOutside<HTMLDivElement>(() =>
    setIsCommenting(false)
  );

  const onOpenComment = (open: boolean) => {
    setIsCommenting(open);
  };

  const commentRef = useRef<HTMLDivElement>(null);
  const fetcher = useFetcher();

  useEffect(() => {
    const interval = setInterval(() => {
      fetcher.submit(null, { method: "get" });
    }, 6000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (isCommenting && commentRef.current) {
      commentRef.current.contentEditable = "true";
      commentRef.current.focus();
    }
  }, [isCommenting]);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!fetcher.data?.formError && fetcher.data?.id) {
      formRef.current?.reset();
      onOpenComment(false);
    }
  }, [fetcher]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const content = commentRef.current?.innerText;
    formData.set("comment", content as string);
    formData.set("id", confession.id as string);
    formData.set("_action", "comment");
    fetcher.submit(formData, { method: "post" });
  };

  return (
    <AppLayout>
      <div className="flex flex-col max-w-4xl w-full mx-auto sticky top-0 bg-gray-800 z-20 border-b-[1px] border-gray-700">
        <Header room={room} share={false} />

        <div className="flex items-center justify-center">
          <LinkButton
            color="secondary"
            to={`/${config.roomsPath}/share/${confession.room.id}`}
            className="w-[fit-content] absolute left-4 border-none bg-none hover:bg-none"
          >
            <AiOutlineArrowLeft />
          </LinkButton>

          <Link to={`/${config.postsPath}/${confession?.id}`}>
            <h3 className="font-bold pb-2 pt-4 text-2xl flex-1 whitespace-nowrap text-ellipsis">
              {confession?.title}
            </h3>
          </Link>
        </div>
        <div className="mb-4 text-lg px-8">{confession?.content}</div>
        <ConfessionPageFooter
          confession={confession}
          room={room}
          comments={comments}
          onOpenComment={onOpenComment}
        />
        {isCommenting && (
          <div
            ref={commentContainerRef}
            className="ml-8 px-4 pt-0 pl-0 pb-2 border-l-[1px] border-gray-700"
          >
            <fetcher.Form
              method="post"
              ref={formRef}
              className="flex flex-col px-8 pb-2"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-row justify-between items-center py-2 border-t-[1px] border-gray-700">
                <div className="flex items-center justify-center gap-2 text-gray-500">
                  <Button
                    color="secondary"
                    onClick={() => onOpenComment(false)}
                    className="hover:bg-slate-600 border-none bg-none text-lg p-2 rounded-full"
                  >
                    <AiOutlineClose />
                  </Button>
                  <span className="text-gray-400">Type your comment below</span>
                </div>

                <input type="hidden" name="id" value={confession.id} />
                <input type="hidden" name="poster" value={"Anonymous"} />

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
            </fetcher.Form>
          </div>
        )}
      </div>

      <div className="flex flex-col pb-0 hover:drop-shadow-md h-full">
        <div className="border-gray-700">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="ml-8 pl-8 border-b-[1px] border-l-[1px] border-gray-700"
            >
              <div className="flex flex-col">
                <div className="flex flex-row gap-2 justify-between items-center py-2 pt-4">
                  <h3 className="font-bold text-sm flex-1 whitespace-nowrap text-ellipsis">
                    {comment.poster ?? "Room Owner"}
                  </h3>
                  <span>&middot;</span>
                  <div className="w-full text-gray-400 text-sm text-left">
                    {`${formatDistance(
                      new Date(comment.created_at),
                      new Date()
                    )}`}
                  </div>
                </div>

                <ClampLines
                  text={comment.content}
                  id="really-unique-id"
                  lines={2}
                  ellipsis="..."
                  moreText="(click for more)"
                  lessText="(click for less)"
                  innerElement="p"
                  className="mb-6"
                />
              </div>
            </div>
          ))}
        </div>
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
