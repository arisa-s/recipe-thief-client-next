import React from "react";
import { connect } from "react-redux";
import HomeLayoutProtected from "../../components/home-layout/home-layout";
import ComingSoon from "../../components/coming-soon/coming-soon";

function Collection() {
  return <ComingSoon />;
}

Collection.Layout = HomeLayoutProtected;

export default connect()(Collection);
