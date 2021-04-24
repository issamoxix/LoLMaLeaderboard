import { useEffect } from "react";
import "../styles/globals.css";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init("1439439406396220");
        ReactPixel.pageView();
        ReactPixel.track({ test_event_code: "TEST9005" });
        router.events.on("routeChangeComplete", () => {
          ReactPixel.pageView();
        });
      });
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
