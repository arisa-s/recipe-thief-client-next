import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import HomeLayoutProtected from "../../components/home-layout/home-layout";
import { useRouter } from "next/router";
import { getInstructions, getIngridients } from "../api/recipe";
import styles from "./recipe.module.css";
import { Grid, Segment, Menu } from "semantic-ui-react";
import RecipeCard from "../../components/recipe-card/recipe-card";

const Recipe = (props) => {
  const { ingredients, instructions, isLoading, user, recipe } = props;

  console.log(ingredients);
  console.log(instructions);

  if (isLoading) {
    return <h1>Bruh</h1>;
  }

  return (
    <>
      <Grid.Column width={4} centered stackable container>
        <Segment>
          <RecipeCard recipe={recipe} />
        </Segment>
      </Grid.Column>
      <Grid.Column width={8} centered stackable container>
        <div>
          <Menu pointing>
            <Menu.Item
              name="Ingridients"
              //  active={activeItem === "home"}
              // onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Preparation"
              //  active={activeItem === "messages"}
              // onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Nutrients"
              //  active={activeItem === "friends"}
              // onClick={this.handleItemClick}
            />
          </Menu>

          <Segment></Segment>
        </div>
      </Grid.Column>
    </>
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
