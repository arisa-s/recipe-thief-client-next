import * as t from "../types";

const recipe = (
  state = {
    scraped: {},
    saved: {},
    isScraping: false,
    scrapeError: null,
  },
  action
) => {
  switch (action.type) {
    case t.SCRAPE_RECIPE_PENDING:
      return {
        ...state,
        isScraping: true,
        scrapeError: null,
      };

    case t.SCRAPE_RECIPE_SUCCESS:
      return {
        ...state,
        scraped: {
          url: [action.payload.url],
          recipe: action.payload.recipe,
        },
        isScraping: false,
      };

    case t.SCRAPE_RECIPE_FAILURE:
      return {
        ...state,
        isScraping: false,
        scrapeError: action.error,
      };
    default:
      return { ...state };
  }
};

export default recipe;
