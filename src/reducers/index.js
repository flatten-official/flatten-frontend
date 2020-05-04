import { combineReducers } from "redux";
import cookieReducer from "./cookieReducer";
import locationReducer from "./locationReducer";
import mapReducer from "./mapReducer";
import formReducer from "./submitReducer";

export default combineReducers({
  cookie: cookieReducer,
  locationChange: locationReducer,
  mapData: mapReducer,
  formStatus: formReducer,
});
