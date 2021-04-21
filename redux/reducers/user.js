import * as t from "../types";

const user = (
  state = {
    currentUser: null,
  },
  action
) => {
  switch (action.type) {
    case t.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload.user,
      };

    default:
      return { ...state };
  }
};

export default user;
