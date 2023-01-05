import { useFetcher } from "@remix-run/react";
import { formatDistance } from "date-fns";
import { useEffect, useState } from "react";
import {
  AiOutlineComment,
  AiOutlineDislike,
  AiOutlineLike,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { Button } from "~/components/FormElements/Button";
import { config } from "~/lib/config";
import { CommentWithPost } from "~/types/Comment";
import { Confession } from "~/types/Confession";
import { Room } from "~/types/Room";
import { SerializeDate } from "~/types/SerializeDate";
import { WebShareLink } from "~/utils/client/pwa-utils.client";

interface Props {
  confession: Omit<SerializeDate<Confession>, "room"> & {
    room: SerializeDate<Room> | string;
  };
  room: SerializeDate<Room>;
  comments: SerializeDate<
    Omit<CommentWithPost, "post"> & { post: SerializeDate<Confession> }
  >[];
  onOpenComment: (open: boolean) => void;
  share?: boolean;
}

export default function CardFooter({
  confession,
  room,
  comments,
  onOpenComment,
  share,
}: Props) {
  const fetcher = useFetcher();

  const getOptimisticLikes = () => {
    const likes = fetcher.submission?.formData.get("likes")
      ? +fetcher.submission?.formData.get("likes")!
      : 0;
    const action = fetcher.submission?.formData.get("_action");

    if (likes && action === "like") {
      return likes + 1;
    } else if (likes && action === "dislike") {
      return likes - 1;
    }
    return null;
  };

  const [confessionLInk, setConfessionLink] = useState("");

  useEffect(() => {
    if (confession && typeof window !== "undefined") {
      const origin = window.location.origin;

      setConfessionLink(
        `${origin}/${config.postsPath}${share ? `/share` : ""}/${confession.id}`
      );
    }
  }, [confession]);

  const handleShare = async () => {
    WebShareLink(confessionLInk, confession.title, confession.content);
    await navigator.share({ url: confessionLInk });
  };

  return (
    <div className="flex gap-4 border-t-[1px] border-b-[1px] border-gray-700 py-2 px-8 w-full items-center justify-end">
      <div className="w-full text-gray-400 text-md text-left">
        {`${formatDistance(
          new Date(confession?.created_at ?? new Date().toISOString()),
          new Date()
        )}`}
      </div>

      {room?.type === "ama" && (
        <Button
          color="secondary"
          onClick={() => onOpenComment(true)}
          textColor="text-gray-400"
          className="border-none hover:bg-slate-600 bg-none text-lg p-2 rounded-full flex flex-row items-center justify-center gap-2"
        >
          <AiOutlineComment />
          <span className="">{comments?.length}</span>
        </Button>
      )}

      <fetcher.Form
        method="post"
        className="flex flex-row items-center justify-between"
      >
        {/* <span className="text-lg p-2 text-center whitespace-nowrap">
              {confession?.views} views
            </span> */}

        <input type="hidden" name="id" value={confession?.id} />
        <input type="hidden" name="likes" value={confession?.likes} />
        <fieldset className="flex flex-row items-center justify-between">
          <Button
            type="submit"
            name="_action"
            value="dislike"
            color="secondary"
            textColor="text-gray-400"
            className="border-none hover:bg-slate-600 bg-none text-lg p-2 rounded-full"
          >
            <AiOutlineDislike />
          </Button>
          <span className="text-lg p-2 w-10 text-center text-gray-400">
            {getOptimisticLikes() ?? confession.likes}
          </span>
          <Button
            type="submit"
            name="_action"
            value="like"
            color="secondary"
            textColor="text-gray-400"
            className="border-none hover:bg-slate-600 bg-none text-lg p-2 rounded-full"
          >
            <AiOutlineLike />
          </Button>
        </fieldset>
      </fetcher.Form>
      <Button
        onClick={handleShare}
        color="secondary"
        textColor="text-gray-400"
        className="border-none flex items-center justify-center text-lg"
      >
        <AiOutlineShareAlt />
      </Button>
    </div>
  );
}
