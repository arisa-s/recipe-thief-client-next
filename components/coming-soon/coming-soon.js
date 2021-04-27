import React from "react";
import styles from "./coming-soon.module.css";
import { Grid, Image, Container } from "semantic-ui-react";

function ComingSoon() {
  return (
    <Grid.Column
      mobile={16}
      tablet={13}
      computer={13}
      className={styles.container}
    >
      <Container verticalAlign="middle">
        <Image
          src="/cooking.png"
          centered="true"
          size="medium"
          verticalAlign="middle"
        />
        <h1 textAlign="center" className={styles.text}>
          {" "}
          Coming Soon!
        </h1>
      </Container>
    </Grid.Column>
  );
}

export default ComingSoon;
