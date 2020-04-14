import { MAP_CONFIRMED_DATA, MAP_FORM_DATA } from "../actions";

export default (state = {}, action) => {
  switch (action.type) {
    case MAP_CONFIRMED_DATA:
      return { ...state, confirmed: action.payload };
    case MAP_FORM_DATA:
      return { ...state, form: action.payload };
    default:
      return state;
  }
};
