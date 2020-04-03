import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import submitReducer from "./submitReducer";
import cookieReducer from "./cookieReducer";
import accountReducer from "./accountReducer";

export default combineReducers({
  form: formReducer,
  HTML: submitReducer,
  cookieExists: cookieReducer,
  account: accountReducer
});
