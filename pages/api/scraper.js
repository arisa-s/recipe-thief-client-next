import {
  setRecipeScraping,
  setRecipeScrapeSuccess,
  setRecipeScrapeFailure,
} from "../../redux/actions/recipe";

const apiUrl = "http://localhost:5050/api/scraper";

export const requestScrapeRecipe = (url) => {
  return fetch(`${apiUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: url,
    }),
  })
    .then((res) => res.json())
    .then((recipe) => {
      return recipe;
    });
};

export const scrapeRecipe = async (url, dispatch) => {
  dispatch(setRecipeScraping);

  try {
    const scrapedRecipe = await requestScrapeRecipe(url);

    dispatch(setRecipeScrapeSuccess(scrapedRecipe, url));
  } catch {
    dispatch(setRecipeScrapeFailure("dang it"));
  }
};
