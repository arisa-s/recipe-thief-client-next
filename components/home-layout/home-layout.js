import Header from "../header/header";
import { Grid } from "semantic-ui-react";
import AuthOnly from "../../components/auth-only/auth-only";
import styles from "./layout.module.css";

function HomeLayout({ children }) {
  return (
    <Grid stackable="true" className={styles.container}>
      <Grid.Column
        only="tablet computer"
        width={3}
        className={styles.container}
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
