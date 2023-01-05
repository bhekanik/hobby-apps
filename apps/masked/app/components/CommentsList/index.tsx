import { formatDistance } from "date-fns";
import ClampLines from "react-clamp-lines";
import { CommentWithPost } from "~/types/Comment";
import { Confession } from "~/types/Confession";
import { SerializeDate } from "~/types/SerializeDate";

interface Props {
  comments: SerializeDate<
    Omit<CommentWithPost, "post"> & { post: SerializeDate<Confession> }
  >[];
}

export default function CommentsList({ comments }: Props) {
  return (
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
                {`${formatDistance(new Date(comment.created_at), new Date())}`}
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
  );
}
