import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import submitReducer from "./submitReducer";
import cookieReducer from "./cookieReducer";
import locationReducer from "./locationReducer";

export default combineReducers({
  form: formReducer,
  HTML: submitReducer,
  cookie: cookieReducer,
  locationChange: locationReducer,
});
