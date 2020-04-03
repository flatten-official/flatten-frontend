export default (state = {}, action) => {
  switch (action.type) {
    case "SUBMIT_FORM":
      return { ...state, response: action.payload };
    default:
      return state;
  }
};
