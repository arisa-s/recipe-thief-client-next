import React, { createRef } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/client";
import { connect, useDispatch, useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import AuthOnly from "./../components/auth-only/auth-only";
import Gallery from "./../components/gallery/gallery";
import Header from "./../components/header/header";

const UserHome = () => {
  const [session, loading] = useSession();

  return (
    <Grid columns={2}>
      <Grid.Column
        only="tablet computer large Screen"
        width={3}
        style={{ backgroundColor: "rgba(212, 206, 191, 1)" }}
      >
        <Header />
      </Grid.Column>

      <Grid.Column
        mobile={16}
        tablet={13}
        computer={13}
        style={{ backgroundColor: "rgba(212, 206, 191, 1)", height: "100%" }}
      >
        <Gallery email={session.user.email} />
      </Grid.Column>
    </Grid>
  );
};

const UserHomeProtector = () => {
  return (
    <AuthOnly>
      <UserHome />
    </AuthOnly>
  );
};

export default connect()(UserHomeProtector);
