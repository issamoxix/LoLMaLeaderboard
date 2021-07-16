import { useEffect } from "react";
import { useRouter } from "next/router";
import "../styles/globals.css";
import { PIXEL_ID } from "../Dataenv";
import * as gtag from "../lib/gtag";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  useEffect(() => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init(PIXEL_ID);
        ReactPixel.pageView();
        router.events.on("routeChangeComplete", () => {
          ReactPixel.pageView();
        });
      });
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
