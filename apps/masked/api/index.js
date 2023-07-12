var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// empty-module:~/utils/client/pwa-utils.client
var require_pwa_utils = __commonJS({
  "empty-module:~/utils/client/pwa-utils.client"(exports, module2) {
    module2.exports = {};
  }
});

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  publicPath: () => publicPath,
  routes: () => routes
});
module.exports = __toCommonJS(stdin_exports);

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_react = require("@remix-run/react"), import_server = require("react-dom/server"), import_jsx_dev_runtime = require("react/jsx-dev-runtime");
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let markup = (0, import_server.renderToString)(
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react.RemixServer, { context: remixContext, url: request.url }, void 0, !1, {
      fileName: "app/entry.server.tsx",
      lineNumber: 12,
      columnNumber: 5
    }, this)
  );
  return responseHeaders.set("Content-Type", "text/html"), new Response("<!DOCTYPE html>" + markup, {
    headers: responseHeaders,
    status: responseStatusCode
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  CatchBoundary: () => CatchBoundary,
  ErrorBoundary: () => ErrorBoundary,
  default: () => App,
  links: () => links,
  meta: () => meta
});
var import_react5 = require("@remix-run/react"), import_react6 = __toESM(require("react"));

// app/components/Header/index.tsx
var import_react4 = require("@remix-run/react"), import_ai = require("react-icons/ai");

// app/lib/config.ts
var config = {
  appName: "Masked",
  appDescription: "Anonymous sharing with up-voting and down-voting.",
  theme: "light",
  postsPath: "m",
  roomsPath: "r",
  colors: {
    dark: {
      backgroundColor: "#1f2937",
      foregroundColor: "#d1d5db",
      dimForegroundColor: "#9CA3AF",
      appNameColor: "#d1d5db",
      overlayIcon: "https://res.cloudinary.com/dhuzf0isy/image/upload/v1669840444/like_n8yrdz.png",
      baseImage: "base-bicolor_y1xjw2"
    },
    light: {
      foregroundColor: "black",
      backgroundColor: "white",
      dimForegroundColor: "#5D6997",
      appNameColor: "#3081E1",
      overlayIcon: "https://res.cloudinary.com/dhuzf0isy/image/upload/v1669861295/likes-dark_up5zfn.png",
      baseImage: "base-very-light-rounded-color_iq8csz"
    }
  }
};

// app/components/FormElements/LinkButton/index.tsx
var import_react2 = require("@remix-run/react"), import_classnames = __toESM(require("classnames")), import_react3 = require("react");

// app/lib/theme/colors.ts
var colors = {
  primary: "bg-blue",
  secondary: "bg-gray",
  accent: "bg-green"
};

// app/components/FormElements/LinkButton/index.tsx
var import_jsx_dev_runtime2 = require("react/jsx-dev-runtime"), LinkButton = (0, import_react3.forwardRef)(({ children, className, color = "primary", to, ...props }, ref) => {
  let btnClasses = (0, import_classnames.default)(
    "p-2 px-4 flex text-bold border-[1px] border-gray-400 text-white items-center whitespace-nowrap justify-center rounded-full",
    `${colors[color]}-800`,
    `hover:${colors[color]}-500`,
    "hover:text-green-500",
    className
  );
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Link, { to, ...props, ref, className: btnClasses, children }, void 0, !1, {
    fileName: "app/components/FormElements/LinkButton/index.tsx",
    lineNumber: 24,
    columnNumber: 5
  }, this);
});

// app/components/Header/index.tsx
var import_jsx_dev_runtime3 = require("react/jsx-dev-runtime");
function Header({ room, share = !0, home = !1 }) {
  return room ? /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("header", { className: "border-b-[1px] border-gray-700 p-8 pb-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_jsx_dev_runtime3.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "w-full relative flex items-center justify-around", children: [
      home && /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
        LinkButton,
        {
          color: "secondary",
          to: "/",
          className: "flex items-center justify-center w-[fit-content] rounded-full absolute left-0 text-lg",
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_ai.AiOutlineHome, {}, void 0, !1, {
            fileName: "app/components/Header/index.tsx",
            lineNumber: 25,
            columnNumber: 15
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "app/components/Header/index.tsx",
          lineNumber: 20,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h1", { className: "w-full font-black m-0 p-0 text-5xl text-center font-heading", children: room.name || config.appName }, void 0, !1, {
        fileName: "app/components/Header/index.tsx",
        lineNumber: 28,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/Header/index.tsx",
      lineNumber: 18,
      columnNumber: 9
    }, this),
    share && room && /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("p", { className: "w-full text-center text-gray-600", children: [
      "Room Code: ",
      room.id
    ] }, void 0, !0, {
      fileName: "app/components/Header/index.tsx",
      lineNumber: 41,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/Header/index.tsx",
    lineNumber: 17,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/Header/index.tsx",
    lineNumber: 16,
    columnNumber: 5
  }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("header", { className: "border-b-[1px] border-gray-700 p-8 pb-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react4.Link, { to: "/", className: "cursor-pointer", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h1", { className: "w-full mb-4 font-black text-5xl text-center font-heading", children: config.appName }, void 0, !1, {
    fileName: "app/components/Header/index.tsx",
    lineNumber: 50,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/components/Header/index.tsx",
    lineNumber: 49,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/Header/index.tsx",
    lineNumber: 48,
    columnNumber: 5
  }, this);
}

// app/layouts/AppLayout/index.tsx
var import_jsx_dev_runtime4 = require("react/jsx-dev-runtime"), AppLayout = ({ children }) => /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "bg-gray-800 w-full relative text-gray-300 px-0 md:p-8 md:pt-0 pt-0 min-h-[100vh] h-full ", children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "flex p-0 flex-col max-w-4xl w-full mx-auto sticky top-8 bg-gray-800 border-r-[1px] border-l-[1px] border-gray-700 min-h-[100vh]", children }, void 0, !1, {
  fileName: "app/layouts/AppLayout/index.tsx",
  lineNumber: 6,
  columnNumber: 7
}, this) }, void 0, !1, {
  fileName: "app/layouts/AppLayout/index.tsx",
  lineNumber: 5,
  columnNumber: 5
}, this);

// app/styles/app.css
var app_default = "/build/_assets/app-OHH36CX5.css";

// app/root.tsx
var import_jsx_dev_runtime5 = require("react/jsx-dev-runtime"), isMount = !0, links = () => [
  { rel: "manifest", href: "/resources/manifest.webmanifest" },
  { rel: "stylesheet", href: app_default },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossorigin: "true"
  },
  {
    href: "https://fonts.googleapis.com/css2?family=Waiting+for+the+Sunrise&display=swap",
    rel: "stylesheet"
  }
], meta = () => ({
  charset: "utf-8",
  "og:type": "website",
  "og:site_name": config.appName,
  "twitter:creator": "@bhekanik",
  "twitter:card": "summary_large_image",
  viewport: "width=device-width,initial-scale=1"
});
function App() {
  let location = (0, import_react5.useLocation)(), matches = (0, import_react5.useMatches)();
  return import_react6.default.useEffect(() => {
    var _a;
    let mounted = isMount;
    if (isMount = !1, "serviceWorker" in navigator)
      if (navigator.serviceWorker.controller)
        (_a = navigator.serviceWorker.controller) == null || _a.postMessage({
          type: "REMIX_NAVIGATION",
          isMount: mounted,
          location,
          matches,
          manifest: window.__remixManifest
        });
      else {
        let listener = async () => {
          var _a2;
          await navigator.serviceWorker.ready, (_a2 = navigator.serviceWorker.controller) == null || _a2.postMessage({
            type: "REMIX_NAVIGATION",
            isMount: mounted,
            location,
            matches,
            manifest: window.__remixManifest
          });
        };
        return navigator.serviceWorker.addEventListener("controllerchange", listener), () => {
          navigator.serviceWorker.removeEventListener(
            "controllerchange",
            listener
          );
        };
      }
  }, [location]), /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("html", { lang: "en", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_react5.Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 87,
        columnNumber: 9
      }, this),
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_react5.Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 87,
        columnNumber: 18
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 86,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("body", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_react5.Outlet, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 90,
        columnNumber: 9
      }, this),
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_react5.ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 90,
        columnNumber: 20
      }, this),
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_react5.Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 90,
        columnNumber: 42
      }, this),
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_react5.LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 90,
        columnNumber: 54
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 89,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 85,
    columnNumber: 5
  }, this);
}
function ErrorBoundary({ error }) {
  return console.error(error), /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(AppLayout, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex flex-col max-w-4xl gap-4 w-full mx-auto sticky top-0 bg-gray-800 z-20 border-b-[1px] border-gray-700", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Header, { home: !0 }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 102,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 101,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex flex-col gap-4 w-full max-w-4xl mx-auto z-10", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { children: [
        "An unexpected error occurred: ",
        error.message
      ] }, void 0, !0, {
        fileName: "app/root.tsx",
        lineNumber: 105,
        columnNumber: 9
      }, this),
      ";"
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 104,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 100,
    columnNumber: 5
  }, this);
}
function CatchBoundary() {
  let caught = (0, import_react5.useCatch)();
  if (caught.status === 404)
    return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { children: "Not found" }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 115,
      columnNumber: 12
    }, this);
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

// app/routes/resources/manifest[.]webmanifest.ts
var manifest_webmanifest_exports = {};
__export(manifest_webmanifest_exports, {
  loader: () => loader
});
var import_node = require("@remix-run/node");
var loader = () => (0, import_node.json)(
  {
    short_name: config.appName,
    name: config.appName,
    start_url: "/",
    display: "standalone",
    background_color: "#1f2937",
    theme_color: "#d1d5db",
    shortcuts: [
      {
        name: "Homepage",
        url: "/",
        icons: [
          {
            src: "/icons/android-icon-96x96.png",
            sizes: "96x96",
            type: "image/png",
            purpose: "any monochrome"
          }
        ]
      }
    ],
    icons: [
      {
        src: "/icons/android-icon-36x36.png",
        sizes: "36x36",
        type: "image/png",
        density: "0.75"
      },
      {
        src: "/icons/android-icon-48x48.png",
        sizes: "48x48",
        type: "image/png",
        density: "1.0"
      },
      {
        src: "/icons/android-icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
        density: "1.5"
      },
      {
        src: "/icons/android-icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
        density: "2.0"
      },
      {
        src: "/icons/android-icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
        density: "3.0"
      },
      {
        src: "/icons/android-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        density: "4.0"
      }
    ]
  },
  {
    headers: {
      "Cache-Control": "public, max-age=600",
      "Content-Type": "application/manifest+json"
    }
  }
);

// app/routes/r/$roomId/poll/results.tsx
var results_exports = {};
__export(results_exports, {
  CatchBoundary: () => CatchBoundary2,
  default: () => Index,
  loader: () => loader2,
  meta: () => meta2
});
var import_node2 = require("@remix-run/node"), import_react11 = require("@remix-run/react"), import_tiny_invariant = __toESM(require("tiny-invariant"));

// app/components/ChoiceResult/index.tsx
var import_react7 = require("react"), import_jsx_dev_runtime6 = require("react/jsx-dev-runtime"), ChoiceResult = ({ choice, totalVotes }) => {
  let percentageContainerRef = (0, import_react7.useRef)(null), sizeRef = (0, import_react7.useRef)(null);
  return (0, import_react7.useEffect)(() => {
    choice && sizeRef.current && (sizeRef.current.style.width = `${(choice.votes / totalVotes * 100).toFixed(0)}%`);
  }, [choice, sizeRef]), /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
    "div",
    {
      ref: percentageContainerRef,
      className: "flex flex-row justify-start items-center w-full rounded-full relative border-[1px] border-solid border-gray-500",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("span", { className: "px-8 w-full", children: [
          choice.description,
          ": ",
          choice.votes,
          " (",
          (choice.votes / totalVotes * 100).toFixed(2),
          "%)"
        ] }, void 0, !0, {
          fileName: "app/components/ChoiceResult/index.tsx",
          lineNumber: 29,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
          "div",
          {
            ref: sizeRef,
            className: `h-full bg-blue-500 absolute w-[${(choice.votes / totalVotes * 100).toFixed(0)}%] opacity-30`
          },
          void 0,
          !1,
          {
            fileName: "app/components/ChoiceResult/index.tsx",
            lineNumber: 33,
            columnNumber: 7
          },
          this
        )
      ]
    },
    choice.id,
    !0,
    {
      fileName: "app/components/ChoiceResult/index.tsx",
      lineNumber: 24,
      columnNumber: 5
    },
    this
  );
};

// app/components/FormElements/Button/index.tsx
var import_classnames2 = __toESM(require("classnames")), import_react8 = require("react");
var import_jsx_dev_runtime7 = require("react/jsx-dev-runtime"), Button = (0, import_react8.forwardRef)(({ children, className, textColor, color = "primary", ...props }, ref) => {
  let btnClasses = (0, import_classnames2.default)(
    "p-2 flex text-bold border-[1px] border-gray-400 justify-center rounded-full",
    `${colors[color]}-800`,
    `hover:${colors[color]}-500`,
    "hover:text-green-500",
    textColor ?? "text-white",
    className
  );
  return /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("button", { ...props, ref, className: btnClasses, children }, void 0, !1, {
    fileName: "app/components/FormElements/Button/index.tsx",
    lineNumber: 24,
    columnNumber: 5
  }, this);
});

// app/components/RoomCodeShare/index.tsx
var import_classnames4 = __toESM(require("classnames")), import_react10 = require("react"), import_ai2 = require("react-icons/ai");

// app/components/FormElements/Input/index.tsx
var import_classnames3 = __toESM(require("classnames")), import_react9 = require("react"), import_jsx_dev_runtime8 = require("react/jsx-dev-runtime"), Input = (0, import_react9.forwardRef)(({ children, className, color = "primary", ...props }, ref) => {
  let inputClasses = (0, import_classnames3.default)(
    "p-2 px-6 w-full bg-gray-700 rounded-full",
    className
  );
  return /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("input", { ...props, ref, className: inputClasses }, void 0, !1, {
    fileName: "app/components/FormElements/Input/index.tsx",
    lineNumber: 13,
    columnNumber: 10
  }, this);
});

// app/components/RoomCodeShare/index.tsx
var import_pwa_utils = __toESM(require_pwa_utils()), import_jsx_dev_runtime9 = require("react/jsx-dev-runtime"), RoomCodeShare = (0, import_react10.forwardRef)(({ room, withInput = !0, share, poll, className, ...props }, ref) => {
  let [copiedText, setCopiedText] = (0, import_react10.useState)(""), [roomLink, setRoomLink] = (0, import_react10.useState)("");
  (0, import_react10.useEffect)(() => {
    if (room && typeof window < "u") {
      let origin = window.location.origin;
      setRoomLink(
        `${origin}/${config.roomsPath}${share ? "/share" : ""}/${room.id}${poll ? "/poll" : "/posts"}`
      );
    }
  }, [room]);
  let handleCopy = () => {
    navigator.clipboard.writeText(roomLink), setCopiedText("Copied to Clipboard!"), setTimeout(() => {
      setCopiedText("");
    }, 2e3);
  }, handleShare = async () => {
    (0, import_pwa_utils.WebShareLink)(
      roomLink,
      "Room Link",
      "Come join our room in the Masked app."
    ), await navigator.share({ url: roomLink });
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
    "div",
    {
      className: (0, import_classnames4.default)(
        "flex gap-2",
        !(className != null && className.includes("absolute")) && "relative",
        className
      ),
      ref,
      ...props,
      children: [
        withInput && /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(Input, { value: roomLink, disabled: !0 }, void 0, !1, {
          fileName: "app/components/RoomCodeShare/index.tsx",
          lineNumber: 64,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
          Button,
          {
            onClick: handleCopy,
            "aria-label": "copy",
            color: "secondary",
            className: "flex items-center justify-center text-lg",
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_ai2.AiOutlineCopy, {}, void 0, !1, {
              fileName: "app/components/RoomCodeShare/index.tsx",
              lineNumber: 72,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/components/RoomCodeShare/index.tsx",
            lineNumber: 66,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
          Button,
          {
            onClick: handleShare,
            color: "secondary",
            className: "flex items-center justify-center text-lg",
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_ai2.AiOutlineShareAlt, {}, void 0, !1, {
              fileName: "app/components/RoomCodeShare/index.tsx",
              lineNumber: 80,
              columnNumber: 9
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/components/RoomCodeShare/index.tsx",
            lineNumber: 75,
            columnNumber: 7
          },
          this
        ),
        copiedText && /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("span", { className: "absolute left-[30%] top-2 bg-slate-800 border-2 text-white rounded p-1", children: copiedText }, void 0, !1, {
          fileName: "app/components/RoomCodeShare/index.tsx",
          lineNumber: 83,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/components/RoomCodeShare/index.tsx",
      lineNumber: 55,
      columnNumber: 5
    },
    this
  );
});

// app/lib/getRoomImageUrl.ts
var import_cloudinary = require("cloudinary"), import_date_fns = require("date-fns");
var getRoomImageUrl = (room, theme, poll) => {
  if (!room)
    return "";
  import_cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  let transformation = [
    {
      fetch_format: "auto",
      quality: "auto"
    },
    {
      overlay: {
        url: config.colors[theme ?? config.theme].overlayIcon
      }
    },
    {
      flags: "layer_apply",
      width: 30,
      height: 30,
      gravity: "north_east",
      x: 40,
      y: 60
    },
    {
      color: config.colors[theme ?? config.theme].dimForegroundColor,
      overlay: {
        font_family: "Open Sans",
        font_size: 30,
        text_align: "right",
        text: `Created ${(0, import_date_fns.formatDistance)(
          new Date(room.created_at),
          new Date()
        )} ago`
      }
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
        text: config.appName
      }
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
        text: room.type === "poll" ? "Anonymous Poll" : config.appDescription
      }
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
        text: room.type === "poll" ? "Poll: " : "Room Name: "
      }
    },
    { flags: "layer_apply", gravity: "north_west", x: 40, y: 215 },
    {
      color: config.colors[theme ?? config.theme].foregroundColor,
      width: room.type === "poll" ? 1e3 : 850,
      height: 350,
      crop: "fit",
      overlay: {
        font_family: "Open Sans",
        font_size: 60,
        font_weight: "bold",
        text_align: "left",
        text: room.type === "poll" ? (poll == null ? void 0 : poll.question) ?? "" : `${(room == null ? void 0 : room.name) || "Unnamed Room"}`
      }
    },
    {
      flags: "layer_apply",
      gravity: "north_west",
      x: room.type === "poll" ? 130 : 300,
      y: 200
    }
  ];
  try {
    return import_cloudinary.v2.url(
      config.colors[theme ?? config.theme].baseImage,
      {
        width: 1200,
        height: 630,
        transformation
      }
    );
  } catch (error) {
    return console.log("error:", error), "";
  }
};

// app/types/Choice.tsx
var import_zod3 = require("zod");

// app/types/Poll.tsx
var import_zod2 = require("zod");

// app/types/Room.tsx
var import_zod = require("zod"), roomSchema = import_zod.z.object({
  id: import_zod.z.string().optional(),
  name: import_zod.z.string(),
  secret: import_zod.z.string().optional(),
  type: import_zod.z.enum(["default", "ama", "poll"]),
  created_at: import_zod.z.date()
});

// app/types/Poll.tsx
var pollBase = {
  id: import_zod2.z.string().optional(),
  question: import_zod2.z.string(),
  created_at: import_zod2.z.date()
}, pollSchema = import_zod2.z.object({
  ...pollBase,
  room: import_zod2.z.string()
}), pollWithRoomSchema = import_zod2.z.object({
  ...pollBase,
  room: roomSchema
});

// app/types/Choice.tsx
var choiceBase = {
  id: import_zod3.z.string().optional(),
  description: import_zod3.z.string(),
  votes: import_zod3.z.number(),
  percentage: import_zod3.z.number(),
  created_at: import_zod3.z.date()
}, choiceSchema = import_zod3.z.object({
  ...choiceBase,
  poll: import_zod3.z.string()
}), choiceWithPollSchema = import_zod3.z.object({
  ...choiceBase,
  poll: pollSchema
});

// app/xata.ts
var import_client = require("@xata.io/client"), tables = [
  {
    name: "confessions",
    columns: [
      { name: "title", type: "string" },
      {
        name: "content",
        type: "text",
        notNull: !0,
        defaultValue: "cannot be empty"
      },
      { name: "created_at", type: "datetime" },
      { name: "likes", type: "int", notNull: !0, defaultValue: "0" },
      { name: "room", type: "link", link: { table: "rooms" } },
      { name: "views", type: "int", notNull: !0, defaultValue: "0" }
    ]
  },
  {
    name: "rooms",
    columns: [
      { name: "created_at", type: "datetime" },
      { name: "name", type: "string" },
      { name: "type", type: "string", notNull: !0, defaultValue: "default" },
      { name: "secret", type: "string" }
    ]
  },
  {
    name: "comments",
    columns: [
      {
        name: "content",
        type: "text",
        notNull: !0,
        defaultValue: "empty comment"
      },
      { name: "created_at", type: "datetime" },
      { name: "comment_on", type: "link", link: { table: "comments" } },
      { name: "post", type: "link", link: { table: "confessions" } },
      { name: "poster", type: "string" }
    ]
  },
  {
    name: "polls",
    columns: [
      {
        name: "created_at",
        type: "datetime",
        notNull: !0,
        defaultValue: "2022-12-30T14:36:18.78Z"
      },
      { name: "question", type: "string", notNull: !0, defaultValue: "" },
      { name: "room", type: "link", link: { table: "rooms" } }
    ]
  },
  {
    name: "choices",
    columns: [
      { name: "description", type: "string", notNull: !0, defaultValue: "" },
      { name: "votes", type: "int", notNull: !0, defaultValue: "0" },
      { name: "percentage", type: "float", notNull: !0, defaultValue: "0" },
      { name: "poll", type: "link", link: { table: "polls" } },
      {
        name: "created_at",
        type: "datetime",
        notNull: !0,
        defaultValue: "2022-12-30T14:57:13.267Z"
      }
    ]
  }
], DatabaseClient = (0, import_client.buildClient)(), defaultOptions = {
  databaseURL: "https://Bhekani-Khumalo-s-workspace-sem5mg.eu-west-1.xata.sh/db/ccy-confessions"
}, XataClient = class extends DatabaseClient {
  constructor(options) {
    super({ ...defaultOptions, ...options }, tables);
  }
}, instance, getXataClient = () => instance || (instance = new XataClient(), instance);

// app/models/choices.server..ts
var xata = getXataClient();
var getChoices = async (pollId) => await xata.db.choices.sort("created_at", "desc").getAll({
  filter: {
    "poll.id": pollId
  }
}), createChoice = async (description, pollId) => {
  let choice = {
    description,
    poll: pollId,
    votes: 0,
    percentage: 0,
    created_at: new Date()
  };
  return choiceSchema.parse(choice), await xata.db.choices.create(choice);
}, voteForChoice = async (choiceId, votes) => {
  let newVotes = votes + 1;
  return await xata.db.choices.update(choiceId, {
    votes: newVotes
  });
};

// app/models/polls.server..ts
var xata2 = getXataClient();
var getRoomPoll = async (roomId) => await xata2.db.polls.sort("created_at", "desc").getFirst({
  filter: {
    "room.id": roomId
  }
}), createPoll = async (question, roomId) => {
  let poll = {
    question,
    room: roomId,
    created_at: new Date()
  };
  return pollSchema.parse(poll), await xata2.db.polls.create(poll);
};

// app/models/rooms.server..ts
var xata3 = getXataClient(), getRoom = async (roomId) => await xata3.db.rooms.read(roomId);
var createRoom = async (name, type, secret) => {
  let room = {
    name,
    type,
    created_at: new Date()
  };
  return secret && (room.secret = secret), roomSchema.parse(room), await xata3.db.rooms.create(room);
};

// app/routes/r/$roomId/poll/results.tsx
var import_jsx_dev_runtime10 = require("react/jsx-dev-runtime"), meta2 = ({ data }) => {
  var _a, _b, _c;
  return {
    title: `${config.appName} - Room Name: ${((_a = data.room) == null ? void 0 : _a.name) || "Unnamed Room"}`,
    "twitter:title": `${config.appName} - Room Name: ${((_b = data.room) == null ? void 0 : _b.name) || "Unnamed Room"}`,
    "og:title": `${config.appName} - Room Name: ${((_c = data.room) == null ? void 0 : _c.name) || "Unnamed Room"}`,
    description: config.appDescription,
    "twitter:description": config.appDescription,
    "og:description": config.appDescription,
    "og:image": data.url,
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:image:secure_url": data.url,
    "twitter:image": data.url
  };
}, loader2 = async ({ params }) => {
  (0, import_tiny_invariant.default)(params.roomId);
  let room = await getRoom(params.roomId), poll = await getRoomPoll(params.roomId), choices = null;
  poll && (choices = await getChoices(poll.id));
  let url = getRoomImageUrl(room, params.theme);
  return (0, import_node2.json)({
    room,
    poll,
    url,
    choices
  });
};
function Index() {
  let { room, poll, url, choices } = (0, import_react11.useLoaderData)(), totalVotes = choices.reduce((acc, cur) => acc + cur.votes, 0);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(AppLayout, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "flex flex-col max-w-4xl gap-4 w-full mx-auto sticky top-0 bg-gray-800 z-20 border-b-[1px] border-gray-700", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(Header, { room, home: !0 }, void 0, !1, {
        fileName: "app/routes/r/$roomId/poll/results.tsx",
        lineNumber: 77,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "flex flex-col gap-4 px-8 items-center justify-center w-full", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(RoomCodeShare, { poll: !0, className: "w-full", room }, void 0, !1, {
        fileName: "app/routes/r/$roomId/poll/results.tsx",
        lineNumber: 79,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/r/$roomId/poll/results.tsx",
        lineNumber: 78,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/r/$roomId/poll/results.tsx",
      lineNumber: 76,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "flex flex-col gap-4 w-full max-w-4xl mx-auto z-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "flex flex-col p-8 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("h3", { className: "text-3xl", children: poll.question }, void 0, !1, {
        fileName: "app/routes/r/$roomId/poll/results.tsx",
        lineNumber: 84,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "flex flex-col gap-2 w-full justify-start items-start", children: choices.map((choice) => /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
        ChoiceResult,
        {
          choice,
          totalVotes
        },
        choice.id,
        !1,
        {
          fileName: "app/routes/r/$roomId/poll/results.tsx",
          lineNumber: 87,
          columnNumber: 15
        },
        this
      )) }, void 0, !1, {
        fileName: "app/routes/r/$roomId/poll/results.tsx",
        lineNumber: 85,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_react11.Form, { method: "get", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(Button, { type: "submit", className: "px-8", children: "Get latest results" }, void 0, !1, {
        fileName: "app/routes/r/$roomId/poll/results.tsx",
        lineNumber: 95,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/r/$roomId/poll/results.tsx",
        lineNumber: 94,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/r/$roomId/poll/results.tsx",
      lineNumber: 83,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/r/$roomId/poll/results.tsx",
      lineNumber: 82,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/r/$roomId/poll/results.tsx",
    lineNumber: 75,
    columnNumber: 5
  }, this);
}
function CatchBoundary2() {
  let caught = (0, import_react11.useCatch)();
  if (caught.status === 404)
    return /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(AppLayout, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "flex flex-col max-w-4xl gap-4 w-full mx-auto sticky top-0 bg-gray-800 z-20 border-b-[1px] border-gray-700", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(Header, { home: !0 }, void 0, !1, {
        fileName: "app/routes/r/$roomId/poll/results.tsx",
        lineNumber: 112,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/r/$roomId/poll/results.tsx",
        lineNumber: 111,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "flex flex-col gap-4 w-full max-w-4xl mx-auto z-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { children: "Not found" }, void 0, !1, {
        fileName: "app/routes/r/$roomId/poll/results.tsx",
        lineNumber: 115,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/r/$roomId/poll/results.tsx",
        lineNumber: 114,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/r/$roomId/poll/results.tsx",
      lineNumber: 110,
      columnNumber: 7
    }, this);
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

// app/routes/m/share/$confessionId.tsx
var confessionId_exports = {};
__export(confessionId_exports, {
  CatchBoundary: () => CatchBoundary3,
  ErrorBoundary: () => ErrorBoundary2,
  action: () => action,
  default: () => Index2,
  loader: () => loader3,
  meta: () => meta3
});
var import_node4 = require("@remix-run/node"), import_react15 = require("@remix-run/react"), import_date_fns4 = require("date-fns"), import_react16 = require("react"), import_react_clamp_lines = __toESM(require("react-clamp-lines")), import_ai4 = require("react-icons/ai"), import_tiny_invariant2 = __toESM(require("tiny-invariant"));

// app/components/ConfessionPageFooter/index.tsx
var import_react12 = require("@remix-run/react"), import_date_fns2 = require("date-fns"), import_react13 = require("react"), import_ai3 = require("react-icons/ai");
var import_pwa_utils2 = __toESM(require_pwa_utils()), import_jsx_dev_runtime11 = require("react/jsx-dev-runtime");
function ConfessionPageFooter({
  confession,
  room,
  comments,
  onOpenComment
}) {
  let fetcher = (0, import_react12.useFetcher)(), getOptimisticLikes = () => {
    var _a, _b, _c;
    let likes = (_a = fetcher.submission) != null && _a.formData.get("likes") ? +((_b = fetcher.submission) == null ? void 0 : _b.formData.get("likes")) : 0, action11 = (_c = fetcher.submission) == null ? void 0 : _c.formData.get("_action");
    return likes && action11 === "like" ? likes + 1 : likes && action11 === "dislike" ? likes - 1 : null;
  }, [confessionLInk, setConfessionLink] = (0, import_react13.useState)("");
  (0, import_react13.useEffect)(() => {
    if (confession && typeof window < "u") {
      let origin = window.location.origin;
      setConfessionLink(`${origin}/${config.postsPath}/${confession.id}`);
    }
  }, [confession]);
  let handleShare = async () => {
    (0, import_pwa_utils2.WebShareLink)(confessionLInk, confession.title, confession.content), await navigator.share({ url: confessionLInk });
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { className: "flex gap-4 border-t-[1px] border-b-[1px] border-gray-700 py-2 px-8 w-full items-center justify-end", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { className: "w-full text-gray-400 text-md text-left", children: `${(0, import_date_fns2.formatDistance)(
      new Date((confession == null ? void 0 : confession.created_at) ?? new Date().toISOString()),
      new Date()
    )}` }, void 0, !1, {
      fileName: "app/components/ConfessionPageFooter/index.tsx",
      lineNumber: 68,
      columnNumber: 7
    }, this),
    (room == null ? void 0 : room.type) === "ama" && /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
      Button,
      {
        color: "secondary",
        onClick: () => onOpenComment(!0),
        textColor: "text-gray-400",
        className: "border-none hover:bg-slate-600 bg-none text-lg p-2 rounded-full flex flex-row items-center justify-center gap-2",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(import_ai3.AiOutlineComment, {}, void 0, !1, {
            fileName: "app/components/ConfessionPageFooter/index.tsx",
            lineNumber: 82,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("span", { className: "text-gray-500", children: comments == null ? void 0 : comments.length }, void 0, !1, {
            fileName: "app/components/ConfessionPageFooter/index.tsx",
            lineNumber: 83,
            columnNumber: 11
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/components/ConfessionPageFooter/index.tsx",
        lineNumber: 76,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
      fetcher.Form,
      {
        method: "post",
        className: "flex flex-row items-center justify-between",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("input", { type: "hidden", name: "id", value: confession == null ? void 0 : confession.id }, void 0, !1, {
            fileName: "app/components/ConfessionPageFooter/index.tsx",
            lineNumber: 95,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("input", { type: "hidden", name: "likes", value: confession == null ? void 0 : confession.likes }, void 0, !1, {
            fileName: "app/components/ConfessionPageFooter/index.tsx",
            lineNumber: 96,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("fieldset", { className: "flex flex-row items-center justify-between", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
              Button,
              {
                type: "submit",
                name: "_action",
                value: "dislike",
                color: "secondary",
                textColor: "text-gray-400",
                className: "border-none hover:bg-slate-600 bg-none text-lg p-2 rounded-full",
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(import_ai3.AiOutlineDislike, {}, void 0, !1, {
                  fileName: "app/components/ConfessionPageFooter/index.tsx",
                  lineNumber: 106,
                  columnNumber: 13
                }, this)
              },
              void 0,
              !1,
              {
                fileName: "app/components/ConfessionPageFooter/index.tsx",
                lineNumber: 98,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("span", { className: "text-lg p-2 w-10 text-center text-gray-500", children: getOptimisticLikes() ?? confession.likes }, void 0, !1, {
              fileName: "app/components/ConfessionPageFooter/index.tsx",
              lineNumber: 108,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
              Button,
              {
                type: "submit",
                name: "_action",
                value: "like",
                color: "secondary",
                textColor: "text-gray-400",
                className: "border-none hover:bg-slate-600 bg-none text-lg p-2 rounded-full",
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(import_ai3.AiOutlineLike, {}, void 0, !1, {
                  fileName: "app/components/ConfessionPageFooter/index.tsx",
                  lineNumber: 119,
                  columnNumber: 13
                }, this)
              },
              void 0,
              !1,
              {
                fileName: "app/components/ConfessionPageFooter/index.tsx",
                lineNumber: 111,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/components/ConfessionPageFooter/index.tsx",
            lineNumber: 97,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/components/ConfessionPageFooter/index.tsx",
        lineNumber: 87,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
      Button,
      {
        onClick: handleShare,
        color: "secondary",
        textColor: "text-gray-400",
        className: "border-none flex items-center justify-center text-lg",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(import_ai3.AiOutlineShareAlt, {}, void 0, !1, {
          fileName: "app/components/ConfessionPageFooter/index.tsx",
          lineNumber: 129,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/components/ConfessionPageFooter/index.tsx",
        lineNumber: 123,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/components/ConfessionPageFooter/index.tsx",
    lineNumber: 67,
    columnNumber: 5
  }, this);
}

// app/hooks/useClickOutside.tsx
var import_react14 = require("react"), useClickOutside = (cb) => {
  let refOne = (0, import_react14.useRef)(null);
  return (0, import_react14.useEffect)(() => {
    let handler = (e) => {
      var _a;
      (_a = refOne.current) != null && _a.contains(e.target) || cb();
    };
    return document.addEventListener("mousedown", handler), () => {
      document.removeEventListener("mousedown", handler);
    };
  }), [refOne];
};

// app/lib/badRequest.tsx
var import_node3 = require("@remix-run/node"), badRequest = (data) => (0, import_node3.json)(data, { status: 400 });

// app/lib/getConfessionImageUrl.ts
var import_cloudinary2 = require("cloudinary"), import_date_fns3 = require("date-fns");
var getConfessionImageUrl = (confession, theme) => {
  var _a;
  if (!confession)
    return "";
  import_cloudinary2.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  let transformation = [
    {
      fetch_format: "auto",
      quality: "auto"
    },
    {
      overlay: {
        url: config.colors[theme ?? config.theme].overlayIcon
      }
    },
    {
      flags: "layer_apply",
      width: 30,
      height: 30,
      gravity: "south_west",
      x: 40,
      y: 40
    },
    {
      color: config.colors[theme ?? config.theme].dimForegroundColor,
      overlay: {
        font_family: "Open Sans",
        font_size: 30,
        text_align: "left",
        text: confession.likes.toString()
      }
    },
    { flags: "layer_apply", gravity: "south_west", x: 85, y: 43 },
    {
      color: config.colors[theme ?? config.theme].dimForegroundColor,
      overlay: {
        font_family: "Open Sans",
        font_size: 30,
        text_align: "right",
        text: `${(0, import_date_fns3.format)(
          new Date(confession.created_at),
          "p - PP"
        )}`
      }
    },
    { flags: "layer_apply", gravity: "south_east", x: 40, y: 40 },
    {
      color: config.colors[theme ?? config.theme].appNameColor,
      overlay: {
        font_family: "Waiting for the Sunrise",
        font_size: 30,
        font_weight: "bold",
        text_align: "left",
        text: config.appName
      }
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
        text: confession.title
      }
    },
    { flags: "layer_apply", gravity: "north_west", x: 40, y: 35 },
    {
      color: config.colors[theme ?? config.theme].dimForegroundColor,
      overlay: {
        font_family: "Open Sans",
        font_size: 30,
        text_align: "left",
        text: `Room Code: ${(_a = confession.room) == null ? void 0 : _a.id}`
      }
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
        text: confession.content
      }
    },
    { flags: "layer_apply", gravity: "north_west", x: 40, y: 140 }
  ];
  try {
    return import_cloudinary2.v2.url(
      config.colors[theme ?? config.theme].baseImage,
      {
        width: 1200,
        height: 630,
        transformation
      }
    );
  } catch (error) {
    return console.log("error:", error), "";
  }
};

// app/types/Comment.tsx
var import_zod5 = require("zod");

// app/types/Confession.tsx
var import_zod4 = require("zod");
var confessionsBase = {
  id: import_zod4.z.string().optional(),
  title: import_zod4.z.string(),
  likes: import_zod4.z.number(),
  views: import_zod4.z.number(),
  content: import_zod4.z.string(),
  created_at: import_zod4.z.date()
}, confessionSchema = import_zod4.z.object({
  ...confessionsBase,
  room: import_zod4.z.string()
}), confessionWithRoomSchema = import_zod4.z.object({
  ...confessionsBase,
  room: roomSchema
});

// app/types/Comment.tsx
var commentBase = {
  id: import_zod5.z.string().optional(),
  content: import_zod5.z.string(),
  poster: import_zod5.z.string(),
  created_at: import_zod5.z.date()
}, commentSchema = import_zod5.z.object({
  ...commentBase,
  comment_on: import_zod5.z.string().optional(),
  post: import_zod5.z.string()
}), commentWithCommentSchema = import_zod5.z.object({
  ...commentBase,
  post: import_zod5.z.string(),
  comment_on: commentSchema
}), commentWithPostSchema = import_zod5.z.object({
  ...commentBase,
  comment_on: import_zod5.z.string().optional(),
  post: confessionSchema
}), commentWithLinksSchema = import_zod5.z.object({
  ...commentBase,
  comment_on: commentSchema,
  post: confessionSchema
});

// app/models/comments.server..ts
var xata4 = getXataClient();
var getAllComments = async () => await xata4.db.comments.sort("created_at", "asc").getAll(), getComments = async (confessionId) => await xata4.db.comments.sort("created_at", "desc").getAll({
  filter: {
    "post.id": confessionId
  }
}), createComment = async (content, poster, confessionId) => {
  let comment = {
    content,
    poster,
    post: confessionId,
    created_at: new Date()
  };
  return commentSchema.parse(comment), await xata4.db.comments.create(comment);
};

// app/models/confessions.server..ts
var xata5 = getXataClient(), getConfession = async (confessionId) => await xata5.db.confessions.read(confessionId), getConfessions = async (roomId) => await xata5.db.confessions.sort("likes", "desc").sort("created_at", "desc").getPaginated({
  pagination: {
    size: 15
  },
  filter: {
    "room.id": roomId
  }
}), createConfession = async (data) => {
  let confession = {
    ...data,
    likes: 0,
    views: 0,
    created_at: new Date()
  };
  return confessionSchema.parse(confession), await xata5.db.confessions.create(confession);
}, likeConfession = async (id, likes, action11) => {
  let newLikes = action11 === "like" ? likes + 1 : likes - 1;
  return await xata5.db.confessions.update(id, {
    likes: newLikes
  });
};

// app/routes/m/share/$confessionId.tsx
var import_jsx_dev_runtime12 = require("react/jsx-dev-runtime"), meta3 = ({ data }) => ({
  title: data.confession.title,
  "twitter:title": data.confession.title,
  "og:title": data.confession.title,
  description: data.confession.content,
  "twitter:description": data.confession.content,
  "og:description": data.confession.content,
  "og:image": data.url,
  "og:image:width": "1200",
  "og:image:height": "630",
  "og:image:secure_url": data.url,
  "twitter:image": data.url
}), loader3 = async ({ params }) => {
  var _a;
  (0, import_tiny_invariant2.default)(params.confessionId);
  let confession = await getConfession(params.confessionId), comments = await getComments(params.confessionId), room = await getRoom(((_a = confession == null ? void 0 : confession.room) == null ? void 0 : _a.id) ?? ""), url = getConfessionImageUrl(confession, params.theme);
  return (0, import_node4.json)({ room, confession, url, comments });
}, action = async ({ request }) => {
  let formData = await request.formData(), { _action, id, likes, comment, poster } = Object.fromEntries(formData);
  try {
    if (_action === "comment") {
      let result = await createComment(
        comment,
        poster,
        id
      );
      return (0, import_node4.json)(result);
    }
    return (_action === "like" || _action === "dislike") && likes && id && await likeConfession(id, +likes, _action), null;
  } catch (error) {
    return badRequest({
      formError: error.message ?? "Required values are missing."
    });
  }
};
function Index2() {
  let { confession, room, comments } = (0, import_react15.useLoaderData)(), [isCommenting, setIsCommenting] = (0, import_react16.useState)(!1), [commentContainerRef] = useClickOutside(
    () => setIsCommenting(!1)
  ), onOpenComment = (open) => {
    setIsCommenting(open);
  }, commentRef = (0, import_react16.useRef)(null), fetcher = (0, import_react15.useFetcher)();
  (0, import_react16.useEffect)(() => {
    let interval = setInterval(() => {
      fetcher.submit(null, { method: "get" });
    }, 6e3);
    return () => {
      clearInterval(interval);
    };
  }, []), (0, import_react16.useEffect)(() => {
    isCommenting && commentRef.current && (commentRef.current.contentEditable = "true", commentRef.current.focus());
  }, [isCommenting]);
  let formRef = (0, import_react16.useRef)(null);
  (0, import_react16.useEffect)(() => {
    var _a, _b, _c;
    !((_a = fetcher.data) != null && _a.formError) && ((_b = fetcher.data) == null ? void 0 : _b.id) && ((_c = formRef.current) == null || _c.reset(), onOpenComment(!1));
  }, [fetcher]);
  let handleSubmit = (e) => {
    var _a;
    e.preventDefault();
    let formData = new FormData(e.target), content = (_a = commentRef.current) == null ? void 0 : _a.innerText;
    formData.set("comment", content), formData.set("id", confession.id), formData.set("_action", "comment"), fetcher.submit(formData, { method: "post" });
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(AppLayout, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "flex flex-col max-w-4xl w-full mx-auto sticky top-0 bg-gray-800 z-20 border-b-[1px] border-gray-700", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(Header, { room, share: !1 }, void 0, !1, {
        fileName: "app/routes/m/share/$confessionId.tsx",
        lineNumber: 150,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "flex items-center justify-center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
          LinkButton,
          {
            color: "secondary",
            to: `/${config.roomsPath}/share/${confession.room.id}`,
            className: "w-[fit-content] absolute left-4 border-none bg-none hover:bg-none",
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(import_ai4.AiOutlineArrowLeft, {}, void 0, !1, {
              fileName: "app/routes/m/share/$confessionId.tsx",
              lineNumber: 158,
              columnNumber: 13
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/routes/m/share/$confessionId.tsx",
            lineNumber: 153,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(import_react15.Link, { to: `/${config.postsPath}/${confession == null ? void 0 : confession.id}`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("h3", { className: "font-bold pb-2 pt-4 text-2xl flex-1 whitespace-nowrap text-ellipsis", children: confession == null ? void 0 : confession.title }, void 0, !1, {
          fileName: "app/routes/m/share/$confessionId.tsx",
          lineNumber: 162,
          columnNumber: 13
        }, this) }, void 0, !1, {
          fileName: "app/routes/m/share/$confessionId.tsx",
          lineNumber: 161,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/m/share/$confessionId.tsx",
        lineNumber: 152,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "mb-4 text-lg px-8", children: confession == null ? void 0 : confession.content }, void 0, !1, {
        fileName: "app/routes/m/share/$confessionId.tsx",
        lineNumber: 167,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
        ConfessionPageFooter,
        {
          confession,
          room,
          comments,
          onOpenComment
        },
        void 0,
        !1,
        {
          fileName: "app/routes/m/share/$confessionId.tsx",
          lineNumber: 168,
          columnNumber: 9
        },
        this
      ),
      isCommenting && /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
        "div",
        {
          ref: commentContainerRef,
          className: "ml-8 px-4 pt-0 pl-0 pb-2 border-l-[1px] border-gray-700",
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
            fetcher.Form,
            {
              method: "post",
              ref: formRef,
              className: "flex flex-col px-8 pb-2",
              onSubmit: handleSubmit,
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "flex flex-row justify-between items-center py-2 border-t-[1px] border-gray-700", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "flex items-center justify-center gap-2 text-gray-500", children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
                      Button,
                      {
                        color: "secondary",
                        onClick: () => onOpenComment(!1),
                        className: "hover:bg-slate-600 border-none bg-none text-lg p-2 rounded-full",
                        children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(import_ai4.AiOutlineClose, {}, void 0, !1, {
                          fileName: "app/routes/m/share/$confessionId.tsx",
                          lineNumber: 192,
                          columnNumber: 21
                        }, this)
                      },
                      void 0,
                      !1,
                      {
                        fileName: "app/routes/m/share/$confessionId.tsx",
                        lineNumber: 187,
                        columnNumber: 19
                      },
                      this
                    ),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("span", { className: "text-gray-400", children: "Type your comment below" }, void 0, !1, {
                      fileName: "app/routes/m/share/$confessionId.tsx",
                      lineNumber: 194,
                      columnNumber: 19
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "app/routes/m/share/$confessionId.tsx",
                    lineNumber: 186,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("input", { type: "hidden", name: "id", value: confession.id }, void 0, !1, {
                    fileName: "app/routes/m/share/$confessionId.tsx",
                    lineNumber: 197,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("input", { type: "hidden", name: "poster", value: "Anonymous" }, void 0, !1, {
                    fileName: "app/routes/m/share/$confessionId.tsx",
                    lineNumber: 198,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
                    Button,
                    {
                      name: "_action",
                      type: "submit",
                      value: "comment",
                      className: "text-sm py-1 flex items-center justify-center",
                      children: "Comment"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/m/share/$confessionId.tsx",
                      lineNumber: 200,
                      columnNumber: 17
                    },
                    this
                  )
                ] }, void 0, !0, {
                  fileName: "app/routes/m/share/$confessionId.tsx",
                  lineNumber: 185,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
                  "div",
                  {
                    ref: commentRef,
                    className: "p-0 rounded-3xl px-6 py-6 bg-gray-700 outline-none border-t-[1px] border-gray-700"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/m/share/$confessionId.tsx",
                    lineNumber: 210,
                    columnNumber: 15
                  },
                  this
                )
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/routes/m/share/$confessionId.tsx",
              lineNumber: 179,
              columnNumber: 13
            },
            this
          )
        },
        void 0,
        !1,
        {
          fileName: "app/routes/m/share/$confessionId.tsx",
          lineNumber: 175,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/m/share/$confessionId.tsx",
      lineNumber: 149,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "flex flex-col pb-0 hover:drop-shadow-md h-full", children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "border-gray-700", children: comments.map((comment) => /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
      "div",
      {
        className: "ml-8 pl-8 border-b-[1px] border-l-[1px] border-gray-700",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "flex flex-row gap-2 justify-between items-center py-2 pt-4", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("h3", { className: "font-bold text-sm flex-1 whitespace-nowrap text-ellipsis", children: comment.poster ?? "Room Owner" }, void 0, !1, {
              fileName: "app/routes/m/share/$confessionId.tsx",
              lineNumber: 228,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("span", { children: "\xB7" }, void 0, !1, {
              fileName: "app/routes/m/share/$confessionId.tsx",
              lineNumber: 231,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "w-full text-gray-400 text-sm text-left", children: `${(0, import_date_fns4.formatDistance)(
              new Date(comment.created_at),
              new Date()
            )}` }, void 0, !1, {
              fileName: "app/routes/m/share/$confessionId.tsx",
              lineNumber: 232,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/m/share/$confessionId.tsx",
            lineNumber: 227,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
            import_react_clamp_lines.default,
            {
              text: comment.content,
              id: "really-unique-id",
              lines: 2,
              ellipsis: "...",
              moreText: "(click for more)",
              lessText: "(click for less)",
              innerElement: "p",
              className: "mb-6"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/m/share/$confessionId.tsx",
              lineNumber: 240,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/m/share/$confessionId.tsx",
          lineNumber: 226,
          columnNumber: 15
        }, this)
      },
      comment.id,
      !1,
      {
        fileName: "app/routes/m/share/$confessionId.tsx",
        lineNumber: 222,
        columnNumber: 13
      },
      this
    )) }, void 0, !1, {
      fileName: "app/routes/m/share/$confessionId.tsx",
      lineNumber: 220,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/m/share/$confessionId.tsx",
      lineNumber: 219,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/m/share/$confessionId.tsx",
    lineNumber: 148,
    columnNumber: 5
  }, this);
}
function ErrorBoundary2({ error }) {
  return console.error(error), /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(AppLayout, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "flex flex-col max-w-4xl gap-4 w-full mx-auto sticky top-0 bg-gray-800 z-20 border-b-[1px] border-gray-700", children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(Header, { home: !0 }, void 0, !1, {
      fileName: "app/routes/m/share/$confessionId.tsx",
      lineNumber: 265,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/m/share/$confessionId.tsx",
      lineNumber: 264,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "flex flex-col gap-4 w-full max-w-4xl mx-auto z-10", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { children: [
        "An unexpected error occurred: ",
        error.message
      ] }, void 0, !0, {
        fileName: "app/routes/m/share/$confessionId.tsx",
        lineNumber: 268,
        columnNumber: 9
      }, this),
      ";"
    ] }, void 0, !0, {
      fileName: "app/routes/m/share/$confessionId.tsx",
      lineNumber: 267,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/m/share/$confessionId.tsx",
    lineNumber: 263,
    columnNumber: 5
  }, this);
}
function CatchBoundary3() {
  let caught = (0, import_react15.useCatch)();
  if (caught.status === 404)
    return /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(AppLayout, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "flex flex-col max-w-4xl gap-4 w-full mx-auto sticky top-0 bg-gray-800 z-20 border-b-[1px] border-gray-700", children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(Header, { home: !0 }, void 0, !1, {
        fileName: "app/routes/m/share/$confessionId.tsx",
        lineNumber: 281,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/m/share/$confessionId.tsx",
        lineNumber: 280,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "flex flex-col gap-4 w-full max-w-4xl mx-auto z-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { children: "Not found" }, void 0, !1, {
        fileName: "app/routes/m/share/$confessionId.tsx",
        lineNumber: 284,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/m/share/$confessionId.tsx",
        lineNumber: 283,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/m/share/$confessionId.tsx",
      lineNumber: 279,
      columnNumber: 7
    }, this);
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

// app/routes/r/$roomId/poll/index.tsx
var poll_exports = {};
__export(poll_exports, {
  CatchBoundary: () => CatchBoundary4,
  action: () => action2,
  default: () => Index3,
  loader: () => loader4,
  meta: () => meta4
});
var import_node5 = require("@remix-run/node"), import_react17 = require("@remix-run/react"), import_react18 = require("react"), import_tiny_invariant3 = __toESM(require("tiny-invariant"));
var import_jsx_dev_runtime13 = require("react/jsx-dev-runtime"), meta4 = ({ data }) => {
  var _a, _b, _c;
  return {
    title: `${config.appName} -  ${((_a = data.poll) == null ? void 0 : _a.question) || ""}`,
    "twitter:title": `${config.appName} - ${((_b = data.poll) == null ? void 0 : _b.question) || ""}`,
    "og:title": `${config.appName} - ${((_c = data.poll) == null ? void 0 : _c.question) || ""}`,
    description: "Anonymous Poll",
    "twitter:description": "Anonymous Poll",
    "og:description": "Anonymous Poll",
    "og:image": data.url,
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:image:secure_url": data.url,
    "twitter:image": data.url
  };
}, loader4 = async ({ params }) => {
  (0, import_tiny_invariant3.default)(params.roomId);
  let room = await getRoom(params.roomId), poll = await getRoomPoll(params.roomId), choices = null;
  poll && (choices = await getChoices(poll.id));
  let url = getRoomImageUrl(room, params.theme, poll);
  return (0, import_node5.json)({
    room,
    poll,
    url,
    choices
  });
}, action2 = async ({ request }) => {
  try {
    let formData = await request.formData(), { vote: choiceId, ...choiceVotes } = Object.fromEntries(formData), votes = choiceVotes[choiceId], choice = await voteForChoice(choiceId, +votes);
    return (0, import_node5.json)({ choice });
  } catch (error) {
    return badRequest({
      formError: error.message ?? "Required values are missing."
    });
  }
};
function Index3() {
  let { room, poll, url, choices } = (0, import_react17.useLoaderData)(), actionData = (0, import_react17.useActionData)(), navigate = (0, import_react17.useNavigate)();
  return (0, import_react18.useEffect)(() => {
    !actionData || actionData.choice && navigate(`/${config.roomsPath}/${room.id}/poll/results`);
  }, [actionData]), /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(AppLayout, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "flex flex-col max-w-4xl gap-4 w-full mx-auto sticky top-0 bg-gray-800 z-20 border-b-[1px] border-gray-700", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(Header, { room, home: !0 }, void 0, !1, {
        fileName: "app/routes/r/$roomId/poll/index.tsx",
        lineNumber: 111,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "flex flex-col gap-4 px-8 items-center justify-center w-full", children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(RoomCodeShare, { share: !0, className: "w-full", room }, void 0, !1, {
        fileName: "app/routes/r/$roomId/poll/index.tsx",
        lineNumber: 113,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/r/$roomId/poll/index.tsx",
        lineNumber: 112,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/r/$roomId/poll/index.tsx",
      lineNumber: 110,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "flex flex-col gap-4 w-full max-w-4xl mx-auto z-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_react17.Form, { method: "post", className: "flex flex-col p-8 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("h3", { className: "text-3xl", children: poll.question }, void 0, !1, {
        fileName: "app/routes/r/$roomId/poll/index.tsx",
        lineNumber: 118,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "flex flex-col gap-2 w-full justify-start items-start", children: choices.map((choice) => /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
        "label",
        {
          className: "flex flex-row gap-2 justify-start items-center w-full",
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("input", { type: "hidden", name: choice.id, value: choice.votes }, void 0, !1, {
              fileName: "app/routes/r/$roomId/poll/index.tsx",
              lineNumber: 125,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
              "input",
              {
                type: "radio",
                name: "vote",
                value: choice.id,
                className: "accent-gray-800"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/r/$roomId/poll/index.tsx",
                lineNumber: 126,
                columnNumber: 17
              },
              this
            ),
            choice.description
          ]
        },
        choice.id,
        !0,
        {
          fileName: "app/routes/r/$roomId/poll/index.tsx",
          lineNumber: 121,
          columnNumber: 15
        },
        this
      )) }, void 0, !1, {
        fileName: "app/routes/r/$roomId/poll/index.tsx",
        lineNumber: 119,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(Button, { type: "submit", children: "Submit Vote" }, void 0, !1, {
        fileName: "app/routes/r/$roomId/poll/index.tsx",
        lineNumber: 136,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/r/$roomId/poll/index.tsx",
      lineNumber: 117,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/r/$roomId/poll/index.tsx",
      lineNumber: 116,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/r/$roomId/poll/index.tsx",
    lineNumber: 109,
    columnNumber: 5
  }, this);
}
function CatchBoundary4() {
  let caught = (0, import_react17.useCatch)();
  if (caught.status === 404)
    return /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(AppLayout, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "flex flex-col max-w-4xl gap-4 w-full mx-auto sticky top-0 bg-gray-800 z-20 border-b-[1px] border-gray-700", children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(Header, { home: !0 }, void 0, !1, {
        fileName: "app/routes/r/$roomId/poll/index.tsx",
        lineNumber: 150,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/r/$roomId/poll/index.tsx",
        lineNumber: 149,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "flex flex-col gap-4 w-full max-w-4xl mx-auto z-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { children: "Not found" }, void 0, !1, {
        fileName: "app/routes/r/$roomId/poll/index.tsx",
        lineNumber: 153,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/r/$roomId/poll/index.tsx",
        lineNumber: 152,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/r/$roomId/poll/index.tsx",
      lineNumber: 148,
      columnNumber: 7
    }, this);
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

// app/routes/m/ama/$confessionId.tsx
var confessionId_exports2 = {};
__export(confessionId_exports2, {
  CatchBoundary: () => CatchBoundary5,
  ErrorBoundary: () => ErrorBoundary3,
  action: () => action3,
  default: () => Index4,
  loader: () => loader5,
  meta: () => meta5
});
var import_node6 = require("@remix-run/node"), import_react19 = require("@remix-run/react"), import_react20 = require("react"), import_ai5 = require("react-icons/ai"), import_tiny_invariant4 = __toESM(require("tiny-invariant"));

// app/components/CommentsList/index.tsx
var import_date_fns5 = require("date-fns"), import_react_clamp_lines2 = __toESM(require("react-clamp-lines")), import_jsx_dev_runtime14 = require("react/jsx-dev-runtime");
function CommentsList({ comments }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "border-gray-700", children: comments.map((comment) => /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
    "div",
    {
      className: "ml-8 pl-8 border-b-[1px] border-l-[1px] border-gray-700",
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "flex flex-row gap-2 justify-between items-center py-2 pt-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("h3", { className: "font-bold text-sm flex-1 whitespace-nowrap text-ellipsis", children: comment.poster ?? "Room Owner" }, void 0, !1, {
            fileName: "app/components/CommentsList/index.tsx",
            lineNumber: 23,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("span", { children: "\xB7" }, void 0, !1, {
            fileName: "app/components/CommentsList/index.tsx",
            lineNumber: 26,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "w-full text-gray-400 text-sm text-left", children: `${(0, import_date_fns5.formatDistance)(new Date(comment.created_at), new Date())}` }, void 0, !1, {
            fileName: "app/components/CommentsList/index.tsx",
            lineNumber: 27,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/CommentsList/index.tsx",
          lineNumber: 22,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
          import_react_clamp_lines2.default,
          {
            text: comment.content,
            id: "really-unique-id",
            lines: 2,
            ellipsis: "...",
            moreText: "(click for more)",
            lessText: "(click for less)",
            innerElement: "p",
            className: "mb-6"
          },
          void 0,
          !1,
          {
            fileName: "app/components/CommentsList/index.tsx",
            lineNumber: 32,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/CommentsList/index.tsx",
        lineNumber: 21,
        columnNumber: 11
      }, this)
    },
    comment.id,
    !1,
    {
      fileName: "app/components/CommentsList/index.tsx",
      lineNumber: 17,
      columnNumber: 9
    },
    this
  )) }, void 0, !1, {
    fileName: "app/components/CommentsList/index.tsx",
    lineNumber: 15,
    columnNumber: 5
  }, this);
}

// app/routes/m/ama/$confessionId.tsx
var import_jsx_dev_runtime15 = require("react/jsx-dev-runtime"), meta5 = ({ data }) => ({
  title: data.confession.title,
  "twitter:title": data.confession.title,
  "og:title": data.confession.title,
  description: data.confession.content,
  "twitter:description": data.confession.content,
  "og:description": data.confession.content,
  "og:image": data.url,
  "og:image:width": "1200",
  "og:image:height": "630",
  "og:image:secure_url": data.url,
  "twitter:image": data.url
}), loader5 = async ({ params }) => {
  var _a;
  (0, import_tiny_invariant4.default)(params.confessionId);
  let confession = await getConfession(params.confessionId), comments = await getComments(params.confessionId), room = await getRoom(((_a = confession == null ? void 0 : confession.room) == null ? void 0 : _a.id) ?? ""), url = getConfessionImageUrl(confession, params.theme);
  return (0, import_node6.json)({ room, confession, url, comments });
}, action3 = async ({ request }) => {
  let formData = await request.formData(), { _action, id, likes, comment, poster } = Object.fromEntries(formData);
  try {
    if (_action === "comment") {
      let result = await createComment(
        comment,
        poster,
        id
      );
      return (0, import_node6.json)(result);
    }
    return (_action === "like" || _action === "dislike") && likes && id && await likeConfession(id, +likes, _action), null;
  } catch (error) {
    return badRequest({
      formError: error.message ?? "Required values are missing."
    });
  }
};
function Index4() {
  let { confession, room, comments } = (0, import_react19.useLoaderData)(), [isCommenting, setIsCommenting] = (0, import_react20.useState)(!1), [commentContainerRef] = useClickOutside(
    () => setIsCommenting(!1)
  ), onOpenComment = (open) => {
    setIsCommenting(open);
  }, commentRef = (0, import_react20.useRef)(null), fetcher = (0, import_react19.useFetcher)();
  (0, import_react20.useEffect)(() => {
    let interval = setInterval(() => {
      fetcher.submit(null, { method: "get" });
    }, 6e3);
    return () => {
      clearInterval(interval);
    };
  }, []), (0, import_react20.useEffect)(() => {
    isCommenting && commentRef.current && (commentRef.current.contentEditable = "true", commentRef.current.focus());
  }, [isCommenting]);
  let formRef = (0, import_react20.useRef)(null);
  (0, import_react20.useEffect)(() => {
    var _a, _b, _c;
    !((_a = fetcher.data) != null && _a.formError) && ((_b = fetcher.data) == null ? void 0 : _b.id) && ((_c = formRef.current) == null || _c.reset(), onOpenComment(!1));
  }, [fetcher]);
  let handleSubmit = (e) => {
    var _a;
    e.preventDefault();
    let formData = new FormData(e.target), content = (_a = commentRef.current) == null ? void 0 : _a.innerText;
    formData.set("comment", content), formData.set("id", confession.id), formData.set("_action", "comment"), fetcher.submit(formData, { method: "post" });
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(AppLayout, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "flex flex-col max-w-4xl w-full mx-auto sticky top-0 bg-gray-800 z-20 border-b-[1px] border-gray-700", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(Header, { room, share: !1 }, void 0, !1, {
        fileName: "app/routes/m/ama/$confessionId.tsx",
        lineNumber: 150,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "flex items-center justify-center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(
          LinkButton,
          {
            color: "secondary",
            to: `/${config.roomsPath}/${confession.room.id}/ama/posts`,
            className: "w-[fit-content] absolute left-4 border-none bg-none hover:bg-none",
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_ai5.AiOutlineArrowLeft, {}, void 0, !1, {
              fileName: "app/routes/m/ama/$confessionId.tsx",
              lineNumber: 158,
              columnNumber: 13
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/routes/m/ama/$confessionId.tsx",
            lineNumber: 153,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_react19.Link, { to: `/${config.postsPath}/${confession == null ? void 0 : confession.id}`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("h3", { className: "font-bold pb-2 pt-4 text-2xl flex-1 whitespace-nowrap text-ellipsis", children: confession == null ? void 0 : confession.title }, void 0, !1, {
          fileName: "app/routes/m/ama/$confessionId.tsx",
          lineNumber: 162,
          columnNumber: 13
        }, this) }, void 0, !1, {
          fileName: "app/routes/m/ama/$confessionId.tsx",
          lineNumber: 161,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/m/ama/$confessionId.tsx",
        lineNumber: 152,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "mb-4 text-lg px-8", children: confession == null ? void 0 : confession.content }, void 0, !1, {
        fileName: "app/routes/m/ama/$confessionId.tsx",
        lineNumber: 167,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(
        ConfessionPageFooter,
        {
          confession,
          room,
          comments,
          onOpenComment
        },
        void 0,
        !1,
        {
          fileName: "app/routes/m/ama/$confessionId.tsx",
          lineNumber: 168,
          columnNumber: 9
        },
        this
      ),
      isCommenting && /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(
        "div",
        {
          ref: commentContainerRef,
          className: "ml-8 px-4 pt-0 pl-0 pb-2 border-l-[1px] border-gray-700",
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(
            fetcher.Form,
            {
              method: "post",
              ref: formRef,
              className: "flex flex-col px-8 pb-2",
              onSubmit: handleSubmit,
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "flex flex-row justify-between items-center py-2 border-t-[1px] border-gray-700", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "flex items-center justify-center gap-2 text-gray-500", children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(
                      Button,
                      {
                        color: "secondary",
                        onClick: () => onOpenComment(!1),
                        className: "hover:bg-slate-600 border-none bg-none text-lg p-2 rounded-full",
                        children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_ai5.AiOutlineClose, {}, void 0, !1, {
                          fileName: "app/routes/m/ama/$confessionId.tsx",
                          lineNumber: 192,
                          columnNumber: 21
                        }, this)
                      },
                      void 0,
                      !1,
                      {
                        fileName: "app/routes/m/ama/$confessionId.tsx",
                        lineNumber: 187,
                        columnNumber: 19
                      },
                      this
                    ),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("span", { className: "text-gray-400", children: "Type your comment below" }, void 0, !1, {
                      fileName: "app/routes/m/ama/$confessionId.tsx",
                      lineNumber: 194,
                      columnNumber: 19
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "app/routes/m/ama/$confessionId.tsx",
                    lineNumber: 186,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("input", { type: "hidden", name: "id", value: confession.id }, void 0, !1, {
                    fileName: "app/routes/m/ama/$confessionId.tsx",
                    lineNumber: 197,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("input", { type: "hidden", name: "poster", value: "Room Owner" }, void 0, !1, {
                    fileName: "app/routes/m/ama/$confessionId.tsx",
                    lineNumber: 198,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(
                    Button,
                    {
                      name: "_action",
                      type: "submit",
                      value: "comment",
                      className: "text-sm py-1 flex items-center justify-center",
                      children: "Comment"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/m/ama/$confessionId.tsx",
                      lineNumber: 200,
                      columnNumber: 17
                    },
                    this
                  )
                ] }, void 0, !0, {
                  fileName: "app/routes/m/ama/$confessionId.tsx",
                  lineNumber: 185,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(
                  "div",
                  {
                    ref: commentRef,
                    className: "p-0 rounded-3xl px-6 py-6 bg-gray-700 outline-none border-t-[1px] border-gray-700"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/m/ama/$confessionId.tsx",
                    lineNumber: 210,
                    columnNumber: 15
                  },
                  this
                )
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/routes/m/ama/$confessionId.tsx",
              lineNumber: 179,
              columnNumber: 13
            },
            this
          )
        },
        void 0,
        !1,
        {
          fileName: "app/routes/m/ama/$confessionId.tsx",
          lineNumber: 175,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/m/ama/$confessionId.tsx",
      lineNumber: 149,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "flex flex-col pb-0 hover:drop-shadow-md h-full", children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(CommentsList, { comments }, void 0, !1, {
      fileName: "app/routes/m/ama/$confessionId.tsx",
      lineNumber: 220,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/m/ama/$confessionId.tsx",
      lineNumber: 219,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/m/ama/$confessionId.tsx",
    lineNumber: 148,
    columnNumber: 5
  }, this);
}
function ErrorBoundary3({ error }) {
  return console.error(error), /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(AppLayout, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "flex flex-col max-w-4xl gap-4 w-full mx-auto sticky top-0 bg-gray-800 z-20 border-b-[1px] border-gray-700", children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(Header, { home: !0 }, void 0, !1, {
      fileName: "app/routes/m/ama/$confessionId.tsx",
      lineNumber: 232,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/m/ama/$confessionId.tsx",
      lineNumber: 231,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "flex flex-col gap-4 w-full max-w-4xl mx-auto z-10", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { children: [
        "An unexpected error occurred: ",
        error.message
      ] }, void 0, !0, {
        fileName: "app/routes/m/ama/$confessionId.tsx",
        lineNumber: 235,
        columnNumber: 9
      }, this),
      ";"
    ] }, void 0, !0, {
      fileName: "app/routes/m/ama/$confessionId.tsx",
      lineNumber: 234,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/m/ama/$confessionId.tsx",
    lineNumber: 230,
    columnNumber: 5
  }, this);
}
function CatchBoundary5() {
  let caught = (0, import_react19.useCatch)();
  if (caught.status === 404)
    return /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(AppLayout, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "flex flex-col max-w-4xl gap-4 w-full mx-auto sticky top-0 bg-gray-800 z-20 border-b-[1px] border-gray-700", children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(Header, { home: !0 }, void 0, !1, {
        fileName: "app/routes/m/ama/$confessionId.tsx",
        lineNumber: 248,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/m/ama/$confessionId.tsx",
        lineNumber: 247,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "flex flex-col gap-4 w-full max-w-4xl mx-auto z-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { children: "Not found" }, void 0, !1, {
        fileName: "app/routes/m/ama/$confessionId.tsx",
        lineNumber: 251,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/m/ama/$confessionId.tsx",
        lineNumber: 250,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/m/ama/$confessionId.tsx",
      lineNumber: 246,
      columnNumber: 7
    }, this);
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

// app/routes/r/$roomId/ama/posts.tsx
var posts_exports = {};
__export(posts_exports, {
  CatchBoundary: () => CatchBoundary6,
  ErrorBoundary: () => ErrorBoundary4,
  action: () => action4,
  default: () => Index5,
  loader: () => loader6,
  meta: () => meta6
});
var import_node7 = require("@remix-run/node"), import_react23 = require("@remix-run/react"), import_react24 = require("react"), import_react_clamp_lines3 = __toESM(require("react-clamp-lines")), import_ai7 = require("react-icons/ai"), import_tiny_invariant5 = __toESM(require("tiny-invariant"));

// app/components/CardFooter/index.tsx
var import_react21 = require("@remix-run/react"), import_date_fns6 = require("date-fns"), import_react22 = require("react"), import_ai6 = require("react-icons/ai");
var import_pwa_utils3 = __toESM(require_pwa_utils()), import_jsx_dev_runtime16 = require("react/jsx-dev-runtime");
function CardFooter({
  confession,
  room,
  comments,
  onOpenComment,
  share
}) {
  let fetcher = (0, import_react21.useFetcher)(), getOptimisticLikes = () => {
    var _a, _b, _c;
    let likes = (_a = fetcher.submission) != null && _a.formData.get("likes") ? +((_b = fetcher.submission) == null ? void 0 : _b.formData.get("likes")) : 0, action11 = (_c = fetcher.submission) == null ? void 0 : _c.formData.get("_action");
    return likes && action11 === "like" ? likes + 1 : likes && action11 === "dislike" ? likes - 1 : null;
  }, [confessionLInk, setConfessionLink] = (0, import_react22.useState)("");
  (0, import_react22.useEffect)(() => {
    if (confession && typeof window < "u") {
      let origin = window.location.origin;
      setConfessionLink(
        `${origin}/${config.postsPath}${share ? "/share" : ""}/${confession.id}`
      );
    }
  }, [confession]);
  let handleShare = async () => {
    (0, import_pwa_utils3.WebShareLink)(confessionLInk, confession.title, confession.content), await navigator.share({ url: confessionLInk });
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { className: "flex gap-4 border-t-[1px] border-b-[1px] border-gray-700 py-2 px-8 w-full items-center justify-end", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { className: "w-full text-gray-400 text-md text-left", children: `${(0, import_date_fns6.formatDistance)(
      new Date((confession == null ? void 0 : confession.created_at) ?? new Date().toISOString()),
      new Date()
    )}` }, void 0, !1, {
      fileName: "app/components/CardFooter/index.tsx",
      lineNumber: 72,
      columnNumber: 7
    }, this),
    (room == null ? void 0 : room.type) === "ama" && /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
      Button,
      {
        color: "secondary",
        onClick: () => onOpenComment(!0),
        textColor: "text-gray-400",
        className: "border-none hover:bg-slate-600 bg-none text-lg p-2 rounded-full flex flex-row items-center justify-center gap-2",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(import_ai6.AiOutlineComment, {}, void 0, !1, {
            fileName: "app/components/CardFooter/index.tsx",
            lineNumber: 86,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("span", { className: "", children: comments == null ? void 0 : comments.length }, void 0, !1, {
            fileName: "app/components/CardFooter/index.tsx",
            lineNumber: 87,
            columnNumber: 11
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/components/CardFooter/index.tsx",
        lineNumber: 80,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
      fetcher.Form,
      {
        method: "post",
        className: "flex flex-row items-center justify-between",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("input", { type: "hidden", name: "id", value: confession == null ? void 0 : confession.id }, void 0, !1, {
            fileName: "app/components/CardFooter/index.tsx",
            lineNumber: 99,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("input", { type: "hidden", name: "likes", value: confession == null ? void 0 : confession.likes }, void 0, !1, {
            fileName: "app/components/CardFooter/index.tsx",
            lineNumber: 100,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("fieldset", { className: "flex flex-row items-center justify-between", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
              Button,
              {
                type: "submit",
                name: "_action",
                value: "dislike",
                color: "secondary",
                textColor: "text-gray-400",
                className: "border-none hover:bg-slate-600 bg-none text-lg p-2 rounded-full",
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(import_ai6.AiOutlineDislike, {}, void 0, !1, {
                  fileName: "app/components/CardFooter/index.tsx",
                  lineNumber: 110,
                  columnNumber: 13
                }, this)
              },
              void 0,
              !1,
              {
                fileName: "app/components/CardFooter/index.tsx",
                lineNumber: 102,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("span", { className: "text-lg p-2 w-10 text-center text-gray-400", children: getOptimisticLikes() ?? confession.likes }, void 0, !1, {
              fileName: "app/components/CardFooter/index.tsx",
              lineNumber: 112,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
              Button,
              {
                type: "submit",
                name: "_action",
                value: "like",
                color: "secondary",
                textColor: "text-gray-400",
                className: "border-none hover:bg-slate-600 bg-none text-lg p-2 rounded-full",
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(import_ai6.AiOutlineLike, {}, void 0, !1, {
                  fileName: "app/components/CardFooter/index.tsx",
                  lineNumber: 123,
                  columnNumber: 13
                }, this)
              },
              void 0,
              !1,
              {
                fileName: "app/components/CardFooter/index.tsx",
                lineNumber: 115,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/components/CardFooter/index.tsx",
            lineNumber: 101,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/components/CardFooter/index.tsx",
        lineNumber: 91,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
      Button,
      {
        onClick: handleShare,
        color: "secondary",
        textColor: "text-gray-400",
        className: "border-none flex items-center justify-center text-lg",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(import_ai6.AiOutlineShareAlt, {}, void 0, !1, {
          fileName: "app/components/CardFooter/index.tsx",
          lineNumber: 133,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/components/CardFooter/index.tsx",
        lineNumber: 127,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/components/CardFooter/index.tsx",
    lineNumber: 71,
    columnNumber: 5
  }, this);
}

// app/routes/r/$roomId/ama/posts.tsx
var import_jsx_dev_runtime17 = require("react/jsx-dev-runtime"), meta6 = ({ data }) => {
  var _a, _b, _c;
  return {
    title: `${config.appName} - Room Name: ${((_a = data.room) == null ? void 0 : _a.name) || "Unnamed Room"}`,
    "twitter:title": `${config.appName} - Room Name: ${((_b = data.room) == null ? void 0 : _b.name) || "Unnamed Room"}`,
    "og:title": `${config.appName} - Room Name: ${((_c = data.room) == null ? void 0 : _c.name) || "Unnamed Room"}`,
    description: config.appDescription,
    "twitter:description": config.appDescription,
    "og:description": config.appDescription,
    "og:image": data.url,
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:image:secure_url": data.url,
    "twitter:image": data.url
  };
}, loader6 = async ({ params }) => {
  (0, import_tiny_invariant5.default)(params.roomId);
  let confessionsPage = await getConfessions(params.roomId), comments = await getAllComments(), room = await getRoom(params.roomId), url = getRoomImageUrl(room, params.theme);
  return (room == null ? void 0 : room.type) === "default" && (0, import_node7.redirect)(`/${config.roomsPath}/${room.id}/posts`), (0, import_node7.json)({
    room,
    confessions: confessionsPage.records,
    url,
    comments
  });
}, action4 = async ({ request }) => {
  try {
    let formData = await request.formData(), { title, content, _action, id, likes, roomId, comment, poster } = Object.fromEntries(formData);
    if (_action === "comment") {
      let result = await createComment(
        comment,
        poster,
        id
      );
      return (0, import_node7.json)(result);
    }
    if (_action === "create") {
      let result = await createConfession({
        title,
        content,
        room: roomId
      });
      return (0, import_node7.json)(result);
    }
    return (_action === "like" || _action === "dislike") && likes && id && await likeConfession(id, +likes, _action), null;
  } catch (error) {
    return badRequest({
      formError: error.message ?? "Required values are missing."
    });
  }
};
function Index5() {
  let { room, comments, confessions } = (0, import_react23.useLoaderData)(), [secret, setSecret] = (0, import_react24.useState)(""), handleChange = (e) => {
    let { value } = e.target;
    setSecret(value);
  }, [isCommenting, setIsCommenting] = (0, import_react24.useState)(!1), [currentPost, setCurrentPost] = (0, import_react24.useState)(null), onOpenComment = (open, id) => {
    setIsCommenting(open), setCurrentPost(open ? id : null);
  }, commentRef = (0, import_react24.useRef)(null);
  (0, import_react24.useEffect)(() => {
    isCommenting && commentRef.current && (commentRef.current.contentEditable = "true", commentRef.current.focus());
  }, [isCommenting]);
  let actionData = (0, import_react23.useActionData)();
  (0, import_react24.useEffect)(() => {
    !(actionData != null && actionData.formError) && (actionData == null ? void 0 : actionData.id) && currentPost && (onOpenComment(!1, currentPost), setCurrentPost(null));
  }, [actionData]);
  let submit = (0, import_react23.useSubmit)();
  (0, import_react24.useEffect)(() => {
    let interval = setInterval(() => {
      submit(null, { method: "get" });
    }, 6e3);
    return () => {
      clearInterval(interval);
    };
  }, []);
  let handleSubmit = (e, id) => {
    var _a;
    e.preventDefault();
    let formData = new FormData(e.target), content = (_a = commentRef.current) == null ? void 0 : _a.innerText;
    formData.set("comment", content), formData.set("id", id), formData.set("_action", "comment"), submit(formData, { method: "post" });
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(AppLayout, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: "flex flex-col max-w-4xl gap-4 w-full mx-auto sticky top-0 bg-gray-800 z-20 border-b-[1px] border-gray-700", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(Header, { room, home: !0 }, void 0, !1, {
        fileName: "app/routes/r/$roomId/ama/posts.tsx",
        lineNumber: 198,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: "flex flex-col gap-4 px-8 items-center justify-center w-full", children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(RoomCodeShare, { share: !0, className: "w-full", room }, void 0, !1, {
        fileName: "app/routes/r/$roomId/ama/posts.tsx",
        lineNumber: 200,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/r/$roomId/ama/posts.tsx",
        lineNumber: 199,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/r/$roomId/ama/posts.tsx",
      lineNumber: 197,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: "flex flex-col gap-4 w-full max-w-4xl mx-auto z-10", children: room.type === "ama" && secret !== room.secret ? /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: "p-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(
      Input,
      {
        placeholder: "Room Secret",
        onChange: handleChange,
        required: room.type === "ama"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/r/$roomId/ama/posts.tsx",
        lineNumber: 206,
        columnNumber: 13
      },
      this
    ) }, void 0, !1, {
      fileName: "app/routes/r/$roomId/ama/posts.tsx",
      lineNumber: 205,
      columnNumber: 11
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("ul", { className: "flex flex-col gap-1 overflow-auto", children: [
      confessions.length === 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: "flex flex-col gap-4 p-8 pb-0 items-center justify-center w-full h-full", children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("p", { children: "No posts yet. Share the link to get the ball rolling." }, void 0, !1, {
        fileName: "app/routes/r/$roomId/ama/posts.tsx",
        lineNumber: 216,
        columnNumber: 17
      }, this) }, void 0, !1, {
        fileName: "app/routes/r/$roomId/ama/posts.tsx",
        lineNumber: 215,
        columnNumber: 15
      }, this),
      confessions == null ? void 0 : confessions.map((confession) => /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(
        "li",
        {
          className: "flex flex-col gap-2 hover:drop-shadow-md border-b-[1px] border-gray-700",
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: "flex items-center justify-between px-8 pt-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_react23.Link, { to: `/${config.postsPath}/ama/${confession.id}`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("h3", { className: "font-bold text-lg flex-1 whitespace-nowrap text-ellipsis", children: confession.title }, void 0, !1, {
              fileName: "app/routes/r/$roomId/ama/posts.tsx",
              lineNumber: 227,
              columnNumber: 21
            }, this) }, void 0, !1, {
              fileName: "app/routes/r/$roomId/ama/posts.tsx",
              lineNumber: 226,
              columnNumber: 19
            }, this) }, void 0, !1, {
              fileName: "app/routes/r/$roomId/ama/posts.tsx",
              lineNumber: 225,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_react23.Link, { to: `/${config.postsPath}/ama/${confession.id}`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(
              import_react_clamp_lines3.default,
              {
                text: confession.content,
                id: "really-unique-id",
                lines: 2,
                ellipsis: "...",
                moreText: "(click for more)",
                lessText: "(click for less)",
                innerElement: "p",
                className: "px-8 pb-4"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/r/$roomId/ama/posts.tsx",
                lineNumber: 234,
                columnNumber: 19
              },
              this
            ) }, void 0, !1, {
              fileName: "app/routes/r/$roomId/ama/posts.tsx",
              lineNumber: 233,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(
              CardFooter,
              {
                comments: comments.filter((c) => c.post.id === confession.id),
                confession,
                room,
                share: room.type === "ama",
                onOpenComment: (open) => onOpenComment(open, confession.id)
              },
              void 0,
              !1,
              {
                fileName: "app/routes/r/$roomId/ama/posts.tsx",
                lineNumber: 246,
                columnNumber: 17
              },
              this
            ),
            isCommenting && currentPost === confession.id && /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(
              import_react23.Form,
              {
                method: "post",
                className: "flex flex-col px-8 pb-2",
                onSubmit: (e) => handleSubmit(e, confession.id),
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: "flex flex-row justify-between items-center py-2 border-t-[1px] border-gray-700", children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: "flex items-center justify-center gap-2 text-gray-500", children: [
                      /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(
                        Button,
                        {
                          color: "secondary",
                          onClick: () => {
                            onOpenComment(!1, currentPost);
                          },
                          className: "hover:bg-slate-600 border-none bg-none text-lg p-2 rounded-full",
                          children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_ai7.AiOutlineClose, {}, void 0, !1, {
                            fileName: "app/routes/r/$roomId/ama/posts.tsx",
                            lineNumber: 271,
                            columnNumber: 27
                          }, this)
                        },
                        void 0,
                        !1,
                        {
                          fileName: "app/routes/r/$roomId/ama/posts.tsx",
                          lineNumber: 264,
                          columnNumber: 25
                        },
                        this
                      ),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("span", { className: "text-gray-400", children: "Type your comment below" }, void 0, !1, {
                        fileName: "app/routes/r/$roomId/ama/posts.tsx",
                        lineNumber: 273,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, !0, {
                      fileName: "app/routes/r/$roomId/ama/posts.tsx",
                      lineNumber: 263,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("input", { type: "hidden", name: "id", value: confession.id }, void 0, !1, {
                      fileName: "app/routes/r/$roomId/ama/posts.tsx",
                      lineNumber: 278,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("input", { type: "hidden", name: "poster", value: "Room Owner" }, void 0, !1, {
                      fileName: "app/routes/r/$roomId/ama/posts.tsx",
                      lineNumber: 279,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(
                      Button,
                      {
                        name: "_action",
                        type: "submit",
                        value: "comment",
                        className: "text-sm py-1 flex items-center justify-center",
                        children: "Comment"
                      },
                      void 0,
                      !1,
                      {
                        fileName: "app/routes/r/$roomId/ama/posts.tsx",
                        lineNumber: 281,
                        columnNumber: 23
                      },
                      this
                    )
                  ] }, void 0, !0, {
                    fileName: "app/routes/r/$roomId/ama/posts.tsx",
                    lineNumber: 262,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(
                    "div",
                    {
                      ref: commentRef,
                      className: "p-0 rounded-3xl px-6 py-6 bg-gray-700 outline-none border-t-[1px] border-gray-700"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/r/$roomId/ama/posts.tsx",
                      lineNumber: 291,
                      columnNumber: 21
                    },
                    this
                  )
                ]
              },
              void 0,
              !0,
              {
                fileName: "app/routes/r/$roomId/ama/posts.tsx",
                lineNumber: 257,
                columnNumber: 19
              },
              this
            )
          ]
        },
        confession.id,
        !0,
        {
          fileName: "app/routes/r/$roomId/ama/posts.tsx",
          lineNumber: 221,
          columnNumber: 15
        },
        this
      ))
    ] }, void 0, !0, {
      fileName: "app/routes/r/$roomId/ama/posts.tsx",
      lineNumber: 213,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/r/$roomId/ama/posts.tsx",
      lineNumber: 203,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/r/$roomId/ama/posts.tsx",
    lineNumber: 196,
    columnNumber: 5
  }, this);
}
function ErrorBoundary4({ error }) {
  return console.error(error), /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(AppLayout, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: "flex flex-col max-w-4xl gap-4 w-full mx-auto sticky top-0 bg-gray-800 z-20 border-b-[1px] border-gray-700", children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(Header, { home: !0 }, void 0, !1, {
      fileName: "app/routes/r/$roomId/ama/posts.tsx",
      lineNumber: 312,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/r/$roomId/ama/posts.tsx",
      lineNumber: 311,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: "flex flex-col gap-4 w-full max-w-4xl mx-auto z-10", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { children: [
        "An unexpected error occurred: ",
        error.message
      ] }, void 0, !0, {
        fileName: "app/routes/r/$roomId/ama/posts.tsx",
        lineNumber: 315,
        columnNumber: 9
      }, this),
      ";"
    ] }, void 0, !0, {
      fileName: "app/routes/r/$roomId/ama/posts.tsx",
      lineNumber: 314,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/r/$roomId/ama/posts.tsx",
    lineNumber: 310,
    columnNumber: 5
  }, this);
}
function CatchBoundary6() {
  let caught = (0, import_react23.useCatch)();
  if (caught.status === 404)
    return /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(AppLayout, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: "flex flex-col max-w-4xl gap-4 w-full mx-auto sticky top-0 bg-gray-800 z-20 border-b-[1px] border-gray-700", children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(Header, { home: !0 }, void 0, !1, {
        fileName: "app/routes/r/$roomId/ama/posts.tsx",
        lineNumber: 328,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/r/$roomId/ama/posts.tsx",
        lineNumber: 327,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: "flex flex-col gap-4 w-full max-w-4xl mx-auto z-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { children: "Not found" }, void 0, !1, {
        fileName: "app/routes/r/$roomId/ama/posts.tsx",
        lineNumber: 331,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/r/$roomId/ama/posts.tsx",
        lineNumber: 330,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/r/$roomId/ama/posts.tsx",
      lineNumber: 326,
      columnNumber: 7
    }, this);
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

// app/routes/resources/subscribe.ts
var subscribe_exports = {};
__export(subscribe_exports, {
  action: () => action5,
  loader: () => loader7
});

// app/utils/server/pwa-utils.server.ts
var storage = require("node-persist"), webPush = require("web-push");
async function SaveSubscription(sub) {
  await storage.init(), await storage.setItem("subscription", sub);
}

// app/routes/resources/subscribe.ts
var webPush2 = require("web-push"), action5 = async ({ request }) => {
  let subscription = (await request.json()).subscription;
  return SaveSubscription(subscription), { message: "Done" };
}, loader7 = async () => {
  if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY)
    return console.log(
      "You must set the VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY environment variables. You can use the following ones:"
    ), console.log(webPush2.generateVAPIDKeys()), null;
  let publicKey = process.env.VAPID_PUBLIC_KEY;
  return new Response(publicKey, {
    status: 202,
    statusText: "Successful Operation"
  });
};

// app/routes/m/$confessionId.tsx
var confessionId_exports3 = {};
__export(confessionId_exports3, {
  CatchBoundary: () => CatchBoundary7,
  ErrorBoundary: () => ErrorBoundary5,
  action: () => action6,
  default: () => Index6,
  loader: () => loader8,
  meta: () => meta7
});
var import_node8 = require("@remix-run/node"), import_react25 = require("@remix-run/react"), import_react26 = require("react"), import_ai8 = require("react-icons/ai"), import_tiny_invariant6 = __toESM(require("tiny-invariant"));
var import_jsx_dev_runtime18 = require("react/jsx-dev-runtime"), meta7 = ({ data }) => ({
  title: data.confession.title,
  "twitter:title": data.confession.title,
  "og:title": data.confession.title,
  description: data.confession.content,
  "twitter:description": data.confession.content,
  "og:description": data.confession.content,
  "og:image": data.url,
  "og:image:width": "1200",
  "og:image:height": "630",
  "og:image:secure_url": data.url,
  "twitter:image": data.url
}), loader8 = async ({ params }) => {
  var _a;
  (0, import_tiny_invariant6.default)(params.confessionId);
  let confession = await getConfession(params.confessionId), comments = await getComments(params.confessionId), room = await getRoom(((_a = confession == null ? void 0 : confession.room) == null ? void 0 : _a.id) ?? ""), url = getConfessionImageUrl(confession, params.theme);
  return (0, import_node8.json)({ room, confession, url, comments });
}, action6 = async ({ request }) => {
  let formData = await request.formData(), { _action, id, likes, comment, poster } = Object.fromEntries(formData);
  try {
    if (_action === "comment") {
      let result = await createComment(
        comment,
        poster,
        id
      );
      return (0, import_node8.json)(result);
    }
    return (_action === "like" || _action === "dislike") && likes && id && await likeConfession(id, +likes, _action), null;
  } catch (error) {
    return badRequest({
      formError: error.message ?? "Required values are missing."
    });
  }
};
function Index6() {
  let { confession, room, comments } = (0, import_react25.useLoaderData)(), [isCommenting, setIsCommenting] = (0, import_react26.useState)(!1), [commentContainerRef] = useClickOutside(
    () => setIsCommenting(!1)
  ), onOpenComment = (open) => {
    setIsCommenting(open);
  }, commentRef = (0, import_react26.useRef)(null), fetcher = (0, import_react25.useFetcher)();
  (0, import_react26.useEffect)(() => {
    let interval = setInterval(() => {
      fetcher.submit(null, { method: "get" });
    }, 6e3);
    return () => {
      clearInterval(interval);
    };
  }, []), (0, import_react26.useEffect)(() => {
    isCommenting && commentRef.current && (commentRef.current.contentEditable = "true", commentRef.current.focus());
  }, [isCommenting]);
  let formRef = (0, import_react26.useRef)(null);
  (0, import_react26.useEffect)(() => {
    var _a, _b, _c;
    !((_a = fetcher.data) != null && _a.formError) && ((_b = fetcher.data) == null ? void 0 : _b.id) && ((_c = formRef.current) == null || _c.reset(), onOpenComment(!1));
  }, [fetcher]);
  let handleSubmit = (e) => {
    var _a;
    e.preventDefault();
    let formData = new FormData(e.target), content = (_a = commentRef.current) == null ? void 0 : _a.innerText;
    formData.set("comment", content), formData.set("id", confession.id), formData.set("_action", "comment"), fetcher.submit(formData, { method: "post" });
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(AppLayout, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { className: "flex flex-col max-w-4xl w-full mx-auto sticky top-0 bg-gray-800 z-20 border-b-[1px] border-gray-700", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(Header, { room, share: !1 }, void 0, !1, {
        fileName: "app/routes/m/$confessionId.tsx",
        lineNumber: 150,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { className: "flex items-center justify-center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(
          LinkButton,
          {
            color: "secondary",
            to: `/${config.roomsPath}/${confession.room.id}/posts`,
            className: "w-[fit-content] absolute left-4 border-none bg-none hover:bg-none",
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(import_ai8.AiOutlineArrowLeft, {}, void 0, !1, {
              fileName: "app/routes/m/$confessionId.tsx",
              lineNumber: 158,
              columnNumber: 13
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/routes/m/$confessionId.tsx",
            lineNumber: 153,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(import_react25.Link, { to: `/${config.postsPath}/${confession == null ? void 0 : confession.id}`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("h3", { className: "font-bold pb-2 pt-4 text-2xl flex-1 whitespace-nowrap text-ellipsis", children: confession == null ? void 0 : confession.title }, void 0, !1, {
          fileName: "app/routes/m/$confessionId.tsx",
          lineNumber: 162,
          columnNumber: 13
        }, this) }, void 0, !1, {
          fileName: "app/routes/m/$confessionId.tsx",
          lineNumber: 161,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/m/$confessionId.tsx",
        lineNumber: 152,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { className: "mb-4 text-lg px-8", children: confession == null ? void 0 : confession.content }, void 0, !1, {
        fileName: "app/routes/m/$confessionId.tsx",
        lineNumber: 167,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(
        ConfessionPageFooter,
        {
          confession,
          room,
          comments,
          onOpenComment
        },
        void 0,
        !1,
        {
          fileName: "app/routes/m/$confessionId.tsx",
          lineNumber: 168,
          columnNumber: 9
        },
        this
      ),
      isCommenting && /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(
        "div",
        {
          ref: commentContainerRef,
          className: "ml-8 px-4 pt-0 pl-0 pb-2 border-l-[1px] border-gray-700",
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(
            fetcher.Form,
            {
              method: "post",
              ref: formRef,
              className: "flex flex-col px-8 pb-2",
              onSubmit: handleSubmit,
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { className: "flex flex-row justify-between items-center py-2 border-t-[1px] border-gray-700", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { className: "flex items-center justify-center gap-2 text-gray-500", children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(
                      Button,
                      {
                        color: "secondary",
                        onClick: () => onOpenComment(!1),
                        className: "hover:bg-slate-600 border-none bg-none text-lg p-2 rounded-full",
                        children: /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(import_ai8.AiOutlineClose, {}, void 0, !1, {
                          fileName: "app/routes/m/$confessionId.tsx",
                          lineNumber: 192,
                          columnNumber: 21
                        }, this)
                      },
                      void 0,
                      !1,
                      {
                        fileName: "app/routes/m/$confessionId.tsx",
                        lineNumber: 187,
                        columnNumber: 19
                      },
                      this
                    ),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("span", { className: "text-gray-400", children: "Type your comment below" }, void 0, !1, {
                      fileName: "app/routes/m/$confessionId.tsx",
                      lineNumber: 194,
                      columnNumber: 19
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "app/routes/m/$confessionId.tsx",
                    lineNumber: 186,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("input", { type: "hidden", name: "id", value: confession.id }, void 0, !1, {
                    fileName: "app/routes/m/$confessionId.tsx",
                    lineNumber: 197,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("input", { type: "hidden", name: "poster", value: "Room Owner" }, void 0, !1, {
                    fileName: "app/routes/m/$confessionId.tsx",
                    lineNumber: 198,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(
                    Button,
                    {
                      name: "_action",
                      type: "submit",
                      value: "comment",
                      className: "text-sm py-1 flex items-center justify-center",
                      children: "Comment"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/m/$confessionId.tsx",
                      lineNumber: 200,
                      columnNumber: 17
                    },
                    this
                  )
                ] }, void 0, !0, {
                  fileName: "app/routes/m/$confessionId.tsx",
                  lineNumber: 185,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(
                  "div",
                  {
                    ref: commentRef,
                    className: "p-0 rounded-3xl px-6 py-6 bg-gray-700 outline-none border-t-[1px] border-gray-700"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/m/$confessionId.tsx",
                    lineNumber: 210,
                    columnNumber: 15
                  },
                  this
                )
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/routes/m/$confessionId.tsx",
              lineNumber: 179,
              columnNumber: 13
            },
            this
          )
        },
        void 0,
        !1,
        {
          fileName: "app/routes/m/$confessionId.tsx",
          lineNumber: 175,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/m/$confessionId.tsx",
      lineNumber: 149,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { className: "flex flex-col pb-0 hover:drop-shadow-md h-full", children: /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(CommentsList, { comments }, void 0, !1, {
      fileName: "app/routes/m/$confessionId.tsx",
      lineNumber: 220,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/m/$confessionId.tsx",
      lineNumber: 219,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/m/$confessionId.tsx",
    lineNumber: 148,
    columnNumber: 5
  }, this);
}
function ErrorBoundary5({ error }) {
  return console.error(error), /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(AppLayout, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { className: "flex flex-col max-w-4xl gap-4 w-full mx-auto sticky top-0 bg-gray-800 z-20 border-b-[1px] border-gray-700", children: /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(Header, { home: !0 }, void 0, !1, {
      fileName: "app/routes/m/$confessionId.tsx",
      lineNumber: 232,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/m/$confessionId.tsx",
      lineNumber: 231,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { className: "flex flex-col gap-4 w-full max-w-4xl mx-auto z-10", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { children: [
        "An unexpected error occurred: ",
        error.message
      ] }, void 0, !0, {
        fileName: "app/routes/m/$confessionId.tsx",
        lineNumber: 235,
        columnNumber: 9
      }, this),
      ";"
    ] }, void 0, !0, {
      fileName: "app/routes/m/$confessionId.tsx",
      lineNumber: 234,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/m/$confessionId.tsx",
    lineNumber: 230,
    columnNumber: 5
  }, this);
}
function CatchBoundary7() {
  let caught = (0, import_react25.useCatch)();
  if (caught.status === 404)
    return /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(AppLayout, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { className: "flex flex-col max-w-4xl gap-4 w-full mx-auto sticky top-0 bg-gray-800 z-20 border-b-[1px] border-gray-700", children: /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(Header, { home: !0 }, void 0, !1, {
        fileName: "app/routes/m/$confessionId.tsx",
        lineNumber: 248,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/m/$confessionId.tsx",
        lineNumber: 247,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { className: "flex flex-col gap-4 w-full max-w-4xl mx-auto z-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { children: "Not found" }, void 0, !1, {
        fileName: "app/routes/m/$confessionId.tsx",
        lineNumber: 251,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/m/$confessionId.tsx",
        lineNumber: 250,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/m/$confessionId.tsx",
      lineNumber: 246,
      columnNumber: 7
    }, this);
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

// app/routes/r/$roomId/index.tsx
var roomId_exports = {};
__export(roomId_exports, {
  CatchBoundary: () => CatchBoundary8,
  ErrorBoundary: () => ErrorBoundary6,
  action: () => action7,
  default: () => Index7,
  loader: () => loader9,
  meta: () => meta8
});
var import_node9 = require("@remix-run/node"), import_react28 = require("@remix-run/react"), import_react29 = require("react"), import_tiny_invariant7 = __toESM(require("tiny-invariant"));

// app/components/FormElements/Textarea/index.tsx
var import_classnames5 = __toESM(require("classnames")), import_framer_motion = require("framer-motion"), import_react27 = require("react"), import_jsx_dev_runtime19 = require("react/jsx-dev-runtime"), Textarea = (0, import_react27.forwardRef)(
  ({ children, className, color = "primary", onClickAway, rows, ...props }, ref) => {
    let inputClasses = (0, import_classnames5.default)(
      "p-4 w-full bg-gray-700 rounded-3xl overflow-auto",
      className,
      !(className != null && className.includes("px-")) && "px-6"
    );
    return /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(
      import_framer_motion.motion.textarea,
      {
        ...props,
        rows,
        initial: !1,
        animate: { height: "auto" },
        ref,
        className: inputClasses
      },
      rows,
      !1,
      {
        fileName: "app/components/FormElements/Textarea/index.tsx",
        lineNumber: 26,
        columnNumber: 7
      },
      this
    );
  }
);

// app/lib/getMainAppImageUrl.ts
var import_cloudinary3 = require("cloudinary");
var getMainAppImageUrl = (theme) => {
  import_cloudinary3.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  let transformation = [
    {
      fetch_format: "auto",
      quality: "auto"
    },
    {
      color: config.colors[theme ?? config.theme].appNameColor,
      overlay: {
        font_family: "Waiting for the Sunrise",
        font_size: 200,
        font_weight: "bold",
        text_align: "left",
        text: config.appName
      }
    },
    { flags: "layer_apply", gravity: "center" }
  ];
  try {
    return import_cloudinary3.v2.url(
      config.colors[theme ?? config.theme].baseImage,
      {
        width: 1200,
        height: 630,
        transformation
      }
    );
  } catch (error) {
    return console.log("error:", error), "";
  }
};

// app/routes/r/$roomId/index.tsx
var import_jsx_dev_runtime20 = require("react/jsx-dev-runtime"), action7 = async ({ request }) => {
  let formData = await request.formData(), { question, roomId, ...choices } = Object.fromEntries(formData);
  try {
    let poll = await createPoll(question, roomId), choicePromises = [];
    Object.values(choices).forEach((choice) => {
      choicePromises.push(createChoice(choice, poll.id));
    });
    let newChoices = await Promise.all(choicePromises);
    return (0, import_node9.json)({ poll, choices: newChoices });
  } catch (error) {
    return badRequest({
      formError: error.message ?? "Required values are missing."
    });
  }
}, meta8 = ({ data }) => ({
  title: config.appName,
  "twitter:title": config.appName,
  "og:title": config.appName,
  description: config.appDescription,
  "twitter:description": config.appDescription,
  "og:description": config.appDescription,
  "og:image": data == null ? void 0 : data.url,
  "og:image:width": "1200",
  "og:image:height": "630",
  "og:image:secure_url": data == null ? void 0 : data.url,
  "twitter:image": data == null ? void 0 : data.url
}), loader9 = async ({ params }) => {
  (0, import_tiny_invariant7.default)(params.roomId);
  let room = await getRoom(params.roomId), url = getMainAppImageUrl(params.theme);
  return (0, import_node9.json)({
    room,
    url
  });
};
function Index7() {
  let { room } = (0, import_react28.useLoaderData)(), [choiceCounter, setChoiceCounter] = (0, import_react29.useState)(2), [choices, setChoices] = (0, import_react29.useState)([
    {
      name: "choice_1",
      required: !0,
      placeholder: "Choice 1"
    },
    {
      name: "choice_2",
      required: !0,
      placeholder: "Choice 2"
    }
  ]), handleAddChoice = () => {
    setChoices((currentChoices) => [
      ...currentChoices,
      {
        name: `choice_${choiceCounter + 1}`,
        required: !0,
        placeholder: `Choice ${choiceCounter + 1}`
      }
    ]), setChoiceCounter((currentChoiceCounter) => currentChoiceCounter + 1);
  }, handleRemoveChoice = (index) => {
    setChoices(
      (currentChoices) => currentChoices.filter((_, idx) => idx !== index)
    );
  }, [pollCreated, setPollCreated] = (0, import_react29.useState)(!1), actionData = (0, import_react28.useActionData)();
  return (0, import_react29.useEffect)(() => {
    !actionData || actionData.poll && actionData.choices && setPollCreated(!0);
  }, [actionData]), /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(AppLayout, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(Header, { room, home: !0 }, void 0, !1, {
      fileName: "app/routes/r/$roomId/index.tsx",
      lineNumber: 136,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", { className: "w-full flex flex-col gap-2 px-8", children: [
      room.type !== "poll" && /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(import_jsx_dev_runtime20.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("p", { className: "w-full text-center mb-2", children: [
          "Your Room Link. Use this link to access your room.",
          " ",
          room.type === "ama" ? /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("span", { children: "You will need your secret to see the posts." }, void 0, !1, {
            fileName: "app/routes/r/$roomId/index.tsx",
            lineNumber: 143,
            columnNumber: 17
          }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("span", { children: "Share this with anyone you want to invite to the room." }, void 0, !1, {
            fileName: "app/routes/r/$roomId/index.tsx",
            lineNumber: 145,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/r/$roomId/index.tsx",
          lineNumber: 140,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(RoomCodeShare, { room }, void 0, !1, {
          fileName: "app/routes/r/$roomId/index.tsx",
          lineNumber: 151,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/r/$roomId/index.tsx",
        lineNumber: 139,
        columnNumber: 11
      }, this),
      room.type === "poll" && pollCreated && /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(import_jsx_dev_runtime20.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("p", { className: "w-full text-center mb-2", children: [
          "Your Room Link. Use this link to access your room.",
          " ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("span", { children: "Share this with anyone you want to invite to the room." }, void 0, !1, {
            fileName: "app/routes/r/$roomId/index.tsx",
            lineNumber: 159,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/r/$roomId/index.tsx",
          lineNumber: 157,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(RoomCodeShare, { poll: !0, room }, void 0, !1, {
          fileName: "app/routes/r/$roomId/index.tsx",
          lineNumber: 164,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/r/$roomId/index.tsx",
        lineNumber: 156,
        columnNumber: 11
      }, this),
      room.type === "ama" && /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", { className: "py-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("p", { className: "w-full text-center mb-4", children: "Your share Link. This is used to add posts to your room." }, void 0, !1, {
          fileName: "app/routes/r/$roomId/index.tsx",
          lineNumber: 170,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(RoomCodeShare, { room, share: !0 }, void 0, !1, {
          fileName: "app/routes/r/$roomId/index.tsx",
          lineNumber: 173,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/r/$roomId/index.tsx",
        lineNumber: 169,
        columnNumber: 11
      }, this),
      room.type === "ama" && /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(
        LinkButton,
        {
          to: `/${config.roomsPath}/${room.id}/ama/posts`,
          color: "accent",
          children: [
            "Enter Room",
            room.name && `: ${room.name}`
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/routes/r/$roomId/index.tsx",
          lineNumber: 178,
          columnNumber: 11
        },
        this
      ),
      room.type === "default" && /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(
        LinkButton,
        {
          to: `/${config.roomsPath}/${room.id}/posts`,
          color: "accent",
          children: [
            "Enter Room",
            room.name && `: ${room.name}`
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/routes/r/$roomId/index.tsx",
          lineNumber: 187,
          columnNumber: 11
        },
        this
      ),
      room.type === "poll" && !pollCreated && /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(import_react28.Form, { method: "post", className: "my-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("fieldset", { className: "flex gap-2 flex-col", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(Input, { type: "hidden", name: "roomId", value: room.id }, void 0, !1, {
          fileName: "app/routes/r/$roomId/index.tsx",
          lineNumber: 198,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(
          Textarea,
          {
            rows: 3,
            name: "question",
            required: !0,
            className: "w-full p-2 bg-gray-700",
            placeholder: "Ask a question."
          },
          void 0,
          !1,
          {
            fileName: "app/routes/r/$roomId/index.tsx",
            lineNumber: 199,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("fieldset", { className: "flex flex-col gap-2", children: [
          choices.map((choice, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("fieldset", { className: "flex gap-2 flex-1", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(
              Input,
              {
                name: choice.name,
                required: choice.required,
                placeholder: choice.placeholder
              },
              void 0,
              !1,
              {
                fileName: "app/routes/r/$roomId/index.tsx",
                lineNumber: 210,
                columnNumber: 21
              },
              this
            ),
            index > 1 && /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(
              Button,
              {
                className: "flex items-center flex-1",
                onClick: () => handleRemoveChoice(index),
                children: "\u2A09"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/r/$roomId/index.tsx",
                lineNumber: 216,
                columnNumber: 23
              },
              this
            )
          ] }, choice.name, !0, {
            fileName: "app/routes/r/$roomId/index.tsx",
            lineNumber: 209,
            columnNumber: 19
          }, this)),
          /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(Button, { className: "flex items-center", onClick: handleAddChoice, children: "+" }, void 0, !1, {
            fileName: "app/routes/r/$roomId/index.tsx",
            lineNumber: 225,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/r/$roomId/index.tsx",
          lineNumber: 207,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(Button, { type: "submit", children: '"Submit"' }, void 0, !1, {
          fileName: "app/routes/r/$roomId/index.tsx",
          lineNumber: 230,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/r/$roomId/index.tsx",
        lineNumber: 197,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/r/$roomId/index.tsx",
        lineNumber: 196,
        columnNumber: 11
      }, this),
      room.type === "poll" && pollCreated && /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(
        LinkButton,
        {
          to: `/${config.roomsPath}/${room.id}/poll`,
          color: "accent",
          children: [
            "Open Poll",
            room.name && `: ${room.name}`
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/routes/r/$roomId/index.tsx",
          lineNumber: 236,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/r/$roomId/index.tsx",
      lineNumber: 137,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/r/$roomId/index.tsx",
    lineNumber: 135,
    columnNumber: 5
  }, this);
}
function ErrorBoundary6({ error }) {
  return console.error(error), /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(AppLayout, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", { className: "flex flex-col max-w-4xl gap-4 w-full mx-auto sticky top-0 bg-gray-800 z-20 border-b-[1px] border-gray-700", children: /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(Header, { home: !0 }, void 0, !1, {
      fileName: "app/routes/r/$roomId/index.tsx",
      lineNumber: 254,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/r/$roomId/index.tsx",
      lineNumber: 253,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", { className: "flex flex-col gap-4 w-full max-w-4xl mx-auto z-10", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", { children: [
        "An unexpected error occurred: ",
        error.message
      ] }, void 0, !0, {
        fileName: "app/routes/r/$roomId/index.tsx",
        lineNumber: 257,
        columnNumber: 9
      }, this),
      ";"
    ] }, void 0, !0, {
      fileName: "app/routes/r/$roomId/index.tsx",
      lineNumber: 256,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/r/$roomId/index.tsx",
    lineNumber: 252,
    columnNumber: 5
  }, this);
}
function CatchBoundary8() {
  let caught = (0, import_react28.useCatch)();
  if (caught.status === 404)
    return /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(AppLayout, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", { className: "flex flex-col max-w-4xl gap-4 w-full mx-auto sticky top-0 bg-gray-800 z-20 border-b-[1px] border-gray-700", children: /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(Header, { home: !0 }, void 0, !1, {
        fileName: "app/routes/r/$roomId/index.tsx",
        lineNumber: 270,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/r/$roomId/index.tsx",
        lineNumber: 269,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", { className: "flex flex-col gap-4 w-full max-w-4xl mx-auto z-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", { children: "Not found" }, void 0, !1, {
        fileName: "app/routes/r/$roomId/index.tsx",
        lineNumber: 273,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/r/$roomId/index.tsx",
        lineNumber: 272,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/r/$roomId/index.tsx",
      lineNumber: 268,
      columnNumber: 7
    }, this);
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

// app/routes/r/$roomId/posts.tsx
var posts_exports2 = {};
__export(posts_exports2, {
  CatchBoundary: () => CatchBoundary9,
  ErrorBoundary: () => ErrorBoundary7,
  action: () => action8,
  default: () => Index8,
  loader: () => loader10,
  meta: () => meta9
});
var import_node10 = require("@remix-run/node"), import_react36 = require("@remix-run/react"), import_react37 = require("react"), import_tiny_invariant8 = __toESM(require("tiny-invariant"));

// app/components/ConfessionCard/index.tsx
var import_react32 = require("@remix-run/react"), import_react33 = require("react"), import_react_clamp_lines4 = __toESM(require("react-clamp-lines"));

// app/components/CommentForm/index.tsx
var import_react30 = require("@remix-run/react"), import_react31 = require("react"), import_ai9 = require("react-icons/ai");
var import_jsx_dev_runtime21 = require("react/jsx-dev-runtime"), CommentForm = ({ confession, onOpenComment, share }) => {
  let commentRef = (0, import_react31.useRef)(null), fetcher = (0, import_react30.useFetcher)();
  (0, import_react31.useEffect)(() => {
    commentRef.current && (commentRef.current.contentEditable = "true", commentRef.current.focus());
  }, []);
  let formRef = (0, import_react31.useRef)(null);
  (0, import_react31.useEffect)(() => {
    var _a, _b, _c;
    !((_a = fetcher.data) != null && _a.formError) && ((_b = fetcher.data) == null ? void 0 : _b.id) && ((_c = formRef.current) == null || _c.reset(), onOpenComment(!1));
  }, [fetcher]);
  let handleSubmit = (e) => {
    var _a;
    e.preventDefault();
    let formData = new FormData(e.target), content = (_a = commentRef.current) == null ? void 0 : _a.innerText;
    formData.set("comment", content), formData.set("id", confession.id), formData.set("_action", "comment"), fetcher.submit(formData, { method: "post" });
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(
    fetcher.Form,
    {
      method: "post",
      ref: formRef,
      className: "flex flex-col px-8 pb-2",
      onSubmit: handleSubmit,
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", { className: "flex flex-row justify-between items-center py-2 border-t-[1px] border-gray-700", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", { className: "flex items-center justify-center gap-2 text-gray-500", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(
              Button,
              {
                color: "secondary",
                onClick: () => onOpenComment(!1),
                className: "hover:bg-slate-600 border-none bg-none text-lg p-2 rounded-full",
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(import_ai9.AiOutlineClose, {}, void 0, !1, {
                  fileName: "app/components/CommentForm/index.tsx",
                  lineNumber: 61,
                  columnNumber: 13
                }, this)
              },
              void 0,
              !1,
              {
                fileName: "app/components/CommentForm/index.tsx",
                lineNumber: 56,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("span", { className: "text-gray-400", children: "Type your comment below" }, void 0, !1, {
              fileName: "app/components/CommentForm/index.tsx",
              lineNumber: 63,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/CommentForm/index.tsx",
            lineNumber: 55,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("input", { type: "hidden", name: "id", value: confession.id }, void 0, !1, {
            fileName: "app/components/CommentForm/index.tsx",
            lineNumber: 66,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(
            "input",
            {
              type: "hidden",
              name: "poster",
              value: share ? "Anonymous" : "Room Owner"
            },
            void 0,
            !1,
            {
              fileName: "app/components/CommentForm/index.tsx",
              lineNumber: 67,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(
            Button,
            {
              name: "_action",
              type: "submit",
              value: "comment",
              className: "text-sm py-1 flex items-center justify-center",
              children: "Comment"
            },
            void 0,
            !1,
            {
              fileName: "app/components/CommentForm/index.tsx",
              lineNumber: 73,
              columnNumber: 9
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/CommentForm/index.tsx",
          lineNumber: 54,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(
          "div",
          {
            ref: commentRef,
            className: "p-0 rounded-3xl px-6 py-6 bg-gray-700 outline-none border-t-[1px] border-gray-700"
          },
          void 0,
          !1,
          {
            fileName: "app/components/CommentForm/index.tsx",
            lineNumber: 83,
            columnNumber: 7
          },
          this
        )
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/components/CommentForm/index.tsx",
      lineNumber: 48,
      columnNumber: 5
    },
    this
  );
};

// app/components/ConfessionCard/index.tsx
var import_jsx_dev_runtime22 = require("react/jsx-dev-runtime");
function ConfessionCard({ confession, room, comments }) {
  let [isCommenting, setIsCommenting] = (0, import_react33.useState)(!1), onOpenComment = (open) => {
    setIsCommenting(open);
  }, [fieldSetRef] = useClickOutside(
    () => onOpenComment(!1)
  );
  return /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(
    "li",
    {
      ref: fieldSetRef,
      className: "flex flex-col gap-2 hover:drop-shadow-md border-b-[1px] border-gray-700",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("div", { className: "flex items-center justify-between px-8 pt-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(import_react32.Link, { to: `/${config.postsPath}/${confession.id}`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("h3", { className: "font-bold text-lg flex-1 whitespace-nowrap text-ellipsis", children: confession.title }, void 0, !1, {
          fileName: "app/components/ConfessionCard/index.tsx",
          lineNumber: 40,
          columnNumber: 11
        }, this) }, void 0, !1, {
          fileName: "app/components/ConfessionCard/index.tsx",
          lineNumber: 39,
          columnNumber: 9
        }, this) }, void 0, !1, {
          fileName: "app/components/ConfessionCard/index.tsx",
          lineNumber: 38,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(import_react32.Link, { to: `/${config.postsPath}/${confession.id}`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(
          import_react_clamp_lines4.default,
          {
            text: confession.content,
            id: "really-unique-id",
            lines: 2,
            ellipsis: "...",
            moreText: "(click for more)",
            lessText: "(click for less)",
            innerElement: "p",
            className: "px-8 pb-4"
          },
          void 0,
          !1,
          {
            fileName: "app/components/ConfessionCard/index.tsx",
            lineNumber: 47,
            columnNumber: 9
          },
          this
        ) }, void 0, !1, {
          fileName: "app/components/ConfessionCard/index.tsx",
          lineNumber: 46,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(
          CardFooter,
          {
            comments,
            confession,
            room,
            share: room.type === "ama",
            onOpenComment
          },
          void 0,
          !1,
          {
            fileName: "app/components/ConfessionCard/index.tsx",
            lineNumber: 59,
            columnNumber: 7
          },
          this
        ),
        isCommenting && /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(CommentForm, { confession, onOpenComment }, void 0, !1, {
          fileName: "app/components/ConfessionCard/index.tsx",
          lineNumber: 68,
          columnNumber: 9
        }, this)
      ]
    },
    confession.id,
    !0,
    {
      fileName: "app/components/ConfessionCard/index.tsx",
      lineNumber: 33,
      columnNumber: 5
    },
    this
  );
}

// app/components/ConfessionForm/index.tsx
var import_react34 = require("@remix-run/react"), import_react35 = require("react");
var import_jsx_dev_runtime23 = require("react/jsx-dev-runtime"), ConfessionForm = ({ room }) => {
  let fetcher = (0, import_react34.useFetcher)(), formRef = (0, import_react35.useRef)(null), titleRef = (0, import_react35.useRef)(null);
  (0, import_react35.useEffect)(() => {
    var _a, _b, _c, _d;
    !((_a = fetcher.data) != null && _a.formError) && ((_b = fetcher.data) == null ? void 0 : _b.id) && ((_c = formRef.current) == null || _c.reset(), (_d = titleRef.current) == null || _d.focus());
  }, [fetcher]);
  let isAdding = fetcher.state === "submitting" && fetcher.submission.formData.get("_action") === "create", handleFocus = () => {
    setRows(6);
  }, [rows, setRows] = (0, import_react35.useState)(2), [fieldSetRef] = useClickOutside(() => setRows(2)), navigate = (0, import_react34.useNavigate)();
  return (0, import_react35.useEffect)(() => {
    var _a;
    room.type === "ama" && ((_a = fetcher.data) == null ? void 0 : _a.id) && navigate(`/${config.postsPath}/share/${fetcher.data.id}`);
  }, [room, fetcher.data]), /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(
    fetcher.Form,
    {
      ref: formRef,
      method: "post",
      className: "flex gap-2 flex-col mb-4 px-8",
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(
        "fieldset",
        {
          ref: fieldSetRef,
          className: "flex gap-2 flex-col",
          disabled: isAdding,
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(Input, { type: "hidden", name: "roomId", value: room.id }, void 0, !1, {
              fileName: "app/components/ConfessionForm/index.tsx",
              lineNumber: 59,
              columnNumber: 9
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(Input, { ref: titleRef, name: "title", required: !0, placeholder: "Post Title" }, void 0, !1, {
              fileName: "app/components/ConfessionForm/index.tsx",
              lineNumber: 60,
              columnNumber: 9
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(
              Textarea,
              {
                rows,
                onFocus: handleFocus,
                name: "content",
                required: !0,
                className: "w-full p-2 bg-gray-700",
                placeholder: "Type your post here."
              },
              void 0,
              !1,
              {
                fileName: "app/components/ConfessionForm/index.tsx",
                lineNumber: 61,
                columnNumber: 9
              },
              this
            ),
            /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(Button, { type: "submit", name: "_action", value: "create", disabled: isAdding, children: isAdding ? "Submitting..." : "Submit" }, void 0, !1, {
              fileName: "app/components/ConfessionForm/index.tsx",
              lineNumber: 69,
              columnNumber: 9
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/components/ConfessionForm/index.tsx",
          lineNumber: 54,
          columnNumber: 7
        },
        this
      )
    },
    void 0,
    !1,
    {
      fileName: "app/components/ConfessionForm/index.tsx",
      lineNumber: 49,
      columnNumber: 5
    },
    this
  );
};

// app/routes/r/$roomId/posts.tsx
var import_jsx_dev_runtime24 = require("react/jsx-dev-runtime"), meta9 = ({ data }) => {
  var _a, _b, _c;
  return {
    title: `${config.appName} - Room Name: ${((_a = data.room) == null ? void 0 : _a.name) || "Unnamed Room"}`,
    "twitter:title": `${config.appName} - Room Name: ${((_b = data.room) == null ? void 0 : _b.name) || "Unnamed Room"}`,
    "og:title": `${config.appName} - Room Name: ${((_c = data.room) == null ? void 0 : _c.name) || "Unnamed Room"}`,
    description: config.appDescription,
    "twitter:description": config.appDescription,
    "og:description": config.appDescription,
    "og:image": data.url,
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:image:secure_url": data.url,
    "twitter:image": data.url
  };
}, loader10 = async ({ params }) => {
  try {
    (0, import_tiny_invariant8.default)(params.roomId);
    let confessionsPage = await getConfessions(params.roomId), comments = await getAllComments(), room = await getRoom(params.roomId), url = getRoomImageUrl(room, params.theme);
    return (room == null ? void 0 : room.type) === "ama" && (0, import_node10.redirect)(`/${config.roomsPath}/${room.id}/ama/posts`), (room == null ? void 0 : room.type) === "poll" && (0, import_node10.redirect)(`/${config.roomsPath}/${room.id}/poll`), (0, import_node10.json)({
      room,
      confessions: confessionsPage.records,
      url,
      comments
    });
  } catch (error) {
    return badRequest({
      formError: error.message ?? "Required values are missing."
    });
  }
}, action8 = async ({ request }) => {
  try {
    let formData = await request.formData(), { title, content, _action, id, likes, roomId, comment, poster } = Object.fromEntries(formData);
    if (_action === "comment") {
      let result = await createComment(
        comment,
        poster,
        id
      );
      return (0, import_node10.json)(result);
    }
    if (_action === "create") {
      let result = await createConfession({
        title,
        content,
        room: roomId
      });
      return (0, import_node10.json)(result);
    }
    return (_action === "like" || _action === "dislike") && likes && id && await likeConfession(id, +likes, _action), null;
  } catch (error) {
    return badRequest({
      formError: error.message ?? "Required values are missing."
    });
  }
};
function Index8() {
  let { room, comments, confessions } = (0, import_react36.useLoaderData)(), submit = (0, import_react36.useSubmit)();
  return (0, import_react37.useEffect)(() => {
    let interval = setInterval(() => {
      submit(null, { method: "get" });
    }, 6e3);
    return () => {
      clearInterval(interval);
    };
  }, []), /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(AppLayout, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { className: "flex flex-col max-w-4xl gap-4 w-full mx-auto sticky top-0 bg-gray-800 z-20 border-b-[1px] border-gray-700", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(Header, { room, home: !0 }, void 0, !1, {
        fileName: "app/routes/r/$roomId/posts.tsx",
        lineNumber: 147,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { className: "flex flex-col gap-4 px-8 items-center justify-center w-full", children: /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(RoomCodeShare, { className: "w-full", room }, void 0, !1, {
        fileName: "app/routes/r/$roomId/posts.tsx",
        lineNumber: 149,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/r/$roomId/posts.tsx",
        lineNumber: 148,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(ConfessionForm, { room }, void 0, !1, {
        fileName: "app/routes/r/$roomId/posts.tsx",
        lineNumber: 151,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/r/$roomId/posts.tsx",
      lineNumber: 146,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { className: "flex flex-col gap-4 w-full max-w-4xl mx-auto z-10", children: [
      confessions.length === 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { className: "flex flex-col gap-4 p-8 pb-0 items-center justify-center w-full h-full", children: /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("p", { children: "No posts yet. Share the room link to get the ball rolling." }, void 0, !1, {
        fileName: "app/routes/r/$roomId/posts.tsx",
        lineNumber: 156,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/r/$roomId/posts.tsx",
        lineNumber: 155,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("ul", { className: "flex flex-col gap-1 overflow-auto", children: confessions == null ? void 0 : confessions.map((confession) => /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(
        ConfessionCard,
        {
          confession,
          room,
          comments: comments.filter((c) => c.post.id === confession.id)
        },
        confession.id,
        !1,
        {
          fileName: "app/routes/r/$roomId/posts.tsx",
          lineNumber: 162,
          columnNumber: 13
        },
        this
      )) }, void 0, !1, {
        fileName: "app/routes/r/$roomId/posts.tsx",
        lineNumber: 160,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/r/$roomId/posts.tsx",
      lineNumber: 153,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/r/$roomId/posts.tsx",
    lineNumber: 145,
    columnNumber: 5
  }, this);
}
function ErrorBoundary7({ error }) {
  return console.error(error), /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(AppLayout, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { className: "flex flex-col max-w-4xl gap-4 w-full mx-auto sticky top-0 bg-gray-800 z-20 border-b-[1px] border-gray-700", children: /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(Header, { home: !0 }, void 0, !1, {
      fileName: "app/routes/r/$roomId/posts.tsx",
      lineNumber: 181,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/r/$roomId/posts.tsx",
      lineNumber: 180,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { className: "flex flex-col gap-4 w-full max-w-4xl mx-auto z-10", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { children: [
        "An unexpected error occurred: ",
        error.message
      ] }, void 0, !0, {
        fileName: "app/routes/r/$roomId/posts.tsx",
        lineNumber: 184,
        columnNumber: 9
      }, this),
      ";"
    ] }, void 0, !0, {
      fileName: "app/routes/r/$roomId/posts.tsx",
      lineNumber: 183,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/r/$roomId/posts.tsx",
    lineNumber: 179,
    columnNumber: 5
  }, this);
}
function CatchBoundary9() {
  let caught = (0, import_react36.useCatch)();
  if (caught.status === 404)
    return /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(AppLayout, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { className: "flex flex-col max-w-4xl gap-4 w-full mx-auto sticky top-0 bg-gray-800 z-20 border-b-[1px] border-gray-700", children: /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(Header, { home: !0 }, void 0, !1, {
        fileName: "app/routes/r/$roomId/posts.tsx",
        lineNumber: 197,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/r/$roomId/posts.tsx",
        lineNumber: 196,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { className: "flex flex-col gap-4 w-full max-w-4xl mx-auto z-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { children: "Not found" }, void 0, !1, {
        fileName: "app/routes/r/$roomId/posts.tsx",
        lineNumber: 200,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/r/$roomId/posts.tsx",
        lineNumber: 199,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/r/$roomId/posts.tsx",
      lineNumber: 195,
      columnNumber: 7
    }, this);
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

// app/routes/r/share/$roomId.tsx
var roomId_exports2 = {};
__export(roomId_exports2, {
  CatchBoundary: () => CatchBoundary10,
  ErrorBoundary: () => ErrorBoundary8,
  action: () => action9,
  default: () => Index9,
  loader: () => loader11,
  meta: () => meta10
});
var import_node11 = require("@remix-run/node"), import_react38 = require("@remix-run/react"), import_tiny_invariant9 = __toESM(require("tiny-invariant"));
var import_jsx_dev_runtime25 = require("react/jsx-dev-runtime"), meta10 = ({ data }) => {
  var _a, _b, _c;
  return {
    title: `${config.appName} - Room Name: ${((_a = data.room) == null ? void 0 : _a.name) || "Unnamed Room"}`,
    "twitter:title": `${config.appName} - Room Name: ${((_b = data.room) == null ? void 0 : _b.name) || "Unnamed Room"}`,
    "og:title": `${config.appName} - Room Name: ${((_c = data.room) == null ? void 0 : _c.name) || "Unnamed Room"}`,
    description: config.appDescription,
    "twitter:description": config.appDescription,
    "og:description": config.appDescription,
    "og:image": data.url,
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:image:secure_url": data.url,
    "twitter:image": data.url
  };
}, loader11 = async ({ params }) => {
  (0, import_tiny_invariant9.default)(params.roomId);
  let confessionsPage = await getConfessions(params.roomId), comments = await getAllComments(), room = await getRoom(params.roomId), url = getRoomImageUrl(room, params.theme);
  return confessionsPage.records ? (0, import_node11.json)({
    room,
    confessions: confessionsPage.records,
    url,
    comments
  }) : (0, import_node11.json)({
    room,
    url,
    comments,
    confessions: [
      {
        id: "1",
        title: "Test",
        content: "Test content",
        created_at: new Date().toISOString()
      }
    ]
  });
}, action9 = async ({ request }) => {
  try {
    let formData = await request.formData(), { title, content, _action, id, likes, roomId, comment, poster } = Object.fromEntries(formData);
    if (_action === "comment") {
      let result = await createComment(
        comment,
        poster,
        id
      );
      return (0, import_node11.json)(result);
    }
    if (_action === "create") {
      let result = await createConfession({
        title,
        content,
        room: roomId
      });
      return (0, import_node11.json)(result);
    }
    return (_action === "like" || _action === "dislike") && likes && id && await likeConfession(id, +likes, _action), null;
  } catch (error) {
    return badRequest({
      formError: error.message ?? "Required values are missing."
    });
  }
};
function Index9() {
  let { room } = (0, import_react38.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(AppLayout, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "flex flex-col max-w-4xl gap-4 w-full mx-auto sticky top-0 bg-gray-800 z-20 border-b-[1px] border-gray-700", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(Header, { room, home: !0 }, void 0, !1, {
        fileName: "app/routes/r/share/$roomId.tsx",
        lineNumber: 137,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(ConfessionForm, { room }, void 0, !1, {
        fileName: "app/routes/r/share/$roomId.tsx",
        lineNumber: 138,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/r/share/$roomId.tsx",
      lineNumber: 136,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "flex flex-col gap-4 w-full max-w-4xl mx-auto z-10" }, void 0, !1, {
      fileName: "app/routes/r/share/$roomId.tsx",
      lineNumber: 140,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/r/share/$roomId.tsx",
    lineNumber: 135,
    columnNumber: 5
  }, this);
}
function ErrorBoundary8({ error }) {
  return console.error(error), /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(AppLayout, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "flex flex-col max-w-4xl gap-4 w-full mx-auto sticky top-0 bg-gray-800 z-20 border-b-[1px] border-gray-700", children: /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(Header, { home: !0 }, void 0, !1, {
      fileName: "app/routes/r/share/$roomId.tsx",
      lineNumber: 151,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/r/share/$roomId.tsx",
      lineNumber: 150,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "flex flex-col gap-4 w-full max-w-4xl mx-auto z-10", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { children: [
        "An unexpected error occurred: ",
        error.message
      ] }, void 0, !0, {
        fileName: "app/routes/r/share/$roomId.tsx",
        lineNumber: 154,
        columnNumber: 9
      }, this),
      ";"
    ] }, void 0, !0, {
      fileName: "app/routes/r/share/$roomId.tsx",
      lineNumber: 153,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/r/share/$roomId.tsx",
    lineNumber: 149,
    columnNumber: 5
  }, this);
}
function CatchBoundary10() {
  let caught = (0, import_react38.useCatch)();
  if (caught.status === 404)
    return /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(AppLayout, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "flex flex-col max-w-4xl gap-4 w-full mx-auto sticky top-0 bg-gray-800 z-20 border-b-[1px] border-gray-700", children: /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(Header, { home: !0 }, void 0, !1, {
        fileName: "app/routes/r/share/$roomId.tsx",
        lineNumber: 167,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/r/share/$roomId.tsx",
        lineNumber: 166,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "flex flex-col gap-4 w-full max-w-4xl mx-auto z-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { children: "Not found" }, void 0, !1, {
        fileName: "app/routes/r/share/$roomId.tsx",
        lineNumber: 170,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/r/share/$roomId.tsx",
        lineNumber: 169,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/r/share/$roomId.tsx",
      lineNumber: 165,
      columnNumber: 7
    }, this);
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

// app/routes/unfurl.ts
var unfurl_exports = {};
__export(unfurl_exports, {
  loader: () => loader12
});
var import_node12 = require("@remix-run/node"), loader12 = async ({ request }) => {
  var _a, _b, _c, _d;
  try {
    let url = new URL(request.url).searchParams.get("url"), data = await (await fetch(url)).text(), imageMetaTag = data.match(
      /<meta[^>]+property=['"]og:image['"][^>]+>/
    ), descriptionMetaTag = data.match(
      /<meta[^>]+property=['"]og:description['"][^>]+>/
    ), image = (_b = (_a = imageMetaTag == null ? void 0 : imageMetaTag[0].match(/content=['"]([^'"]+)['"]/)) == null ? void 0 : _a[0].match(/['"]([^'"]+)['"]/)) == null ? void 0 : _b[0].replace(/['"]/g, ""), description = (_d = (_c = descriptionMetaTag == null ? void 0 : descriptionMetaTag[0].match(/content=['"]([^'"]+)['"]/)) == null ? void 0 : _c[0].match(/['"]([^'"]+)['"]/)) == null ? void 0 : _d[0].replace(/['"]/g, "");
    return (0, import_node12.json)({ image, description });
  } catch (error) {
    return console.log("unfurl error:", error), (0, import_node12.json)({ fetchError: error });
  }
};

// app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  CatchBoundary: () => CatchBoundary11,
  ErrorBoundary: () => ErrorBoundary9,
  action: () => action10,
  default: () => Index10,
  loader: () => loader13,
  meta: () => meta11
});
var import_node13 = require("@remix-run/node"), import_react39 = require("@remix-run/react"), import_react40 = require("react");
var import_jsx_dev_runtime26 = require("react/jsx-dev-runtime"), action10 = async ({ request }) => {
  let formData = await request.formData(), { name, _action, type, secret } = Object.fromEntries(formData);
  try {
    if (_action === "create") {
      let result = await createRoom(name ?? "", type);
      return (0, import_node13.json)(result);
    }
    if (_action === "create_ama") {
      let result = await createRoom(
        name ?? "",
        type,
        secret
      );
      return (0, import_node13.json)(result);
    }
    if (_action === "create_poll") {
      let result = await createRoom(
        name ?? "",
        "poll",
        secret
      );
      return (0, import_node13.json)(result);
    }
  } catch (error) {
    return console.log("error:", error), badRequest({
      formError: error.message ?? "Required values are missing."
    });
  }
}, meta11 = ({ data }) => ({
  title: config.appName,
  "twitter:title": config.appName,
  "og:title": config.appName,
  description: config.appDescription,
  "twitter:description": config.appDescription,
  "og:description": config.appDescription,
  "og:image": data == null ? void 0 : data.url,
  "og:image:width": "1200",
  "og:image:height": "630",
  "og:image:secure_url": data == null ? void 0 : data.url,
  "twitter:image": data == null ? void 0 : data.url
}), loader13 = async ({ params, ...rest }) => {
  let url = getMainAppImageUrl(params.theme);
  return (0, import_node13.json)({ url });
};
function Index10() {
  let formRef = (0, import_react40.useRef)(null), nameRef = (0, import_react40.useRef)(null), room = (0, import_react39.useActionData)(), [roomCode, setRoomCode] = (0, import_react40.useState)(""), [roomType, setRoomType] = (0, import_react40.useState)("default"), handleRoomTypeChange = (e) => {
    let { value } = e.target;
    setRoomType(value);
  }, navigate = (0, import_react39.useNavigate)();
  return (0, import_react40.useEffect)(() => {
    room != null && room.id && navigate(`/${config.roomsPath}/${room.id}`);
  }, [room]), /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)(AppLayout, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)(Header, {}, void 0, !1, {
      fileName: "app/routes/index.tsx",
      lineNumber: 100,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)(
      import_react39.Form,
      {
        ref: formRef,
        method: "post",
        className: "flex gap-4 flex-col mb-4 px-8",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("p", { className: "mb-4", children: config.appDescription }, void 0, !1, {
            fileName: "app/routes/index.tsx",
            lineNumber: 106,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("span", { className: "text-bold", children: "Already have a room code?" }, void 0, !1, {
            fileName: "app/routes/index.tsx",
            lineNumber: 107,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)(
              Input,
              {
                value: roomCode,
                onChange: (e) => setRoomCode(e.target.value),
                placeholder: "Enter Room Code"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/index.tsx",
                lineNumber: 109,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)(
              LinkButton,
              {
                to: `/${config.roomsPath}/${roomCode}/posts`,
                "aria-label": "copy",
                className: "text-lg",
                children: "Join Room"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/index.tsx",
                lineNumber: 116,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/index.tsx",
            lineNumber: 108,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("p", { children: "Or create a new room. You have two options here." }, void 0, !1, {
            fileName: "app/routes/index.tsx",
            lineNumber: 124,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("p", { children: "A default room allows anyone with the room link to make posts and everyone with the room link can see all posts made." }, void 0, !1, {
            fileName: "app/routes/index.tsx",
            lineNumber: 125,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("p", { children: "For an AMA room only the creator of the room (or anyone with the room secret) can see all posts and can make comments on them. Everyone else can only make posts and view their own posts and comments made on them." }, void 0, !1, {
            fileName: "app/routes/index.tsx",
            lineNumber: 129,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("div", { className: "w-full flex flex-row gap-2 justify-center items-center", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)(Input, { name: "name", ref: nameRef, placeholder: "Room Name (Optional)" }, void 0, !1, {
              fileName: "app/routes/index.tsx",
              lineNumber: 136,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("div", { className: "flex flex-row gap-2 justify-center items-center", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("label", { className: "flex flex-row gap-2 justify-center items-center", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)(
                  "input",
                  {
                    type: "radio",
                    name: "type",
                    value: "default",
                    defaultChecked: !0,
                    onChange: handleRoomTypeChange,
                    className: "accent-gray-800"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/index.tsx",
                    lineNumber: 140,
                    columnNumber: 15
                  },
                  this
                ),
                "Default"
              ] }, void 0, !0, {
                fileName: "app/routes/index.tsx",
                lineNumber: 139,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("label", { className: "flex flex-row gap-2 justify-center items-center", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)(
                  "input",
                  {
                    type: "radio",
                    name: "type",
                    value: "ama",
                    onChange: handleRoomTypeChange,
                    className: "accent-gray-800"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/index.tsx",
                    lineNumber: 151,
                    columnNumber: 15
                  },
                  this
                ),
                "AMA"
              ] }, void 0, !0, {
                fileName: "app/routes/index.tsx",
                lineNumber: 150,
                columnNumber: 13
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/index.tsx",
              lineNumber: 138,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/index.tsx",
            lineNumber: 135,
            columnNumber: 9
          }, this),
          roomType === "ama" && /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("span", { children: "AMA rooms need a secret." }, void 0, !1, {
              fileName: "app/routes/index.tsx",
              lineNumber: 164,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)(
              Input,
              {
                name: "secret",
                placeholder: "Create a Room Secret",
                required: roomType === "ama"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/index.tsx",
                lineNumber: 165,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/index.tsx",
            lineNumber: 163,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)(
            Button,
            {
              type: "submit",
              name: "_action",
              value: roomType === "ama" ? "create_ama" : "create",
              children: roomType === "ama" ? "Create New AMA Room" : "Create New Room"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/index.tsx",
              lineNumber: 172,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("p", { children: "Or create a poll" }, void 0, !1, {
            fileName: "app/routes/index.tsx",
            lineNumber: 179,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)(Button, { type: "submit", name: "_action", value: "create_poll", children: "Create Poll" }, void 0, !1, {
            fileName: "app/routes/index.tsx",
            lineNumber: 180,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/routes/index.tsx",
        lineNumber: 101,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/routes/index.tsx",
    lineNumber: 99,
    columnNumber: 5
  }, this);
}
function ErrorBoundary9({ error }) {
  return console.error(error), /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)(AppLayout, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("div", { className: "flex flex-col max-w-4xl gap-4 w-full mx-auto sticky top-0 bg-gray-800 z-20 border-b-[1px] border-gray-700", children: /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)(Header, { home: !0 }, void 0, !1, {
      fileName: "app/routes/index.tsx",
      lineNumber: 194,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/index.tsx",
      lineNumber: 193,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("div", { className: "flex flex-col gap-4 w-full max-w-4xl mx-auto z-10", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("div", { children: [
        "An unexpected error occurred: ",
        error.message
      ] }, void 0, !0, {
        fileName: "app/routes/index.tsx",
        lineNumber: 197,
        columnNumber: 9
      }, this),
      ";"
    ] }, void 0, !0, {
      fileName: "app/routes/index.tsx",
      lineNumber: 196,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/index.tsx",
    lineNumber: 192,
    columnNumber: 5
  }, this);
}
function CatchBoundary11() {
  let caught = (0, import_react39.useCatch)();
  if (caught.status === 404)
    return /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)(AppLayout, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("div", { className: "flex flex-col max-w-4xl gap-4 w-full mx-auto sticky top-0 bg-gray-800 z-20 border-b-[1px] border-gray-700", children: /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)(Header, { home: !0 }, void 0, !1, {
        fileName: "app/routes/index.tsx",
        lineNumber: 210,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/index.tsx",
        lineNumber: 209,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("div", { className: "flex flex-col gap-4 w-full max-w-4xl mx-auto z-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("div", { children: "Not found" }, void 0, !1, {
        fileName: "app/routes/index.tsx",
        lineNumber: 213,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/index.tsx",
        lineNumber: 212,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/index.tsx",
      lineNumber: 208,
      columnNumber: 7
    }, this);
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { version: "9aed3cc8", entry: { module: "/build/entry.client-A6AD6GRW.js", imports: ["/build/_shared/chunk-Y23DACDU.js", "/build/_shared/chunk-4IYZMDEG.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-OISHPX7T.js", imports: ["/build/_shared/chunk-P76CVIU7.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !0, hasErrorBoundary: !0 }, "routes/index": { id: "routes/index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/index-SO4BR6ZX.js", imports: ["/build/_shared/chunk-PVRZC4XH.js", "/build/_shared/chunk-YAG44XE3.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !0, hasErrorBoundary: !0 }, "routes/m/$confessionId": { id: "routes/m/$confessionId", parentId: "root", path: "m/:confessionId", index: void 0, caseSensitive: void 0, module: "/build/routes/m/$confessionId-UQAFP2AD.js", imports: ["/build/_shared/chunk-WKX7TK35.js", "/build/_shared/chunk-XO2HVJCD.js", "/build/_shared/chunk-SB6Z5ZJC.js", "/build/_shared/chunk-TNGW37ZS.js", "/build/_shared/chunk-3KZTUR4F.js", "/build/_shared/chunk-AUYLHJJM.js", "/build/_shared/chunk-YAG44XE3.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !0, hasErrorBoundary: !0 }, "routes/m/ama/$confessionId": { id: "routes/m/ama/$confessionId", parentId: "root", path: "m/ama/:confessionId", index: void 0, caseSensitive: void 0, module: "/build/routes/m/ama/$confessionId-MHN7WDHC.js", imports: ["/build/_shared/chunk-WKX7TK35.js", "/build/_shared/chunk-XO2HVJCD.js", "/build/_shared/chunk-SB6Z5ZJC.js", "/build/_shared/chunk-TNGW37ZS.js", "/build/_shared/chunk-3KZTUR4F.js", "/build/_shared/chunk-AUYLHJJM.js", "/build/_shared/chunk-YAG44XE3.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !0, hasErrorBoundary: !0 }, "routes/m/share/$confessionId": { id: "routes/m/share/$confessionId", parentId: "root", path: "m/share/:confessionId", index: void 0, caseSensitive: void 0, module: "/build/routes/m/share/$confessionId-BUBTLZ7S.js", imports: ["/build/_shared/chunk-XO2HVJCD.js", "/build/_shared/chunk-SB6Z5ZJC.js", "/build/_shared/chunk-TNGW37ZS.js", "/build/_shared/chunk-3KZTUR4F.js", "/build/_shared/chunk-AUYLHJJM.js", "/build/_shared/chunk-YAG44XE3.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !0, hasErrorBoundary: !0 }, "routes/r/$roomId/ama/posts": { id: "routes/r/$roomId/ama/posts", parentId: "root", path: "r/:roomId/ama/posts", index: void 0, caseSensitive: void 0, module: "/build/routes/r/$roomId/ama/posts-HOMJ24QB.js", imports: ["/build/_shared/chunk-72SWFXXS.js", "/build/_shared/chunk-HDWQZ4RZ.js", "/build/_shared/chunk-PVRZC4XH.js", "/build/_shared/chunk-TNGW37ZS.js", "/build/_shared/chunk-3KZTUR4F.js", "/build/_shared/chunk-AUYLHJJM.js", "/build/_shared/chunk-YAG44XE3.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !0, hasErrorBoundary: !0 }, "routes/r/$roomId/index": { id: "routes/r/$roomId/index", parentId: "root", path: "r/:roomId", index: !0, caseSensitive: void 0, module: "/build/routes/r/$roomId/index-VWT5YQK5.js", imports: ["/build/_shared/chunk-KCATKJOD.js", "/build/_shared/chunk-HDWQZ4RZ.js", "/build/_shared/chunk-PVRZC4XH.js", "/build/_shared/chunk-3KZTUR4F.js", "/build/_shared/chunk-AUYLHJJM.js", "/build/_shared/chunk-YAG44XE3.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !0, hasErrorBoundary: !0 }, "routes/r/$roomId/poll/index": { id: "routes/r/$roomId/poll/index", parentId: "root", path: "r/:roomId/poll", index: !0, caseSensitive: void 0, module: "/build/routes/r/$roomId/poll/index-O3SH6PCO.js", imports: ["/build/_shared/chunk-HDWQZ4RZ.js", "/build/_shared/chunk-PVRZC4XH.js", "/build/_shared/chunk-3KZTUR4F.js", "/build/_shared/chunk-AUYLHJJM.js", "/build/_shared/chunk-YAG44XE3.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !0, hasErrorBoundary: !1 }, "routes/r/$roomId/poll/results": { id: "routes/r/$roomId/poll/results", parentId: "root", path: "r/:roomId/poll/results", index: void 0, caseSensitive: void 0, module: "/build/routes/r/$roomId/poll/results-MP6ZZIEZ.js", imports: ["/build/_shared/chunk-HDWQZ4RZ.js", "/build/_shared/chunk-PVRZC4XH.js", "/build/_shared/chunk-3KZTUR4F.js", "/build/_shared/chunk-AUYLHJJM.js", "/build/_shared/chunk-YAG44XE3.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !0, hasErrorBoundary: !1 }, "routes/r/$roomId/posts": { id: "routes/r/$roomId/posts", parentId: "root", path: "r/:roomId/posts", index: void 0, caseSensitive: void 0, module: "/build/routes/r/$roomId/posts-OSJZZZJR.js", imports: ["/build/_shared/chunk-PVNBUV4C.js", "/build/_shared/chunk-KCATKJOD.js", "/build/_shared/chunk-SB6Z5ZJC.js", "/build/_shared/chunk-72SWFXXS.js", "/build/_shared/chunk-HDWQZ4RZ.js", "/build/_shared/chunk-PVRZC4XH.js", "/build/_shared/chunk-TNGW37ZS.js", "/build/_shared/chunk-3KZTUR4F.js", "/build/_shared/chunk-AUYLHJJM.js", "/build/_shared/chunk-YAG44XE3.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !0, hasErrorBoundary: !0 }, "routes/r/share/$roomId": { id: "routes/r/share/$roomId", parentId: "root", path: "r/share/:roomId", index: void 0, caseSensitive: void 0, module: "/build/routes/r/share/$roomId-3ROP7Y73.js", imports: ["/build/_shared/chunk-PVNBUV4C.js", "/build/_shared/chunk-KCATKJOD.js", "/build/_shared/chunk-SB6Z5ZJC.js", "/build/_shared/chunk-PVRZC4XH.js", "/build/_shared/chunk-AUYLHJJM.js", "/build/_shared/chunk-YAG44XE3.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !0, hasErrorBoundary: !0 }, "routes/resources/manifest[.]webmanifest": { id: "routes/resources/manifest[.]webmanifest", parentId: "root", path: "resources/manifest.webmanifest", index: void 0, caseSensitive: void 0, module: "/build/routes/resources/manifest[.]webmanifest-FSITSSPI.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/resources/subscribe": { id: "routes/resources/subscribe", parentId: "root", path: "resources/subscribe", index: void 0, caseSensitive: void 0, module: "/build/routes/resources/subscribe-7EVCH6UB.js", imports: void 0, hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/unfurl": { id: "routes/unfurl", parentId: "root", path: "unfurl", index: void 0, caseSensitive: void 0, module: "/build/routes/unfurl-TNLOVCWX.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, url: "/build/manifest-9AED3CC8.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public/build", future = { v2_meta: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/resources/manifest[.]webmanifest": {
    id: "routes/resources/manifest[.]webmanifest",
    parentId: "root",
    path: "resources/manifest.webmanifest",
    index: void 0,
    caseSensitive: void 0,
    module: manifest_webmanifest_exports
  },
  "routes/r/$roomId/poll/results": {
    id: "routes/r/$roomId/poll/results",
    parentId: "root",
    path: "r/:roomId/poll/results",
    index: void 0,
    caseSensitive: void 0,
    module: results_exports
  },
  "routes/m/share/$confessionId": {
    id: "routes/m/share/$confessionId",
    parentId: "root",
    path: "m/share/:confessionId",
    index: void 0,
    caseSensitive: void 0,
    module: confessionId_exports
  },
  "routes/r/$roomId/poll/index": {
    id: "routes/r/$roomId/poll/index",
    parentId: "root",
    path: "r/:roomId/poll",
    index: !0,
    caseSensitive: void 0,
    module: poll_exports
  },
  "routes/m/ama/$confessionId": {
    id: "routes/m/ama/$confessionId",
    parentId: "root",
    path: "m/ama/:confessionId",
    index: void 0,
    caseSensitive: void 0,
    module: confessionId_exports2
  },
  "routes/r/$roomId/ama/posts": {
    id: "routes/r/$roomId/ama/posts",
    parentId: "root",
    path: "r/:roomId/ama/posts",
    index: void 0,
    caseSensitive: void 0,
    module: posts_exports
  },
  "routes/resources/subscribe": {
    id: "routes/resources/subscribe",
    parentId: "root",
    path: "resources/subscribe",
    index: void 0,
    caseSensitive: void 0,
    module: subscribe_exports
  },
  "routes/m/$confessionId": {
    id: "routes/m/$confessionId",
    parentId: "root",
    path: "m/:confessionId",
    index: void 0,
    caseSensitive: void 0,
    module: confessionId_exports3
  },
  "routes/r/$roomId/index": {
    id: "routes/r/$roomId/index",
    parentId: "root",
    path: "r/:roomId",
    index: !0,
    caseSensitive: void 0,
    module: roomId_exports
  },
  "routes/r/$roomId/posts": {
    id: "routes/r/$roomId/posts",
    parentId: "root",
    path: "r/:roomId/posts",
    index: void 0,
    caseSensitive: void 0,
    module: posts_exports2
  },
  "routes/r/share/$roomId": {
    id: "routes/r/share/$roomId",
    parentId: "root",
    path: "r/share/:roomId",
    index: void 0,
    caseSensitive: void 0,
    module: roomId_exports2
  },
  "routes/unfurl": {
    id: "routes/unfurl",
    parentId: "root",
    path: "unfurl",
    index: void 0,
    caseSensitive: void 0,
    module: unfurl_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: routes_exports
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  assetsBuildDirectory,
  entry,
  future,
  publicPath,
  routes
});
//# sourceMappingURL=index.js.map
