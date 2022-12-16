"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
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

// server.js
var server_exports = {};
__export(server_exports, {
  default: () => server_default
});
module.exports = __toCommonJS(server_exports);
var import_vercel = require("@remix-run/vercel");

// server-entry-module:@remix-run/dev/server-build
var server_build_exports = {};
__export(server_build_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  publicPath: () => publicPath,
  routes: () => routes
});

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_react = require("@remix-run/react"), import_server = require("react-dom/server"), import_jsx_runtime = require("react/jsx-runtime");
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let markup = (0, import_server.renderToString)(
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.RemixServer, {
      context: remixContext,
      url: request.url
    })
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
  loader: () => loader,
  meta: () => meta
});
var import_node2 = require("@remix-run/node"), import_react4 = require("@remix-run/react"), import_react5 = __toESM(require("react"));

// app/components/Header/index.tsx
var import_react3 = require("@remix-run/react");

// app/lib/config.ts
var config = {
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

// app/components/FormElements/Button/index.tsx
var import_classnames = __toESM(require("classnames")), import_react2 = require("react");

// app/lib/theme/colors.ts
var colors = {
  primary: "bg-blue",
  secondary: "bg-purple",
  accent: "bg-green"
}, colorsOnly = {
  primary: "blue",
  secondary: "purple",
  accent: "green"
};

// app/components/FormElements/Button/index.tsx
var import_jsx_runtime2 = require("react/jsx-runtime"), Button = (0, import_react2.forwardRef)(({ children, className, textColor, color = "primary", ...props }, ref) => {
  let btnClasses = (0, import_classnames.default)(
    "p-2 flex text-bold border-[1px] border-purple-400 justify-center rounded-full",
    `${colors[color]}-800`,
    `hover:${colors[color]}-500`,
    "hover:text-green-500",
    textColor ?? "text-white",
    className
  );
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", {
    ...props,
    ref,
    className: btnClasses,
    children
  });
});

// app/components/Header/index.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
function Header({ user }) {
  let navigate = (0, import_react3.useNavigate)(), handleLogout = () => {
    navigate("/login");
  };
  return user ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("header", {
    className: "border-b-[1px] border-purple-700 p-8 pb-2",
    children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", {
      className: "w-full relative flex items-center justify-around",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react3.Link, {
          to: "/",
          className: "cursor-pointer",
          children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h1", {
            className: "w-full mb-4 font-black text-5xl text-center font-heading",
            children: config.appName
          })
        }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react3.Form, {
          action: "/logout",
          method: "post",
          className: "flex items-center justify-center w-[fit-content] rounded-full absolute left-0",
          children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Button, {
            color: "secondary",
            type: "submit",
            onClick: handleLogout,
            className: "flex items-center justify-center w-[fit-content] px-4 rounded-full text-lg",
            children: "Logout"
          })
        })
      ]
    })
  }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("header", {
    className: "border-b-[1px] border-purple-700 p-8 pb-2",
    children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react3.Link, {
      to: "/",
      className: "cursor-pointer",
      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h1", {
        className: "w-full mb-4 font-black text-5xl text-center font-heading",
        children: config.appName
      })
    })
  });
}

// app/layouts/AppLayout/index.tsx
var import_jsx_runtime4 = require("react/jsx-runtime"), AppLayout = ({
  children,
  user
}) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", {
  className: "bg-purple-800 w-full relative text-purple-300 px-0 md:p-8 md:pt-0 pt-0 min-h-[100vh] h-full ",
  children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", {
    className: "flex p-0 flex-col max-w-4xl w-full mx-auto sticky top-8 bg-purple-800 border-r-[1px] border-l-[1px] border-purple-700 min-h-[100vh]",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Header, {
        user
      }),
      children
    ]
  })
});

// app/models/users.server..ts
var import_node = require("@remix-run/node"), import_bcryptjs = __toESM(require("bcryptjs"));

// app/types/User.tsx
var import_zod = require("zod"), userSchema = import_zod.z.object({
  id: import_zod.z.string().optional(),
  username: import_zod.z.string().min(5, { message: "Username must be 5 or more characters" }),
  password: import_zod.z.string().min(8, { message: "Password must be 8 or more characters long" }),
  firstname: import_zod.z.string(),
  lastname: import_zod.z.string(),
  gender: import_zod.z.enum(["male", "female"]),
  whatsapp_username: import_zod.z.string(),
  created_at: import_zod.z.date()
});

// app/xata.ts
var import_client = require("@xata.io/client"), tables = [
  {
    name: "users",
    columns: [
      {
        name: "created_at",
        type: "datetime",
        notNull: !0,
        defaultValue: "2022-12-15T18:22:26.899Z"
      },
      { name: "username", type: "string", unique: !0 },
      { name: "firstname", type: "string", notNull: !0, defaultValue: "" },
      { name: "lastname", type: "string", notNull: !0, defaultValue: "" },
      { name: "gender", type: "string", notNull: !0, defaultValue: "male" },
      {
        name: "whatsapp_username",
        type: "string",
        notNull: !0,
        defaultValue: ""
      },
      { name: "password", type: "string", notNull: !0, defaultValue: "" }
    ]
  },
  {
    name: "likes",
    columns: [
      { name: "from", type: "link", link: { table: "users" } },
      { name: "to", type: "link", link: { table: "users" } },
      {
        name: "created_at",
        type: "datetime",
        notNull: !0,
        defaultValue: "2022-12-15T19:17:38.917Z"
      }
    ]
  }
], DatabaseClient = (0, import_client.buildClient)(), defaultOptions = {
  databaseURL: "https://Bhekani-Khumalo-s-workspace-sem5mg.eu-west-1.xata.sh/db/matcher"
}, XataClient = class extends DatabaseClient {
  constructor(options) {
    super({ ...defaultOptions, ...options }, tables);
  }
}, instance, getXataClient = () => instance || (instance = new XataClient(), instance);

// app/models/users.server..ts
var xata = getXataClient(), getUser = async (userId) => await xata.db.users.read(userId), getAllUsers = async () => await xata.db.users.sort("created_at", "desc").getMany(), login = async (username, password) => {
  try {
    let user = await xata.db.users.filter({
      username
    }).getFirst();
    if (!user)
      return null;
    let { password: passwordHash, ...returnUser } = user;
    return await import_bcryptjs.default.compare(password, passwordHash) ? returnUser : null;
  } catch (error) {
    throw error;
  }
}, sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret)
  throw new Error("SESSION_SECRET must be set");
var storage = (0, import_node.createCookieSessionStorage)({
  cookie: {
    name: "matcher_session",
    secure: !0,
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: !0
  }
});
function getUserSession(request) {
  return storage.getSession(request.headers.get("Cookie"));
}
async function getUserId(request) {
  let userId = (await getUserSession(request)).get("userId");
  return !userId || typeof userId != "string" ? null : userId;
}
async function requireUserId(request, redirectTo = new URL(request.url).pathname) {
  let userId = (await getUserSession(request)).get("userId");
  if (!userId || typeof userId != "string") {
    let searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw (0, import_node.redirect)(`/login?${searchParams}`);
  }
  return userId;
}
async function getCurrentUser(request) {
  let userId = await getUserId(request);
  if (typeof userId != "string")
    return null;
  try {
    return await xata.db.users.filter({
      id: userId
    });
  } catch {
    throw logout(request);
  }
}
async function logout(request) {
  let session = await getUserSession(request);
  return (0, import_node.redirect)("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session)
    }
  });
}
async function createUserSession(userId, redirectTo) {
  let session = await storage.getSession();
  return session.set("userId", userId), (0, import_node.redirect)(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session)
    }
  });
}
var register = async (newUser) => {
  try {
    let { password, ...remainingUser } = newUser, passwordHash = await import_bcryptjs.default.hash(password, 10), user = {
      ...remainingUser,
      password: passwordHash,
      created_at: new Date()
    };
    userSchema.parse(user);
    let createdUser = await xata.db.users.create(user);
    return {
      id: createdUser.id,
      username: createdUser.username,
      firstname: createdUser.firstname,
      lastname: createdUser.lastname,
      gender: createdUser.gender,
      whatsapp_username: createdUser.whatsapp_username,
      created_at: createdUser.created_at
    };
  } catch (error) {
    throw error;
  }
};

// app/styles/app.css
var app_default = "/build/_assets/app-EHMFZVNM.css";

// app/root.tsx
var import_jsx_runtime5 = require("react/jsx-runtime"), isMount = !0, links = () => [
  { rel: "manifest", href: "/resources/manifest.webmanifest" },
  { rel: "stylesheet", href: app_default },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossorigin: "true"
  },
  {
    href: "https://fonts.googleapis.com/css2?family=Rubik+Vinyl&display=swap",
    rel: "stylesheet"
  }
], meta = () => ({
  charset: "utf-8",
  "og:type": "website",
  "og:site_name": config.appName,
  "twitter:creator": "@bhekanik",
  "twitter:card": "summary_large_image",
  viewport: "width=device-width,initial-scale=1"
}), loader = async ({ request }) => {
  let user = await getCurrentUser(request);
  return (0, import_node2.json)({
    user
  });
};
function App() {
  let location = (0, import_react4.useLocation)(), matches = (0, import_react4.useMatches)(), { user } = (0, import_react4.useLoaderData)();
  return import_react5.default.useEffect(() => {
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
  }, [location]), /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("html", {
    lang: "en",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("head", {
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_react4.Meta, {}),
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_react4.Links, {})
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("body", {
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(AppLayout, {
            user,
            children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_react4.Outlet, {})
          }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_react4.ScrollRestoration, {}),
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_react4.Scripts, {}),
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_react4.LiveReload, {})
        ]
      })
    ]
  });
}
function ErrorBoundary({ error }) {
  return console.error(error), /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(AppLayout, {
    children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", {
      className: "flex flex-col gap-4 w-full max-w-4xl mx-auto z-10",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", {
          children: [
            "An unexpected error occurred: ",
            error.message
          ]
        }),
        ";"
      ]
    })
  });
}
function CatchBoundary() {
  let caught = (0, import_react4.useCatch)();
  if (caught.status === 404)
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", {
      children: "Not found"
    });
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

// app/routes/resources/manifest[.]webmanifest.ts
var manifest_webmanifest_exports = {};
__export(manifest_webmanifest_exports, {
  loader: () => loader2
});
var import_node3 = require("@remix-run/node"), loader2 = () => (0, import_node3.json)(
  {
    short_name: "PWA",
    name: "Remix PWA",
    start_url: "/",
    display: "standalone",
    background_color: "#d3d7dd",
    theme_color: "#c34138",
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

// app/routes/resources/subscribe.ts
var subscribe_exports = {};
__export(subscribe_exports, {
  action: () => action,
  loader: () => loader3
});

// app/utils/server/pwa-utils.server.ts
var storage2 = require("node-persist"), webPush = require("web-push");
async function SaveSubscription(sub) {
  await storage2.init(), await storage2.setItem("subscription", sub);
}

// app/routes/resources/subscribe.ts
var webPush2 = require("web-push"), action = async ({ request }) => {
  let subscription = (await request.json()).subscription;
  return SaveSubscription(subscription), { message: "Done" };
}, loader3 = async () => {
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

// app/routes/app/$userId.tsx
var userId_exports = {};
__export(userId_exports, {
  CatchBoundary: () => CatchBoundary2,
  ErrorBoundary: () => ErrorBoundary2,
  action: () => action2,
  default: () => Index,
  loader: () => loader4
});
var import_node5 = require("@remix-run/node"), import_react6 = require("@remix-run/react"), import_react7 = require("react"), import_tiny_invariant = __toESM(require("tiny-invariant"));

// app/lib/badRequest.tsx
var import_node4 = require("@remix-run/node"), badRequest = (data) => (0, import_node4.json)(data, { status: 400 });

// app/types/Like.tsx
var import_zod2 = require("zod");
var likeBase = {
  id: import_zod2.z.string().optional(),
  created_at: import_zod2.z.date()
}, likeSchema = import_zod2.z.object({
  ...likeBase,
  from: import_zod2.z.string(),
  to: import_zod2.z.string()
}), likeWithUsersSchema = import_zod2.z.object({
  ...likeBase,
  from: userSchema,
  to: userSchema
});

// app/models/likes.server..ts
var xata2 = getXataClient();
var getLikesByToOrFrom = async (options) => {
  let filter = {};
  return options.to && (filter.to = options.to), options.from && (filter.from = options.from), await xata2.db.likes.select(["*", "to.*", "from.*"]).filter(filter).getMany();
}, createLikes = async (newLikes) => {
  let likes = newLikes.map((newLike) => {
    let like = {
      ...newLike,
      created_at: new Date()
    };
    return likeSchema.parse(like), like;
  });
  return await xata2.db.likes.create(likes);
};

// app/routes/app/$userId.tsx
var import_jsx_runtime6 = require("react/jsx-runtime"), loader4 = async ({ params, request }) => {
  (0, import_tiny_invariant.default)(params.userId), await requireUserId(request);
  let users = await getAllUsers(), currentUser = await getUser(params.userId), likes = currentUser != null && currentUser.id ? await getLikesByToOrFrom({ from: currentUser.id }) : [];
  return {
    likedBy: currentUser != null && currentUser.id ? await getLikesByToOrFrom({ to: currentUser.id }) : [],
    likes,
    users,
    currentUser
  };
}, action2 = async ({ request, ...rest }) => {
  var _a;
  try {
    let userId = await requireUserId(request), formData = await request.formData(), { from, ...likesObject } = Object.fromEntries(formData), likes = Object.values(likesObject).map((like) => ({
      to: like,
      from: userId
    })), result = await createLikes(likes);
    return (0, import_node5.json)(result);
  } catch (error) {
    return console.log("error:", error), badRequest({
      formError: ((_a = error.issues) == null ? void 0 : _a.reduce(
        (acc, issue) => `${acc} ${issue.message}`.trim(),
        ""
      )) ?? "Something went wrong."
    });
  }
};
function Index() {
  let { users, currentUser, likes, likedBy } = (0, import_react6.useLoaderData)(), [genderFilteredUsers, setGenderFilteredUsers] = (0, import_react7.useState)([]), [likesMap, setLikesMap] = (0, import_react7.useState)(
    {}
  );
  console.log("likesMap:", likesMap);
  let [likedByMap, setLikedByMap] = (0, import_react7.useState)({});
  return console.log("likedByMap:", likedByMap), (0, import_react7.useEffect)(() => {
    if (likes) {
      let map = likes.reduce(
        (acc, like) => (acc[like.to.id] = like.to, acc),
        {}
      );
      setLikesMap(map);
    }
  }, [likes]), (0, import_react7.useEffect)(() => {
    if (likedBy) {
      let map = likedBy.reduce(
        (acc, like) => (acc[like.from.id] = like.from, acc),
        {}
      );
      setLikedByMap(map);
    }
  }, [likedBy]), (0, import_react7.useEffect)(() => {
    users && setGenderFilteredUsers(
      users.filter((user) => user.gender !== currentUser.gender).filter((user) => !Boolean(likesMap[user.id]))
    );
  }, [likesMap, users]), /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", {
    className: "p-8 flex flex-col items-center gap-4 mx-8",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("h1", {
        children: [
          "Welcome to ",
          config.appName,
          ", ",
          currentUser.firstname
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", {
        children: "The matcher concept is simple, just select the people you might fancy and want to get to know a little more from the list below and click submit. If they also like you, you'll both be notified. If not then nothing will happen. This will save you from shooting your shot where you're not wanted."
      }),
      likes.length ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", {
        className: "flex flex-col gap-4 w-full",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h2", {
            className: "text-xl font-bold",
            children: "Here are the people you've liked:"
          }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("ul", {
            className: "flex flex-col gap-4",
            children: likes == null ? void 0 : likes.map((like) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("li", {
              className: "flex gap-4",
              children: `- ${like.to.firstname} ${like.to.lastname} (${like.to.whatsapp_username}) ${likedByMap[like.to.id] ? "- MATCHED \u{1F389}. Why don't you slide into their DMS and say hi." : ""}`
            }, like.id))
          })
        ]
      }) : null,
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", {
        className: "flex flex-col gap-4 w-full",
        children: [
          genderFilteredUsers.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", {
            children: [
              "Looks like there are no",
              " ",
              currentUser.gender === "male" ? "female" : "male",
              "s who have registered yet. Share the link to get people to register."
            ]
          }),
          genderFilteredUsers.length ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, {
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h2", {
                className: "text-xl font-bold",
                children: "Here are the people you have not liked"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_react6.Form, {
                method: "post",
                className: "flex flex-col gap-4",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("ul", {
                    className: "flex flex-col gap-4",
                    children: genderFilteredUsers.map((user) => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("li", {
                      className: "flex gap-4",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("input", {
                          type: "checkbox",
                          id: user.username,
                          name: user.username,
                          className: "accent-purple-800",
                          value: user.id
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("label", {
                          htmlFor: user.username,
                          children: `${user.firstname} ${user.lastname} (${user.whatsapp_username})`
                        })
                      ]
                    }, user.id))
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Button, {
                    type: "submit",
                    className: "w-full",
                    children: "Submit"
                  })
                ]
              })
            ]
          }) : null
        ]
      })
    ]
  });
}
function ErrorBoundary2({ error }) {
  return console.error(error), /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(AppLayout, {
    children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", {
      className: "flex flex-col gap-4 w-full max-w-4xl mx-auto z-10",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", {
          children: [
            "An unexpected error occurred: ",
            error.message
          ]
        }),
        ";"
      ]
    })
  });
}
function CatchBoundary2() {
  let caught = (0, import_react6.useCatch)();
  if (caught.status === 404)
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", {
      children: "Not found"
    });
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

// app/routes/logout.tsx
var logout_exports = {};
__export(logout_exports, {
  CatchBoundary: () => CatchBoundary3,
  ErrorBoundary: () => ErrorBoundary3,
  action: () => action3,
  loader: () => loader5
});
var import_node6 = require("@remix-run/node"), import_react8 = require("@remix-run/react");
var import_jsx_runtime7 = require("react/jsx-runtime"), action3 = async ({ request }) => logout(request), loader5 = async () => (0, import_node6.redirect)("/");
function ErrorBoundary3({ error }) {
  return console.error(error), /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(AppLayout, {
    children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", {
      className: "flex flex-col gap-4 w-full max-w-4xl mx-auto z-10",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", {
          children: [
            "An unexpected error occurred: ",
            error.message
          ]
        }),
        ";"
      ]
    })
  });
}
function CatchBoundary3() {
  let caught = (0, import_react8.useCatch)();
  if (caught.status === 404)
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", {
      children: "Not found"
    });
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

// app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  CatchBoundary: () => CatchBoundary4,
  ErrorBoundary: () => ErrorBoundary4,
  action: () => action4,
  default: () => Index2
});
var import_react10 = require("@remix-run/react"), import_react11 = require("react");

// app/components/FormElements/Input/index.tsx
var import_classnames2 = __toESM(require("classnames")), import_react9 = require("react"), import_jsx_runtime8 = require("react/jsx-runtime"), Input = (0, import_react9.forwardRef)(({ children, className, color = "primary", ...props }, ref) => {
  let inputClasses = (0, import_classnames2.default)(
    "p-2 px-6 w-full bg-purple-700 rounded-full",
    className
  );
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("input", {
    ...props,
    ref,
    className: inputClasses
  });
});

// app/routes/index.tsx
var import_jsx_runtime9 = require("react/jsx-runtime"), action4 = async ({ request }) => {
  var _a;
  try {
    let formData = await request.formData(), {
      username: username_form_value,
      password: password_form_value,
      confirm_password: confirm_password_form_value,
      firstname: firstname_form_value,
      gender: gender_form_value,
      lastname: lastname_form_value,
      whatsapp_username: whatsapp_username_form_value
    } = Object.fromEntries(formData), password = password_form_value.trim(), confirm_password = confirm_password_form_value.trim();
    if (password !== confirm_password)
      return badRequest({
        formError: "Passwords don't match.",
        fields: [
          { name: "password", content: "Passwords do not match" },
          { name: "confirm_password", content: "Passwords do not match" }
        ]
      });
    let username = username_form_value.trim().toLowerCase(), firstname = firstname_form_value.trim(), lastname = lastname_form_value.trim(), gender = gender_form_value.trim(), whatsapp_username = whatsapp_username_form_value.trim(), user = await register({
      username,
      password,
      firstname,
      gender,
      lastname,
      whatsapp_username
    });
    return user ? createUserSession(user.id, `/app/${user.id}`) : badRequest({
      formError: "Something went wrong trying to create a new user."
    });
  } catch (error) {
    return console.log("error:", error), badRequest({
      formError: ((_a = error.issues) == null ? void 0 : _a.reduce(
        (acc, issue) => `${acc} ${issue.message}`.trim(),
        ""
      )) ?? "Something went wrong."
    });
  }
};
function Index2() {
  let actionData = (0, import_react10.useActionData)(), [error, setError] = (0, import_react11.useState)("");
  return (0, import_react11.useEffect)(() => {
    actionData != null && actionData.formError && setError(actionData.formError);
  }, [actionData]), /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", {
    className: "p-8 flex flex-col items-center gap-4 mx-8",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("h1", {
        children: [
          "Welcome to ",
          config.appName
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("h2", {
        children: "Register to start"
      }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_react10.Form, {
        className: "flex flex-col gap-4 items-center w-full md:px-12",
        method: "post",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Input, {
            required: !0,
            placeholder: "Username",
            name: "username",
            className: "text-center"
          }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("fieldset", {
            className: "flex flex-col md:flex-row gap-4 w-full",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Input, {
                required: !0,
                placeholder: "First Name",
                name: "firstname",
                className: "text-center"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Input, {
                required: !0,
                placeholder: "Last Name",
                name: "lastname",
                className: "text-center"
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("fieldset", {
            className: "flex md:flex-row flex-col gap-4 w-full",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Input, {
                required: !0,
                placeholder: "Whatsapp Username",
                name: "whatsapp_username",
                className: "text-center w-full"
              }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", {
                className: "flex flex-row gap-2 justify-center items-center",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("label", {
                    className: "flex flex-row gap-2 justify-center items-center",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("input", {
                        type: "radio",
                        name: "gender",
                        value: "male",
                        defaultChecked: !0,
                        className: "accent-purple-800"
                      }),
                      "Male"
                    ]
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("label", {
                    className: "flex flex-row gap-2 justify-center items-center",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("input", {
                        type: "radio",
                        name: "gender",
                        value: "female",
                        className: "accent-purple-800"
                      }),
                      "Female"
                    ]
                  })
                ]
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Input, {
            required: !0,
            type: "password",
            placeholder: "Password",
            name: "password",
            className: "text-center"
          }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Input, {
            required: !0,
            type: "password",
            placeholder: "Confirm Password",
            name: "confirm_password",
            className: "text-center"
          }),
          error && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", {
            className: "text-red-500 bg-red-700 bg-opacity-20 px-8 w-full text-center py-2 rounded-full",
            children: error
          }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Button, {
            type: "submit",
            className: "px-4 w-full",
            children: "Register"
          }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", {
            children: "Already have an account?"
          }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_react10.Link, {
            to: "/login",
            className: `text-${colorsOnly.accent}-500 px-4 w-full text-center underline`,
            children: "Login"
          })
        ]
      })
    ]
  });
}
function ErrorBoundary4({ error }) {
  return console.error(error), /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(AppLayout, {
    children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", {
      className: "flex flex-col gap-4 w-full max-w-4xl mx-auto z-10",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", {
          children: [
            "An unexpected error occurred: ",
            error.message
          ]
        }),
        ";"
      ]
    })
  });
}
function CatchBoundary4() {
  let caught = (0, import_react10.useCatch)();
  if (caught.status === 404)
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", {
      children: "Not found"
    });
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

// app/routes/login.tsx
var login_exports = {};
__export(login_exports, {
  CatchBoundary: () => CatchBoundary5,
  ErrorBoundary: () => ErrorBoundary5,
  action: () => action5,
  default: () => Index3
});
var import_react12 = require("@remix-run/react"), import_react13 = require("react");
var import_jsx_runtime10 = require("react/jsx-runtime"), action5 = async ({ request }) => {
  var _a;
  try {
    let formData = await request.formData(), { username: username_form_value, password: password_form_value } = Object.fromEntries(formData), username = username_form_value.trim().toLowerCase(), password = password_form_value.trim(), user = await login(username, password);
    if (!user)
      return badRequest({
        formError: "Username/Password combination is incorrect"
      });
    if (user != null && user.id)
      return createUserSession(user.id, `/app/${user.id}`);
    throw new Error("Something went wrong. Please try again.");
  } catch (error) {
    return badRequest({
      formError: ((_a = error.issues) == null ? void 0 : _a.reduce(
        (acc, issue) => `${acc} ${issue.message}`.trim(),
        ""
      )) ?? "Something went wrong."
    });
  }
};
function Index3() {
  let actionData = (0, import_react12.useActionData)(), [error, setError] = (0, import_react13.useState)("");
  return (0, import_react13.useEffect)(() => {
    actionData != null && actionData.formError && setError(actionData.formError);
  }, [actionData]), /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", {
    className: "p-8 flex flex-col items-center gap-4 mx-8",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("h1", {
        children: [
          "Welcome to ",
          config.appName
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("h2", {
        children: "Login to start"
      }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(import_react12.Form, {
        className: "flex flex-col gap-4 items-center w-full px-12",
        method: "post",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Input, {
            required: !0,
            placeholder: "Username",
            name: "username",
            className: "text-center"
          }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Input, {
            type: "password",
            placeholder: "Password",
            name: "password",
            className: "text-center"
          }),
          error && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", {
            className: "text-red-500 bg-red-700 bg-opacity-20 px-8 w-full text-center py-2 rounded-full",
            children: error
          }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Button, {
            type: "submit",
            className: "px-4 w-full",
            children: "Login"
          }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", {
            children: "Don't have an account?"
          }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_react12.Link, {
            to: "/",
            className: "px-4 w-full text-center underline",
            children: "Register"
          })
        ]
      })
    ]
  });
}
function ErrorBoundary5({ error }) {
  return console.error(error), /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(AppLayout, {
    children: /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", {
      className: "flex flex-col gap-4 w-full max-w-4xl mx-auto z-10",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", {
          children: [
            "An unexpected error occurred: ",
            error.message
          ]
        }),
        ";"
      ]
    })
  });
}
function CatchBoundary5() {
  let caught = (0, import_react12.useCatch)();
  if (caught.status === 404)
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", {
      children: "Not found"
    });
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { version: "1d1e783a", entry: { module: "/build/entry.client-FZ6NF3LX.js", imports: ["/build/_shared/chunk-3Q74EVIB.js", "/build/_shared/chunk-Q3IECNXJ.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-U62WZIS4.js", imports: ["/build/_shared/chunk-B5FBTH6A.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !0, hasErrorBoundary: !0 }, "routes/app/$userId": { id: "routes/app/$userId", parentId: "root", path: "app/:userId", index: void 0, caseSensitive: void 0, module: "/build/routes/app/$userId-2NP2YLQ7.js", imports: void 0, hasAction: !0, hasLoader: !0, hasCatchBoundary: !0, hasErrorBoundary: !0 }, "routes/index": { id: "routes/index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/index-CTQERU5V.js", imports: ["/build/_shared/chunk-W5UJCLXC.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !0, hasErrorBoundary: !0 }, "routes/login": { id: "routes/login", parentId: "root", path: "login", index: void 0, caseSensitive: void 0, module: "/build/routes/login-QT3Q7U7M.js", imports: ["/build/_shared/chunk-W5UJCLXC.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !0, hasErrorBoundary: !0 }, "routes/logout": { id: "routes/logout", parentId: "root", path: "logout", index: void 0, caseSensitive: void 0, module: "/build/routes/logout-IZG7GJDG.js", imports: void 0, hasAction: !0, hasLoader: !0, hasCatchBoundary: !0, hasErrorBoundary: !0 }, "routes/resources/manifest[.]webmanifest": { id: "routes/resources/manifest[.]webmanifest", parentId: "root", path: "resources/manifest.webmanifest", index: void 0, caseSensitive: void 0, module: "/build/routes/resources/manifest[.]webmanifest-2WEMLEIN.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/resources/subscribe": { id: "routes/resources/subscribe", parentId: "root", path: "resources/subscribe", index: void 0, caseSensitive: void 0, module: "/build/routes/resources/subscribe-4YHTISHU.js", imports: void 0, hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, url: "/build/manifest-1D1E783A.js" };

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
  "routes/resources/subscribe": {
    id: "routes/resources/subscribe",
    parentId: "root",
    path: "resources/subscribe",
    index: void 0,
    caseSensitive: void 0,
    module: subscribe_exports
  },
  "routes/app/$userId": {
    id: "routes/app/$userId",
    parentId: "root",
    path: "app/:userId",
    index: void 0,
    caseSensitive: void 0,
    module: userId_exports
  },
  "routes/logout": {
    id: "routes/logout",
    parentId: "root",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: logout_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: routes_exports
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: login_exports
  }
};

// server.js
var server_default = (0, import_vercel.createRequestHandler)({ build: server_build_exports, mode: "production" });
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
