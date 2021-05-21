import { useSession } from "next-auth/client";
import React from "react";
import Home from "./../../pages/index";
import { connect, useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/actions/user";
import { Loader } from "semantic-ui-react";
import styles from "./auth-only.module.css";

const AuthOnly = (props) => {
  const { children } = props;
  const [session, loading] = useSession();
  const dispatch = useDispatch();

  if (loading) {
    return (
      <div>
        <Loader
          active
          inline="centered"
          size="huge"
          content="Loading..."
          className={styles.loader}
        />
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
