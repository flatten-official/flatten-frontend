import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import submitReducer from "./submitReducer";
import cookieReducer from "./cookieReducer";
import locationReducer from "./locationReducer";
import mapDataReducer from "./mapDataReducer";

export default combineReducers({
  form: formReducer,
  HTML: submitReducer,
  cookie: cookieReducer,
  locationChange: locationReducer,
  mapData: mapDataReducer,
});
