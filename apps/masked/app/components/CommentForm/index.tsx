import { useFetcher } from "@remix-run/react";
import { FormEvent, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "~/components/FormElements/Button";
import { ConfessionWithRoom } from "~/types/Confession";
import { Room } from "~/types/Room";
import { SerializeDate } from "~/types/SerializeDate";

interface Props {
  confession: Omit<SerializeDate<ConfessionWithRoom>, "room"> & {
    room: SerializeDate<Room> | string;
  };
  onOpenComment: (open: boolean) => void;
  share?: boolean;
}

export const CommentForm = ({ confession, onOpenComment, share }: Props) => {
  const commentRef = useRef<HTMLDivElement>(null);
  const fetcher = useFetcher();

  useEffect(() => {
    if (commentRef.current) {
      commentRef.current.contentEditable = "true";
      commentRef.current.focus();
    }
  }, []);

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
        <input
          type="hidden"
          name="poster"
          value={share ? "Anonymous" : "Room Owner"}
        />

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
  );
};
