import backend from "../apis/backend";
import i18next from "i18next";
import history from "../history";

export const COOKIE_EXISTS = "COOKIE_EXISTS";
export const CURRENT_LANG = "CURRENT_LANG";
export const LANG_CHANGE = "LANG_CHANGE";
export const SET_COOKIE = "SET_COOKIE";
export const GET_FORM_DATA = "GET_FORM_DATA";
export const GET_CONFIRMED_DATA = "GET_CONFIRMED_DATA";

const URLS = {
  cad: {
    form:
      "https://storage.googleapis.com/flatten-271620.appspot.com/form_data.json",
    confirmed:
      "https://opendata.arcgis.com/datasets/e5403793c5654affac0942432783365a_0.geojson",
  },
  usa: {
    form:
      "https://storage.googleapis.com/flatten-271620.appspot.com/form_data_usa.json",
    confirmed:
      "https://opendata.arcgis.com/datasets/628578697fb24d8ea4c32fa0c5ae1843_0.geojson",
  },
};

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

export const getMapFormData = () => async (dispatch) => {
  const url = (i18next.language === "enUS" ? URLS.usa : URLS.cad).form;
  const data = await (await fetch(url)).json();
  dispatch({ type: GET_FORM_DATA, payload: data });
};

export const getMapConfirmedData = () => async (dispatch) => {
  const url = (i18next.language === "enUS" ? URLS.usa : URLS.cad).confirmed;
  const data = await (await fetch(url)).json();
  dispatch({ type: GET_CONFIRMED_DATA, payload: data });
};
