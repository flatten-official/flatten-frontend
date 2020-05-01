import backend from "../apis/backend";
import i18next from "i18next";
import history from "../history";
import { COUNTRIES } from "../components/heatmap/mapConstants";

export const COOKIE_EXISTS = "COOKIE_EXISTS";
export const CURRENT_LANG = "CURRENT_LANG";
export const LANG_CHANGE = "LANG_CHANGE";
export const SET_COOKIE = "SET_COOKIE";
export const GET_FORM_DATA = "GET_FORM_DATA";
export const GET_CONFIRMED_DATA = "GET_CONFIRMED_DATA";

export const readCookie = () => async (dispatch) => {
  const { data } = await backend.get("/read-cookie");
  dispatch({ type: COOKIE_EXISTS, payload: data });
};

export const getGeolocation = () => async (dispatch) => {
  try {
    const response = await backend.get("/locale");
    const params = new URLSearchParams(window.location.search);

    if (!params.get("lang")) {
      const lang = response.data.locale;
      history.push(`${window.location.pathname}?lang=${lang}`);
      await i18next.changeLanguage(lang).catch(console.error);
      dispatch({ type: LANG_CHANGE, payload: lang });
    } else {
      dispatch({ type: CURRENT_LANG, payload: i18next.language });
    }
  } catch (e) {
    console.log(e);
    dispatch({ type: CURRENT_LANG, payload: false });
  }
};

export const setDailyCookie = () => async (dispatch) => {
  await backend.post("/set-daily-cookie");
  return { type: SET_COOKIE };
};

export const getMapFormData = (country) => async (dispatch) => {
  const url = country.form.url;
  const data = await (await fetch(url)).json();
  dispatch({ type: GET_FORM_DATA, payload: data });
};

export const getMapConfirmedData = (country) => async (dispatch) => {
  const url = country.confirmed.url;
  const data = await (await fetch(url)).json();
  dispatch({ type: GET_CONFIRMED_DATA, payload: data });
};
