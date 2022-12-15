interface Theme {
  backgroundColor: string;
  foregroundColor: string;
  appNameColor: string;
  dimForegroundColor: string;
  overlayIcon: string;
  baseImage: string;
}

export type ThemeColor = "light" | "dark";

interface Config {
  appName: string;
  appDescription: string;
  theme: ThemeColor;
  postsPath: string;
  roomsPath: string;
  colors: {
    dark: Theme;
    light: Theme;
  };
}

export const config: Config = {
  appName: "Matcher",
  appDescription: "Tinder Clone with Rooms.",
  theme: "light",
  postsPath: "m",
  roomsPath: "r",
  colors: {
    dark: {
      backgroundColor: "#1f2937",
      foregroundColor: "#d1d5db",
      dimForegroundColor: "#9CA3AF",
      appNameColor: "#d1d5db",
      overlayIcon:
        "https://res.cloudinary.com/dhuzf0isy/image/upload/v1669840444/like_n8yrdz.png",
      baseImage: "base-bicolor_y1xjw2",
    },
    light: {
      foregroundColor: "black",
      backgroundColor: "white",
      dimForegroundColor: "#5D6997",
      appNameColor: "#3081E1",
      overlayIcon:
        "https://res.cloudinary.com/dhuzf0isy/image/upload/v1669861295/likes-dark_up5zfn.png",
      baseImage: "base-very-light-rounded-color_iq8csz",
    },
  },
};
