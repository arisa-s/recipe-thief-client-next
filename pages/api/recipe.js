import {
  getRecipesPending,
  getRecipesSuccess,
  getRecipesFailure,
} from "../../redux/actions/recipe";

const apiUrl = "http://localhost:8080/api";

// GET RECIPES BY USER EMAIL
export const requestGetRecipes = (userEmail) => {
  return fetch(`${apiUrl}/users/${userEmail}/recipes`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

export const getRecipes = async (userEmail, dispatch) => {
  dispatch(getRecipesPending);

  try {
    const recipes = await requestGetRecipes(userEmail);

    dispatch(getRecipesSuccess(recipes));
  } catch {
    dispatch(getRecipesFailure("dang it"));
  }
};

// CREATE (SAVE) RECIPE
export const createRecipe = (userEmail, recipe) =>
  fetch(`${apiUrl}/users/${userEmail}/recipes`, {
    method: "POST",
    body: JSON.stringify(recipe),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());

// GET INGRIDIENTS with RECIPE ID
export const getIngridients = (recipeId) => {
  return fetch(`${apiUrl}/recipes/${recipeId}/ingridients`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

// GET INSTRUCTIONS with RECIPE ID
export const getInstructions = (recipeId) => {
  return fetch(`${apiUrl}/recipes/${recipeId}/instructions`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};
