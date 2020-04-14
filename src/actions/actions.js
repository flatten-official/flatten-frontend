import backend from "../apis/backend";
import i18next from "i18next";
import history from "../history";

const MAP_URLS = {
  cadForm:
    "https://storage.googleapis.com/flatten-271620.appspot.com/form_data.json",
  usaForm:
    "https://storage.googleapis.com/flatten-271620.appspot.com/form_data_usa.json",
  cadConf:
    "https://opendata.arcgis.com/datasets/e5403793c5654affac0942432783365a_0.geojson",
  usaConf:
    "https://opendata.arcgis.com/datasets/628578697fb24d8ea4c32fa0c5ae1843_0.geojson",
};

export const SUBMIT_FORM = "SUBMIT_FORM";
export const COOKIE_EXISTS = "COOKIE_EXISTS";
export const LANG_CHANGE = "LANG_CHANGE";
export const MAP_FORM_DATA = "MAP_FORM_DATA";
export const MAP_CONFIRMED_DATA = "MAP_CONFIRMED_DATA";
export const CURRENT_LANG = "CURRENT_LANG";

export const submitForm = (formValues) => async (dispatch) => {
  try {
    const response = await backend.post("/submit", formValues);
    dispatch({ type: SUBMIT_FORM, payload: response.data });
  } catch (e) {
    console.error(e);
    dispatch({ type: SUBMIT_FORM, payload: false });
  }
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

export const getMapFormData = () => async (dispatch) => {
  const formURL =
    i18next.language === "enUS" ? MAP_URLS.usaForm : MAP_URLS.cadForm;
  const rawData = await fetch(formURL);
  const formData = await rawData.json();
  dispatch({ type: MAP_FORM_DATA, payload: formData });
};
export const getMapConfirmedData = () => async (dispatch) => {
  const confirmedURL =
    i18next.language === "enUS" ? MAP_URLS.usaConf : MAP_URLS.cadConf;
  const rawData = await fetch(confirmedURL);
  const confirmedData = await rawData.json();
  dispatch({ type: MAP_CONFIRMED_DATA, payload: confirmedData });
};
