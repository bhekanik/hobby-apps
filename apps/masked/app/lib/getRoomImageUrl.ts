import { SelectedPick } from "@xata.io/client";
import { v2 as cloudinary } from "cloudinary";
import { formatDistance } from "date-fns";
import { RoomsRecord } from "~/xata";
import { config, ThemeColor } from "./config";

export const getRoomImageUrl = (
  room: Readonly<SelectedPick<RoomsRecord, ["*"]> | null>,
  theme?: ThemeColor,
  poll?: any
) => {
  if (!room) return "";

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const transformation = [
    {
      fetch_format: "auto",
      quality: "auto",
    },
    {
      overlay: {
        url: config.colors[theme ?? config.theme].overlayIcon,
      },
    },
    {
      flags: "layer_apply",
      width: 30,
      height: 30,
      gravity: "north_east",
      x: 40,
      y: 60,
    },
    {
      color: config.colors[theme ?? config.theme].dimForegroundColor,
      overlay: {
        font_family: "Open Sans",
        font_size: 30,
        text_align: "right",
        text: `Created ${formatDistance(
          new Date(room.created_at as unknown as string),
          new Date()
        )} ago`,
      },
    },
    { flags: "layer_apply", gravity: "south_east", x: 40, y: 43 },
    {
      color: config.colors[theme ?? config.theme].appNameColor,
      width: 1135,
      height: 150,
      crop: "fit",
      overlay: {
        font_family: "Waiting for the Sunrise",
        font_size: 80,
        font_weight: "bold",
        text_align: "left",
        text: config.appName,
      },
    },
    { flags: "layer_apply", gravity: "north_west", x: 40, y: 40 },
    {
      color: config.colors[theme ?? config.theme].foregroundColor,
      width: 1135,
      height: 390,
      crop: "fit",
      overlay: {
        font_family: "Open Sans",
        font_size: 30,
        text_align: "left",
        text: room.type === "poll" ? "Anonymous Poll" : config.appDescription,
      },
    },
    { flags: "layer_apply", gravity: "north_west", x: 40, y: 140 },
    {
      color: config.colors[theme ?? config.theme].foregroundColor,
      width: 950,
      height: 50,
      crop: "fit",
      overlay: {
        font_family: "Open Sans",
        font_size: 40,
        text_align: "left",
        text: room.type === "poll" ? "Poll: " : "Room Name: ",
      },
    },
    { flags: "layer_apply", gravity: "north_west", x: 40, y: 215 },
    {
      color: config.colors[theme ?? config.theme].foregroundColor,
      width: room.type === "poll" ? 1000 : 850,
      height: 350,
      crop: "fit",
      overlay: {
        font_family: "Open Sans",
        font_size: 60,
        font_weight: "bold",
        text_align: "left",
        text:
          room.type === "poll"
            ? poll?.question ?? ""
            : `${room?.name || "Unnamed Room"}`,
      },
    },
    {
      flags: "layer_apply",
      gravity: "north_west",
      x: room.type === "poll" ? 130 : 300,
      y: 200,
    },
  ];

  try {
    const cloudinaryUrl = cloudinary.url(
      config.colors[theme ?? config.theme].baseImage,
      {
        width: 1200,
        height: 630,
        transformation,
      }
    );

    return cloudinaryUrl;
  } catch (error) {
    console.log("error:", error);
    return "";
  }
};
