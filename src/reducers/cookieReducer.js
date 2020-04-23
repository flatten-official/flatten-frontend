import { COOKIE_EXISTS } from "../actions";

export default (state = {}, action) => {
  switch (action.type) {
    case COOKIE_EXISTS:
      return { ...state, status: action.payload };
    default:
      return state;
  }
};
