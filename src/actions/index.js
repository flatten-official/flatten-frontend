import backend from "../apis/backend";
import i18next from "i18next";

export const submitForm = (formValues) => async (dispatch) => {
  let submitSuccess;
  try {
    const response = await backend.post("/submit", formValues);
    submitSuccess = response.data;
  } catch (e) {
    console.error(e);
    submitSuccess = false;
  }

  dispatch({ type: "SUBMIT_FORM", payload: submitSuccess });
};

export const readCookie = () => async (dispatch) => {
  const { data } = await backend.get("/read-cookie");
  dispatch({
    type: "COOKIE_EXISTS",
    payload: data,
  });
};

export const getGeolocation = () => async (dispatch) => {
  let lang = i18next.language;
  try {
    const response = await backend.get("/locale");
    const params = new URLSearchParams(window.location.search);
    if (!params.get("lang")) {
      lang = response.data.locale;
      console.log(lang);
      await i18next.changeLanguage(lang).catch(console.error);
      dispatch({
        type: "LANG_CHANGE",
        payload: lang,
      });
    } else {
      dispatch({
        type: "CURRENT_LANG",
        payload: lang,
      });
    }
  } catch (e) {
    console.log(e);
    dispatch({
      type: "CURRENT_LANG",
      payload: false,
    });
  }
};
