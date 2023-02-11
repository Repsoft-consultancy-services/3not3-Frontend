import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import reducer, { initialState } from "../Context/reducer";
import { StateProvider } from "../Context/StateProvider";
import "../styles/globals.css";
import "../styles/brackets-viewer.min.css";
import Router from "next/router";
import { Loader } from "../components/Loader";
import { Circles } from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  // useEffect(() => {
  //   axiosInit();
  // }, [])
  return (
    <>
      {loading ? (
        <>
          <div>
            <center>
              <Loader />
            </center>
          </div>
        </>
      ) : (
        <StateProvider initialState={initialState} reducer={reducer}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </StateProvider>
      )}
    </>
  );
}

export default MyApp;
