export default (state = {}, action) => {
  switch (action.type) {
    case "COOKIE_EXISTS":
      return { ...state, status: action.payload };
    case "NO_COOKIE":
      return { ...state, status: action.payload };
    default:
      return state;
  }
};
