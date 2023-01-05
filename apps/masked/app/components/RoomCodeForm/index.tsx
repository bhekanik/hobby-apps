import { Form } from "@remix-run/react";
import { ChangeEvent, useState } from "react";
import { Button } from "~/components/FormElements/Button";
import { LinkButton } from "~/components/FormElements/LinkButton";
import { config } from "~/lib/config";
import { Room } from "~/types/Room";
import { Input } from "../FormElements/Input";
import { RoomCodeShare } from "../RoomCodeShare";

interface Props {
  room: Room;
}

export default function RoomCodeForm({ room }: Props) {
  const [secret, setSecret] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setSecret(value);
  };
  return (
    <div className="w-full flex flex-col gap-2 px-8">
      <p className="w-full text-center mb-2">Your Room Code is: {room.id}</p>
      <RoomCodeShare room={room} />
      {room.type === "ama" && (
        <div className="py-4">
          <p>Your share Link</p>
          <RoomCodeShare room={room} share />
        </div>
      )}

      {room.type === "ama" && secret !== room.secret ? (
        <Input
          name="secret"
          placeholder="Room Secret"
          onChange={handleChange}
          required={room.type === "ama"}
        />
      ) : (
        <LinkButton to={`/${config.roomsPath}/${room.id}`} color="accent">
          Enter Room{room.name && `: ${room.name}`}
        </LinkButton>
      )}

      <Form method="post" className="flex gap-2 flex-col mb-4">
        <Button type="submit" name="_action" value="create">
          Generate Another
        </Button>
      </Form>
    </div>
  );
}
