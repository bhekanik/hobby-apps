/* eslint-disable @typescript-eslint/no-var-requires */
// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require("@sentry/nextjs");

const dev = process.env.NODE_ENV === "development";
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: dev,
  mode: process.env.NODE_ENV,
});

const withTM = require("next-transpile-modules")([
  "types",
  "fixtures",
  "formatters",
  "utils",
]);

/**
 * @type {import('next').NextConfig}
 */
const moduleExports = {
  reactStrictMode: true,
  images: {
    domains: ["picsum.photos", "res.cloudinary.com"],
  },
  swcMinify: true,
};

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  authToken: process.env.SENTRY_AUTH_TOKEN,
  org: "dealbaseafrica",
  project: "dealbaseafrica",
  include: ".",
  ignore: ["node_modules", "next.config.js"],
  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports =
  process.env.NEXT_PUBLIC_DEPLOYMENT_ENV === "production"
    ? withTM(
        withPWA(withSentryConfig(moduleExports, sentryWebpackPluginOptions))
      )
    : withTM(withPWA(moduleExports));
