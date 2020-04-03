import backend from "../apis/backend";

export const submitForm = (formValues, tokenId) => async dispatch => {
  formValues.tokenId = tokenId;
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

export const readCookie = () => async dispatch => {
  const { data } = await backend.get("/read-cookie");
  if (data.exists) {
    dispatch({
      type: "COOKIE_EXISTS",
      payload: true
    });
  } else {
    dispatch({ type: "NO_COOKIE", payload: false });
  }
};

export const SignIn = response => async dispatch => {
  if (response.profileObj) {
    backend.post("/login", { tokenId: response.tokenId });
    localStorage.setItem("imageURL", response.profileObj.imageUrl);
    dispatch({
      type: "SIGN_IN",
      payload: response.tokenId
    });
  }
};

export const SignOut = () => async dispatch => {
  dispatch({
    type: "SIGN_OUT",
    payload: true
  });
};
