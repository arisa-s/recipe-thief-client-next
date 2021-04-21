import { setCurrentUser } from "../../redux/actions/user";

const apiUrl = "https://recipe-thief-server.herokuapp.com/api";

// GET USER BY EMAIL
export const requestGetUser = (email) => {
  return fetch(`${apiUrl}/users/${email}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((user) => {
      return user;
    });
};

export const getUser = async (email, dispatch) => {
  // dispatch(setRecipeScraping);

  try {
    const user = await requestGetUser(email);
    dispatch(setCurrentUser(user));
  } catch {
    dispatch(setRecipeScrapeFailure("dang it"));
  }
};
