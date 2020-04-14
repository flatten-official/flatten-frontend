import { COOKIE_EXISTS } from "../actions/actions";

export default (state = {}, action) => {
  switch (action.type) {
    case COOKIE_EXISTS:
      return { value: action.payload };
    default:
      return state;
  }
};
