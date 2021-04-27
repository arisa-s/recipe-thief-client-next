import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import HomeLayoutProtected from "../../components/home-layout/home-layout";
import { useRouter } from "next/router";
import { getRecipe, getInstructions, getIngridients } from "../api/recipe";
import styles from "./recipe.module.css";
import {
  Grid,
  Segment,
  Menu,
  Container,
  List,
  Checkbox,
  Image,
  Header,
  Icon,
  Divider,
  Rating,
} from "semantic-ui-react";
import RecipeCard from "../../components/recipe-card/recipe-card";

const Recipe = (props) => {
  const { ingredients, instructions, isLoading, user, recipe } = props;
  const [activeItem, setActiveItem] = React.useState("Ingredients");

  if (isLoading || !recipe) {
    return <h1>Bruh</h1>;
  }

  return (
    <>
      <Grid.Column width={4} className={styles.container}>
        <Container verticalAlign="middle" className={styles.pd}>
          <h1 style={{ textAlign: "center" }} className={styles.redtxt}>
            {recipe.title}
          </h1>
          <p style={{ textAlign: "center" }} className={styles.redtxt2}>
            By {recipe.host}
          </p>
          <Image src={recipe.image} size="small" centered />

          <br />
          <p style={{ textAlign: "center" }} className={styles.redtxt2}>
            <Icon name="time" /> {recipe.times} minutes{"   "}
            <Icon name="food" />
            {recipe.portion}
          </p>

          <p style={{ textAlign: "center" }}>
            <Rating
              icon="star"
              name="half-rating"
              value={recipe.rating}
              disabled="true"
            />
          </p>
        </Container>
      </Grid.Column>
      <Grid.Column width={8} className={styles.container}>
        <Container verticalAlign="middle" fluid="true" className={styles.pd}>
          <Menu
            attached="top"
            className={styles.menu}
            pointing="true"
            secondary="true"
            inverted="true"
          >
            <Menu.Item
              name="Ingredients"
              active={activeItem === "Ingredients"}
              onClick={() => {
                setActiveItem("Ingredients");
              }}
            />
            <Menu.Item
              name="Instruction"
              active={activeItem === "Instruction"}
              onClick={() => {
                setActiveItem("Instruction");
              }}
            />
            <Menu.Item
              name="Nutrients"
              active={activeItem === "Nutrients"}
              onClick={() => {
                setActiveItem("Nutrients");
              }}
            />
          </Menu>

          {activeItem == "Ingredients" && (
            <Segment attached="bottom" textAlign="left">
              <List>
                {ingredients.map((ingredient) => (
                  <List.Item>
                    <Checkbox label={ingredient.ingridient} />
                  </List.Item>
                ))}
              </List>
            </Segment>
          )}
          {activeItem == "Instruction" && (
            <Segment attached="bottom" textAlign="left">
              <List ordered="true">
                {instructions.map((instruction) => (
                  <List.Item>
                    <p style={{ color: "black" }}>{instruction.instruction}</p>
                  </List.Item>
                ))}
              </List>
            </Segment>
          )}
          {activeItem == "Nutrients" && (
            <Segment attached="bottom">
              <Image
                src="/cooking.png"
                centered="true"
                size="small"
                verticalAlign="middle"
              />
              <h1 textAlign="center" className={styles.text}>
                {" "}
                Coming Soon!
              </h1>
            </Segment>
          )}
        </Container>
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
  const [recipe, setRecipe] = React.useState();
  const [ingredients, setIngredients] = React.useState([]);
  const [instructions, setInstructions] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const getRecipeInfo = async () => {
      setIsLoading(true);

      const recipeResult = getRecipe(id);
      const ingredientsResult = getIngridients(id);
      const instructionsResult = getInstructions(id);

      const resolvedRecipe = await recipeResult;
      const resolvedIngredients = await ingredientsResult;
      const resolvedInstructions = await instructionsResult;

      setRecipe(resolvedRecipe[0]);
      setIngredients(resolvedIngredients);
      setInstructions(resolvedInstructions);
      setIsLoading(false);
    };

    getRecipeInfo();
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
