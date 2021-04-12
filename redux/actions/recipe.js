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
