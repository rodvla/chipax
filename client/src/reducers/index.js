const initialState = {
  matches: [],
  locations: [],
  time: null,
};

export default function rootReducer(state = initialState, action) {
  if (action.type === "GET_CHALLENGE") {
    return {
      matches: action.payload.matches,
      locations: action.payload.originLocations,
      time: action.payload.time,
    };
  }
  return state;
}
