import { combineReducers } from "redux";
import cookieReducer from "./cookieReducer";
import locationReducer from "./locationReducer";

export default combineReducers({
  cookie: cookieReducer,
  locationChange: locationReducer,
});
