import { useFetcher, useNavigate } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "~/hooks/useClickOutside";
import { config } from "~/lib/config";
import { Room } from "~/types/Room";
import { SerializeDate } from "~/types/SerializeDate";
import { Button } from "../FormElements/Button";
import { Input } from "../FormElements/Input";
import { Textarea } from "../FormElements/Textarea";

interface Props {
  room: SerializeDate<Room>;
}

export const ConfessionForm = ({ room }: Props) => {
  const fetcher = useFetcher();

  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!fetcher.data?.formError && fetcher.data?.id) {
      formRef.current?.reset();
      titleRef.current?.focus();
    }
  }, [fetcher]);

  const isAdding =
    fetcher.state === "submitting" &&
    fetcher.submission.formData.get("_action") === "create";

  const handleFocus = () => {
    setRows(6);
  };

  const [rows, setRows] = useState(2);

  const [fieldSetRef] = useClickOutside<HTMLFieldSetElement>(() => setRows(2));

  const navigate = useNavigate();

  useEffect(() => {
    if (room.type === "ama" && fetcher.data?.id) {
      navigate(`/${config.postsPath}/share/${fetcher.data.id}`);
    }
  }, [room, fetcher.data]);

  return (
    <fetcher.Form
      ref={formRef}
      method="post"
      className="flex gap-2 flex-col mb-4 px-8"
    >
      <fieldset
        ref={fieldSetRef}
        className="flex gap-2 flex-col"
        disabled={isAdding}
      >
        <Input type="hidden" name="roomId" value={room.id} />
        <Input ref={titleRef} name="title" required placeholder="Post Title" />
        <Textarea
          rows={rows}
          onFocus={handleFocus}
          name="content"
          required
          className="w-full p-2 bg-gray-700"
          placeholder="Type your post here."
        />
        <Button type="submit" name="_action" value="create" disabled={isAdding}>
          {isAdding ? "Submitting..." : "Submit"}
        </Button>
      </fieldset>
    </fetcher.Form>
  );
};
