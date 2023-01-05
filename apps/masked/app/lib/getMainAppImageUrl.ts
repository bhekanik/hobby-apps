import { v2 as cloudinary } from "cloudinary";
import { config, ThemeColor } from "./config";

export const getMainAppImageUrl = (theme?: ThemeColor) => {
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
      color: config.colors[theme ?? config.theme].appNameColor,
      overlay: {
        font_family: "Waiting for the Sunrise",
        font_size: 200,
        font_weight: "bold",
        text_align: "left",
        text: config.appName,
      },
    },
    { flags: "layer_apply", gravity: "center" },
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
