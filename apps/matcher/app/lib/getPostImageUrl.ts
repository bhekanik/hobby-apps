import { SelectedPick } from "@xata.io/client";
import { v2 as cloudinary } from "cloudinary";
import { format } from "date-fns";
import { PostsRecord } from "~/xata";
import { config, ThemeColor } from "./config";

export const getPostImageUrl = (
  confession: Readonly<SelectedPick<PostsRecord, ["*"]> | null>,
  theme?: ThemeColor
) => {
  if (!confession) return "";

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
      gravity: "south_west",
      x: 40,
      y: 40,
    },
    {
      color: config.colors[theme ?? config.theme].dimForegroundColor,
      overlay: {
        font_family: "Open Sans",
        font_size: 30,
        text_align: "left",
        text: confession.likes.toString(),
      },
    },
    { flags: "layer_apply", gravity: "south_west", x: 85, y: 43 },
    {
      color: config.colors[theme ?? config.theme].dimForegroundColor,
      overlay: {
        font_family: "Open Sans",
        font_size: 30,
        text_align: "right",
        text: `${format(
          new Date(confession.created_at as unknown as string),
          "p - PP"
        )}`,
      },
    },
    { flags: "layer_apply", gravity: "south_east", x: 40, y: 40 },
    {
      color: config.colors[theme ?? config.theme].appNameColor,
      overlay: {
        font_family: "Waiting for the Sunrise",
        font_size: 30,
        font_weight: "bold",
        text_align: "left",
        text: config.appName,
      },
    },
    { flags: "layer_apply", gravity: "north_east", x: 40, y: 40 },
    {
      color: config.colors[theme ?? config.theme].foregroundColor,
      width: 950,
      height: 100,
      crop: "fit",
      overlay: {
        font_family: "Open Sans",
        font_size: 80,
        font_weight: "bold",
        text_align: "left",
        text: confession.title,
      },
    },
    { flags: "layer_apply", gravity: "north_west", x: 40, y: 35 },
    {
      color: config.colors[theme ?? config.theme].dimForegroundColor,
      overlay: {
        font_family: "Open Sans",
        font_size: 30,
        text_align: "left",
        text: `Room Code: ${confession.room?.id}`,
      },
    },
    { flags: "layer_apply", gravity: "south_west", x: 160, y: 40 },
    {
      color: config.colors[theme ?? config.theme].foregroundColor,
      width: 1135,
      height: 410,
      crop: "fit",
      overlay: {
        font_family: "Open Sans",
        font_size: 45,
        text_align: "left",
        text: confession.content,
      },
    },
    { flags: "layer_apply", gravity: "north_west", x: 40, y: 140 },
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
