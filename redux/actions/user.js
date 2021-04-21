import * as t from "../types";

export const setCurrentUser = (user) => ({
  type: t.SET_CURRENT_USER,
  payload: { user },
});
