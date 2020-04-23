import { GET_CONFIRMED_DATA, GET_FORM_DATA } from "../actions";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_FORM_DATA:
      return { ...state, form: action.payload };
    case GET_CONFIRMED_DATA:
      return { ...state, confirmed: action.payload };
    default:
      return state;
  }
};
