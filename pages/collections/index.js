import React from "react";
import { connect } from "react-redux";

import HomeLayoutProtected from "../../components/home-layout/home-layout";

function Collection() {
  return <h1>Coming soon!</h1>;
}

Collection.Layout = HomeLayoutProtected;

export default connect()(Collection);
