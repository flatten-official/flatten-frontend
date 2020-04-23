import backend from "../apis/backend";
import i18next from "i18next";
import history from "../history";

export const COOKIE_EXISTS = "COOKIE_EXISTS";
export const CURRENT_LANG = "CURRENT_LANG";
export const LANG_CHANGE = "LANG_CHANGE";
export const SET_COOKIE = "SET_COOKIE";

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
