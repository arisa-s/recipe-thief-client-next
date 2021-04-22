import Header from "../header/header";
import { Grid } from "semantic-ui-react";
import AuthOnly from "../../components/auth-only/auth-only";
import { useSession } from "next-auth/client";
import { connect, useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../redux/actions/user";

function HomeLayout({ children }) {
  return (
    <Grid stackable verticalAlign="middle">
      <Grid.Column
        only="tablet computer"
        width={3}
        style={{ backgroundColor: "rgba(212, 206, 191, 1)" }}
      >
        <Header />
      </Grid.Column>

      {children}
    </Grid>
  );
}

const HomeLayoutProtected = ({ children }) => {
  return (
    <AuthOnly>
      <HomeLayout children={children} />
    </AuthOnly>
  );
};

export default HomeLayoutProtected;
