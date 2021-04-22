import React from "react";
import { getRecipes } from "../api/recipe";
import { connect, useDispatch, useSelector } from "react-redux";
import RecipeCard from "../../components/recipe-card/recipe-card";
import { Grid, Segment } from "semantic-ui-react";
import HomeLayoutProtected from "../../components/home-layout/home-layout";

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
      style={{ backgroundColor: "rgba(212, 206, 191, 1)", height: "100%" }}
    >
      <Grid columns={3} doubling stackable>
        {recipes.map((recipe) => (
          <Grid.Column centered>
            <RecipeCard recipe={recipe} />
          </Grid.Column>
        ))}
      </Grid>
    </Grid.Column>
  );
}

Gallery.Layout = HomeLayoutProtected;

export default connect()(Gallery);
