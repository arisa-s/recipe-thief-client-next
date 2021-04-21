import { combineReducers } from "redux";
import recipe from "./recipe";
import user from "./user";

const rootReducer = combineReducers({
  recipe: recipe,
  user: user,
});

export default rootReducer;
