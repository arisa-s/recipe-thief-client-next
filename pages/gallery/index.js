import React from "react";
import { getRecipes } from "../api/recipe";
import { connect, useDispatch, useSelector } from "react-redux";
import RecipeCard from "../../components/recipe-card/recipe-card";
import { Grid, Icon, Container, Image } from "semantic-ui-react";
import HomeLayoutProtected from "../../components/home-layout/home-layout";
import styles from "./gallery.module.css";
import Link from "next/link";

function Gallery() {
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);
  const dispatch = useDispatch();
  React.useEffect(() => {
    getRecipes(user.email, dispatch);
  }, []);
  const recipes = useSelector((state) => state.recipe.saved);
  console.log(recipes);

  return (
    <Grid.Column
      mobile={16}
      tablet={13}
      computer={13}
      className={styles.container}
    >
      <Grid columns={3} doubling stackable>
        {recipes.length && (
          <>
            {recipes.map((recipe) => (
              <Grid.Column>
                <RecipeCard recipe={recipe} />
              </Grid.Column>
            ))}
          </>
        )}
        {!recipes.length && (
          <Container verticalAlign="middle">
            <Image
              src="/cookbook.png"
              centered="true"
              size="medium"
              verticalAlign="middle"
            />
            <h2 textAlign="center" className={styles.text}>
              {" "}
              There is nothing saved yet!
            </h2>
          </Container>
        )}
      </Grid>
    </Grid.Column>
  );
}

Gallery.Layout = HomeLayoutProtected;

export default connect()(Gallery);
