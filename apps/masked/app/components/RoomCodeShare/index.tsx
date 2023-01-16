import classNames from "classnames";
import { forwardRef, HTMLAttributes, useEffect, useState } from "react";
import { AiOutlineCopy, AiOutlineShareAlt } from "react-icons/ai";
import { Button } from "~/components/FormElements/Button";
import { Input } from "~/components/FormElements/Input";
import { config } from "~/lib/config";
import { Room } from "~/types/Room";
import { SerializeDate } from "~/types/SerializeDate";
import { WebShareLink } from "~/utils/client/pwa-utils.client";

interface Props {
  room?: SerializeDate<Room>;
  withInput?: boolean;
  share?: boolean;
  poll?: boolean;
}

export const RoomCodeShare = forwardRef<
  HTMLDivElement,
  Props & HTMLAttributes<HTMLDivElement>
>(({ room, withInput = true, share, poll, className, ...props }, ref) => {
  const [copiedText, setCopiedText] = useState("");
  const [roomLink, setRoomLink] = useState("");

  useEffect(() => {
    if (room && typeof window !== "undefined") {
      const origin = window.location.origin;

      setRoomLink(
        `${origin}/${config.roomsPath}${share ? `/share` : ""}/${room.id}${
          poll ? `/poll` : "/posts"
        }`
      );
    }
  }, [room]);

  const handleCopy = () => {
    navigator.clipboard.writeText(roomLink);
    setCopiedText("Copied to Clipboard!");
    setTimeout(() => {
      setCopiedText("");
    }, 2000);
  };

  const handleShare = async () => {
    WebShareLink(
      roomLink,
      "Room Link",
      "Come join our room in the Masked app."
    );
    await navigator.share({ url: roomLink });
  };

  return (
    <div
      className={classNames(
        "flex gap-2",
        !className?.includes("absolute") && "relative",
        className
      )}
      ref={ref}
      {...props}
    >
      {withInput && <Input value={roomLink} disabled />}

      <Button
        onClick={handleCopy}
        aria-label="copy"
        color="secondary"
        className="flex items-center justify-center text-lg"
      >
        <AiOutlineCopy />
      </Button>

      <Button
        onClick={handleShare}
        color="secondary"
        className="flex items-center justify-center text-lg"
      >
        <AiOutlineShareAlt />
      </Button>
      {copiedText && (
        <span className="absolute left-[30%] top-2 bg-slate-800 border-2 text-white rounded p-1">
          {copiedText}
        </span>
      )}
    </div>
  );
});
