import React from "react";
import i18next from "i18next";
import { reduxForm, Field } from "redux-form";

import RecaptchaField from "../common/fields/Recaptcha/RecaptchaField";
import TextInput from "../common/fields/TextInput";
import PrimaryButton from "../common/buttons/PrimaryButton";

import { validate, isValidEmail } from "../../utils/formValidation";

export const returningUserFormName = "returningUserForm";

const emailValidation = [
  ["email", "Please enter a valid email", ({ email }) => isValidEmail(email)],
  ["recaptchaVerification", "Please prove you are not a robot."],
];
const ReturningUserForm = ({ handleSubmit, change }) => {
  const lang = i18next.language;

  const recaptchaLoaded = () => {
    //console.log("Loaded");
  };

  const handleRecaptchaExpired = () => {
    change("recaptchaVerification", false);
  };

  const handleRecaptchaVerified = (response) => {
    if (response) {
      change("recaptchaVerification", response);
      change("isFormSubmission", false);
    }
  };

  return (
    <div className="returning-user__body body">
      <form onSubmit={handleSubmit}>
        <Field
          name="email"
          label="Email"
          className="returning-user__input"
          component={TextInput}
        />
        <RecaptchaField
          lang={lang}
          recaptchaLoaded={recaptchaLoaded}
          handleRecaptchaExpired={handleRecaptchaExpired}
          handleRecaptchaVerified={handleRecaptchaVerified}
        />
        <Field
          component={TextInput}
          name="recaptchaVerification"
          type="hidden"
        />
        <div className="returning-user__submit">
          <PrimaryButton className="returning-user__submit-button">
            Sign In
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default reduxForm({
  form: returningUserFormName,
  validate: validate(emailValidation),
})(ReturningUserForm);
