export default (state = {}, action) => {
  switch (action.type) {
    case "COOKIE_EXISTS":
      return { ...state, exists: true };
    case "NO_COOKIE":
      return { ...state, exists: false };
    default:
      return state;
  }
};
