import * as t from "../types";

const recipe = (
  state = {
    scraped: null,
    saved: [],
    isScraping: false,
    scrapeError: null,
    isLoading: false,
    loadingError: null,
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
          ...action.payload.recipe,
          url: action.payload.url,
        },
        isScraping: false,
      };

    case t.SCRAPE_RECIPE_FAILURE:
      return {
        ...state,
        isScraping: false,
        scrapeError: action.error,
      };
    case t.GET_RECIPES_PENDING:
      return {
        ...state,
        isLoading: true,
        scrapeError: null,
      };

    case t.GET_RECIPES_SUCCESS:
      return {
        ...state,
        saved: action.payload.recipes,
        isLoading: false,
      };

    case t.GET_RECIPES_FAILURE:
      return {
        ...state,
        isLoading: false,
        loadingError: action.error,
      };
    default:
      return { ...state };
  }
};

export default recipe;
