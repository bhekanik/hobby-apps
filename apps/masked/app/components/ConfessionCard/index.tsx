import { Link } from "@remix-run/react";
import { useState } from "react";
import ClampLines from "react-clamp-lines";
import { useClickOutside } from "~/hooks/useClickOutside";
import { config } from "~/lib/config";
import { CommentWithPost } from "~/types/Comment";
import { Confession } from "~/types/Confession";
import { Room } from "~/types/Room";
import { SerializeDate } from "~/types/SerializeDate";
import CardFooter from "../CardFooter";
import { CommentForm } from "../CommentForm";

interface Props {
  confession: SerializeDate<Confession>;
  room: SerializeDate<Room>;
  comments: SerializeDate<
    Omit<CommentWithPost, "post"> & { post: SerializeDate<Confession> }
  >[];
}

export default function ConfessionCard({ confession, room, comments }: Props) {
  const [isCommenting, setIsCommenting] = useState(false);

  const onOpenComment = (open: boolean) => {
    setIsCommenting(open);
  };

  const [fieldSetRef] = useClickOutside<HTMLLIElement>(() =>
    onOpenComment(false)
  );

  return (
    <li
      ref={fieldSetRef}
      key={confession.id}
      className="flex flex-col gap-2 hover:drop-shadow-md border-b-[1px] border-gray-700"
    >
      <div className="flex items-center justify-between px-8 pt-4">
        <Link to={`/${config.postsPath}/${confession.id}`}>
          <h3 className="font-bold text-lg flex-1 whitespace-nowrap text-ellipsis">
            {confession.title}
          </h3>
        </Link>
      </div>

      <Link to={`/${config.postsPath}/${confession.id}`}>
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
        comments={comments}
        confession={confession}
        room={room}
        share={room.type === "ama"}
        onOpenComment={onOpenComment}
      />

      {isCommenting && (
        <CommentForm confession={confession} onOpenComment={onOpenComment} />
      )}
    </li>
  );
}
