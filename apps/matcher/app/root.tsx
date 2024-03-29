import {
  json,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
  useLocation,
  useMatches,
} from "@remix-run/react";
import React from "react";
import { AppLayout } from "./layouts/AppLayout";
import { config } from "./lib/config";
import { getCurrentUser } from "./models/users.server.";
import styles from "./styles/app.css";
let isMount = true;

export const links: LinksFunction = () => {
  return [
    { rel: "manifest", href: "/resources/manifest.webmanifest" },
    { rel: "stylesheet", href: styles },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossorigin: "true",
    },
    {
      href: "https://fonts.googleapis.com/css2?family=Rubik+Vinyl&display=swap",
      rel: "stylesheet",
    },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  "og:type": "website",
  "og:site_name": config.appName,
  "twitter:creator": "@bhekanik",
  "twitter:card": "summary_large_image",
  viewport: "width=device-width,initial-scale=1",
});

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getCurrentUser(request);

  return json({
    user,
  });
};

export default function App() {
  let location = useLocation();
  let matches = useMatches();
  const { user } = useLoaderData();

  React.useEffect(() => {
    let mounted = isMount;
    isMount = false;
    if ("serviceWorker" in navigator) {
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller?.postMessage({
          type: "REMIX_NAVIGATION",
          isMount: mounted,
          location,
          matches,
          manifest: window.__remixManifest,
        });
      } else {
        let listener = async () => {
          await navigator.serviceWorker.ready;
          navigator.serviceWorker.controller?.postMessage({
            type: "REMIX_NAVIGATION",
            isMount: mounted,
            location,
            matches,
            manifest: window.__remixManifest,
          });
        };
        navigator.serviceWorker.addEventListener("controllerchange", listener);
        return () => {
          navigator.serviceWorker.removeEventListener(
            "controllerchange",
            listener
          );
        };
      }
    }
  }, [location]);

  return (
    <html lang="en">
      <head>
        <Meta /> <Links />
      </head>
      <body>
        <AppLayout user={user}>
          <Outlet />
        </AppLayout>
        <ScrollRestoration /> <Scripts /> <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return (
    <AppLayout>
      <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto z-10">
        <div>An unexpected error occurred: {error.message}</div>;
      </div>
    </AppLayout>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
