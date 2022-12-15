// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn:
    SENTRY_DSN ||
    "https://089ac8baa36440a993d010519159d925@o1198116.ingest.sentry.io/6320724",
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0,
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
  // tunnel: `${
  //   process.env.NEXT_PUBLIC_DEPLOYMENT_ENV === "development"
  //     ? "http://localhost:5100"
  //     : process.env.NEXT_PUBLIC_DEPLOYMENT_ENV === "production"
  //     ? "https://dealbase.africa"
  //     : "https://dealbase-africa.vercel.app"
  // }/api/tunnel`,
});
