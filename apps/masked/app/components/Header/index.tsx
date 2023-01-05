import { Link } from "@remix-run/react";
import { AiOutlineHome } from "react-icons/ai";
import { config } from "~/lib/config";
import { Room } from "~/types/Room";
import { SerializeDate } from "~/types/SerializeDate";
import { LinkButton } from "../FormElements/LinkButton";

interface Props {
  room?: SerializeDate<Room>;
  share?: boolean;
  home?: boolean;
}

export default function Header({ room, share = true, home = false }: Props) {
  return room ? (
    <header className="border-b-[1px] border-gray-700 p-8 pb-2">
      <>
        <div className="w-full relative flex items-center justify-around">
          {home && (
            <LinkButton
              color="secondary"
              to={`/`}
              className="flex items-center justify-center w-[fit-content] rounded-full absolute left-0 text-lg"
            >
              <AiOutlineHome />
            </LinkButton>
          )}
          <h1 className="w-full font-black m-0 p-0 text-5xl text-center font-heading">
            {room.name || config.appName}
          </h1>
          {/* {share && room && (
            <RoomCodeShare
              className="absolute right-0"
              room={room}
              withInput={false}
            />
          )} */}
        </div>

        {share && room && (
          <p className="w-full text-center text-gray-600">
            Room Code: {room.id}
          </p>
        )}
      </>
    </header>
  ) : (
    <header className="border-b-[1px] border-gray-700 p-8 pb-2">
      <Link to="/" className="cursor-pointer">
        <h1 className="w-full mb-4 font-black text-5xl text-center font-heading">
          {config.appName}
        </h1>
      </Link>
    </header>
  );
}
