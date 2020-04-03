export default (state = {}, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return { ...state, tokenId: action.payload };
    case "SIGN_OUT":
      return { ...state, tokenId: null };
    default:
      return state;
  }
};
