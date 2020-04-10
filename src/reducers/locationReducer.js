export default (state = {}, action) => {
  switch (action.type) {
    case "LANG_CHANGE":
      return { status: action.payload };
    case "CURRENT_LANG":
      return { status: action.payload };
    default:
      return state;
  }
};
