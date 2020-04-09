import backend from "../apis/backend";

export const submitForm = (formValues) => async (dispatch) => {
  console.log(formValues);
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
