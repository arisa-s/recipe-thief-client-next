import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import HomeLayoutProtected from "../../components/home-layout/home-layout";
import { useRouter } from "next/router";
import { getInstructions, getIngridients } from "../api/recipe";
import styles from "./recipe.module.css";
import { Grid, Segment } from "semantic-ui-react";

const Recipe = (props) => {
  const { ingredients, instructions, isLoading, user, recipe } = props;

  console.log(ingredients);
  console.log(instructions);

  if (isLoading) {
    return <h1>Bruh</h1>;
  }

  return (
    <Grid columns={2} stackable>
      <Grid.Column width={3}></Grid.Column>
      <Grid.Column width={10}>
        <div className={styles.cont_modal}>
          <div className={styles.cont_text_ingredients}>
            <div className={styles.cont_over_hidden}>
              <div className={styles.cont_tabs}>
                <ul>
                  <li>
                    <a href="#">
                      <h4>INGREDIENTS</h4>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <h4>PREPARATION</h4>
                    </a>
                  </li>
                </ul>
              </div>

              <div className={styles.cont_text_det_preparation}>
                <div className={styles.cont_title_preparation}>
                  <p>STEP 1</p>
                </div>
                <div className={styles.cont_info_preparation}>
                  <p>Heat oven to 375 degress</p>
                </div>
                <div className={styles.cont_text_det_preparation}>
                  <div className={styles.cont_title_preparation}>
                    <p>STEP 2</p>
                  </div>
                  <div className={styles.cont_info_preparation}>
                    <p>
                      Heat oil in a large skillet over medium-low head. Add
                      onion and bell papper. Cook gently until very soft, about
                      20 minutes. Add garlic and cook until tender, 1 to 2
                      minutes; stir in cumin, paprika and cook 1 minute. Pour in
                      tomatoes and season with 3/4 teaspoon salt and 1/4
                      teaspoon pepper;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Grid.Column>
    </Grid>
  );
};

const RecipeWrapper = () => {
  const router = useRouter();
  const { id } = router.query;
  const user = useSelector((state) => state.user.currentUser);

  // TODO: store recipe with id as key?
  // const recipe = useSelector((state) => state.recipe.recipes[{id}]);
  const recipe = {};

  const [ingredients, setIngredients] = React.useState([]);
  const [instructions, setInstructions] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  console.log(id);

  React.useEffect(() => {
    const getInstructionsAndIngredients = async () => {
      setIsLoading(true);
      const ingridientsResult = getIngridients(id);
      const instructionsResult = getInstructions(id);

      await ingridientsResult;
      await instructionsResult;

      setIngredients(ingridientsResult);
      setInstructions(instructionsResult);
      setIsLoading(false);
    };

    getInstructionsAndIngredients();
  }, []);

  return (
    <Recipe
      ingredients={ingredients}
      instructions={instructions}
      isLoading={isLoading}
      user={user}
      recipe={recipe}
    />
  );
};

RecipeWrapper.Layout = HomeLayoutProtected;

export default connect()(RecipeWrapper);
