import { useEffect } from "react";
import { useRouter } from "next/router";
import "../styles/globals.css";
import { PIXEL_ID } from "../Dataenv";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
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
