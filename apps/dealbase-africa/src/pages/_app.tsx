import { Auth0Provider } from "@auth0/auth0-react";
import { ChakraProvider } from "@chakra-ui/react";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import LogRocket from "logrocket";
import { AppProps } from "next/app";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import { useEffect } from "react";
import { registerPlugin } from "react-filepond";
import { QueryClient, QueryClientProvider } from "react-query";
import "rsuite/dist/rsuite.min.css";
import { FeatureFlagsProvider } from "src/contexts/FeatureFlags";
import { isProd } from "src/lib/config";
import * as ga from "src/lib/googleAnalytics";
import { theme } from "src/lib/theme";
import "../styles/globals.css";

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    if (isProd) {
      const handleRouteChange = (url: string) => {
        ga.pageview(url);
      };
      //When the component is mounted, subscribe to router changes
      //and log those page views
      router.events.on("routeChangeComplete", handleRouteChange);

      // If the component is unmounted, unsubscribe
      // from the event with the `off` method
      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }
  }, [router.events]);

  useEffect(() => {
    if (isProd) {
      LogRocket.init("vuhczp/dealbaseafrica");
    }
  }, []);

  return (
    <FeatureFlagsProvider
      defaultEnvironment={process.env.NODE_ENV}
      development={{
        analytics: false,
        data: false,
        compare: true,
        investors: false,
      }}
      release={{
        analytics: false,
        data: false,
        compare: true,
        investors: false,
      }}
      applyDevTools={typeof window !== "undefined" ? window : {}}
    >
      <Auth0Provider
        domain="dealbase-africa.eu.auth0.com"
        clientId="Wr3csihWUImJWVQ5IkPz1YYjVK5mlFv7"
        audience="https://dealbase/api"
        redirectUri={
          typeof window !== "undefined" ? window.location.origin : ""
        }
      >
        <ChakraProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <Head>
              <meta name="theme-color" content="#31A078" />
              <meta name="application-name" content="dealbase.africa" />
              <meta name="apple-mobile-web-app-capable" content="yes" />
              <meta
                name="apple-mobile-web-app-status-bar-style"
                content="default"
              />
              <meta
                httpEquiv="Content-Type"
                content="text/html; charset=utf-8"
              />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
              <meta
                name="apple-mobile-web-app-title"
                content="dealbase.africa"
              />
              <meta name="format-detection" content="telephone=no" />
              <meta name="mobile-web-app-capable" content="yes" />
              <meta name="msapplication-TileColor" content="#31A078" />
              <meta name="msapplication-tap-highlight" content="no" />
            </Head>
            <Component {...pageProps} />
          </QueryClientProvider>
        </ChakraProvider>
      </Auth0Provider>
    </FeatureFlagsProvider>
  );
};

export default MyApp;
