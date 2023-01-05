import { Room, roomSchema } from "~/types/Room";
import { getXataClient } from "~/xata";

const xata = getXataClient();

export const getRoom = async (roomId: string) => {
  return await xata.db.rooms.read(roomId);
};

export const getRooms = async () => {
  return await xata.db.rooms.sort("created_at", "desc").getPaginated({
    pagination: {
      size: 15,
    },
  });
};

export type RoomType = Room["type"];

export const createRoom = async (
  name: string,
  type: RoomType,
  secret?: string
) => {
  const room: Room = {
    name,
    type,
    created_at: new Date(),
  };

  if (secret) {
    room.secret = secret;
  }

  roomSchema.parse(room);

  return await xata.db.rooms.create(room);
};
