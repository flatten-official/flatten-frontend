import { LANG_CHANGE, CURRENT_LANG } from "../actions/actions";

export default (state, action) => {
  switch (action.type) {
    case LANG_CHANGE:
      return action.payload;
    case CURRENT_LANG:
      return action.payload;
    default:
      return null;
  }
};
