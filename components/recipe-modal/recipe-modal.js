import React from "react";
import {
  Button,
  Header,
  Image,
  Modal,
  Menu,
  Segment,
  Container,
  List,
  Checkbox,
} from "semantic-ui-react";

const RecipeModalContent = ({ recipe }) => {
  console.log(recipe);
  const [activeItem, setActiveItem] = React.useState("Ingredients");
  return (
    <div>
      <Menu attached="top" pointing={true} secondary={true} inverted={true}>
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
      </Menu>

      {activeItem == "Ingredients" && (
        <Segment attached="bottom" textalign="left">
          <List>
            {recipe.ingredients.map((ingredient, idx) => (
              <List.Item key={idx}>
                <Checkbox label={ingredient} />
              </List.Item>
            ))}
          </List>
        </Segment>
      )}
      {activeItem == "Instruction" && (
        <Segment attached="bottom" textalign="left">
          <List ordered={true}>
            {recipe.instructions.map((instruction, idx) => (
              <List.Item key={idx}>
                <p style={{ color: "black" }}>{instruction}</p>
              </List.Item>
            ))}
          </List>
        </Segment>
      )}
    </div>
  );
};

export default RecipeModalContent;
