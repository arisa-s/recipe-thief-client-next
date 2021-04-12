import { combineReducers } from "redux";
import recipe from "./recipe";

const rootReducer = combineReducers({
  recipe: recipe,
});

export default rootReducer;
