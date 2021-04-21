import styles from "../gallery/gallery.module.css";
import React from "react";
import { getRecipes } from "../../pages/api/recipe";
import { connect, useDispatch, useSelector } from "react-redux";
import RecipeCard from "../recipe-card/recipe-card";
import { Grid, Segment } from "semantic-ui-react";

function Gallery({ email }) {
  const dispatch = useDispatch();
  React.useEffect(() => {
    getRecipes(email, dispatch);
  }, []);
  const recipes = useSelector((state) => state.recipe.saved);
  console.log(recipes);

  return (
    <Grid columns={3} doubling stackable>
      {recipes.map((recipe) => (
        <Grid.Column style={{ align: "left" }}>
          <RecipeCard recipe={recipe} />
        </Grid.Column>
      ))}
    </Grid>
  );
}

export default connect()(Gallery);
