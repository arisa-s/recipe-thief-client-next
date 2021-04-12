import "../styles/globals.css";
import "fomantic-ui-css/semantic.css";
import React from "react";
import { wrapper } from "../redux/store";

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />;

export default wrapper.withRedux(MyApp);
