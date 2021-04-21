import "../styles/globals.css";
import "fomantic-ui-css/semantic.css";
import React from "react";
import { wrapper } from "../redux/store";
import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout || EmptyLayout;
  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

const EmptyLayout = ({ children }) => <>{children}</>;

export default wrapper.withRedux(MyApp);
