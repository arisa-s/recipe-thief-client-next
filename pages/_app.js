import "../styles/globals.css";
import "fomantic-ui-css/semantic.css";
import React from "react";
import { wrapper } from "../redux/store";
import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
