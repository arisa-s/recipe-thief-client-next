import React from "react";
import { connect } from "react-redux";
import HomeLayoutProtected from "../../components/home-layout/home-layout";
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
  Icon,
  Rating,
  Loader,
} from "semantic-ui-react";

const Recipe = ({ recipe, ingredients, instructions }) => {
  const [activeItem, setActiveItem] = React.useState("Ingredients");
  if (!recipe) {
    return (
      <Grid.Column width={12} className={styles.container}>
        <Container verticalalign="middle" className={styles.pd}>
          <Loader active inline="centered" size="huge" content="Loading..." />
        </Container>
      </Grid.Column>
    );
  }

  return (
    <>
      <Grid.Column width={4} className={styles.container}>
        <Container verticalalign="middle" className={styles.pd}>
          <h1 style={{ textalign: "center" }} className={styles.redtxt}>
            {recipe.title}
          </h1>
          <p style={{ textalign: "center" }} className={styles.redtxt2}>
            By{" "}
            <a href={recipe.host} className={styles.link}>
              {recipe.host}
            </a>
          </p>
          <Image src={recipe.image} size="small" centered />

          <br />
          <p style={{ textalign: "center" }} className={styles.redtxt2}>
            <Icon name="time" /> {recipe.times} minutes{"   "}
            <Icon name="food" />
            {recipe.portion}
          </p>

          <div style={{ textalign: "center" }}>
            <Rating
              defaultRating={recipe.stars}
              maxRating={5}
              disabled
              icon="star"
            />
          </div>
        </Container>
      </Grid.Column>
      <Grid.Column width={8} className={styles.container}>
        <Container verticalalign="middle" fluid={true} className={styles.pd}>
          <Menu
            attached="top"
            className={styles.menu}
            pointing={true}
            secondary={true}
            inverted={true}
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
            <Segment attached="bottom" className={styles.list}>
              <List>
                {ingredients.map((ingredient, idx) => (
                  <List.Item key={idx} className={styles.list}>
                    <Checkbox label={ingredient.ingridient} />
                  </List.Item>
                ))}
              </List>
            </Segment>
          )}
          {activeItem == "Instruction" && (
            <Segment attached="bottom" className={styles.list}>
              <List ordered={true}>
                {instructions.map((instruction, idx) => (
                  <List.Item key={idx}>
                    <p>{instruction.instruction}</p>
                  </List.Item>
                ))}
              </List>
            </Segment>
          )}
          {activeItem == "Nutrients" && (
            <Segment attached="bottom">
              <Image
                src="/cooking.png"
                centered={true}
                size="small"
                verticalalign="middle"
              />
              <h1 textalign="center" className={styles.text}>
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

Recipe.Layout = HomeLayoutProtected;
export default connect()(Recipe);

export async function getServerSideProps(context) {
  const recipeId = context.params.id;
  const recipe = await getRecipe(recipeId);
  const ingredients = await getIngridients(recipeId);
  const instructions = await getInstructions(recipeId);

  return {
    props: {
      recipe: recipe[0],
      ingredients: ingredients,
      instructions: instructions,
    },
  };
}
