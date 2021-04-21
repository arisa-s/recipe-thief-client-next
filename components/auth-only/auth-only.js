import { useSession } from "next-auth/client";
import React from "react";
import Home from "./../../pages/index";
import { connect, useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../redux/actions/user";

const AuthOnly = (props) => {
  const { children } = props;
  const [session, loading] = useSession();
  const dispatch = useDispatch();

  if (loading) {
    return (
      <div
        style={{
          fontSize: 200,
        }}
      >
        Bruh
      </div>
    );
  }

  if (!session) {
    return <Home />;
  }

  dispatch(setCurrentUser(session.user));
  return children;
};

export default connect()(AuthOnly);
