import axios from "axios";

export const getChallenge = () => async (dispatch) => {
  await axios({
    method: "GET",
    url: "http://localhost:3001/challenge",
  }).then((res) => {
    dispatch({ type: "GET_CHALLENGE", payload: res.data });
  });
};
