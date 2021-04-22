import * as t from "../types";

export const setRecipeScraping = () => ({
  type: t.SCRAPE_RECIPE_PENDING,
});

export const setRecipeScrapeSuccess = (recipe, url) => ({
  type: t.SCRAPE_RECIPE_SUCCESS,
  payload: {
    recipe,
    url,
  },
});

export const setRecipeScrapeFailure = (error) => ({
  type: t.SCRAPE_RECIPE_FAILURE,
  error,
});

export const resetRecipe = () => ({
  type: t.SCRAPE_RECIPE_RESET,
});

export const getRecipesPending = () => ({
  type: t.GET_RECIPES_PENDING,
});

export const getRecipesSuccess = (recipes) => ({
  type: t.GET_RECIPES_SUCCESS,
  payload: {
    recipes,
  },
});

export const getRecipesFailure = (error) => ({
  type: t.GET_RECIPES_FAILURE,
  error,
});
