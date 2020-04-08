import React from "react";
import { reduxForm, Field } from "redux-form";
import Recaptcha from "react-recaptcha";

import Modal from "../common/modal/Modal";
import TextInput from "../common/fields/TextInput";
import PrimaryButton from "../common/buttons/PrimaryButton";
import { validate, isValidEmail } from "../../utils/formValidation";
import { RecaptchaKey } from "../form/Recaptcha.js";

export const returningUserFormName = "returningUserForm";

const emailValidation = [
  ["email", "Please enter a valid email", ({ email }) => isValidEmail(email)],
  ["recaptchaVerification", "Please prove you are not a robot."],
];

const ReturningUserModal = ({ handleSubmit, onClose, change }) => {
  const recaptchaLoaded = () => {
    //console.log("Loaded");
  };

  const handleRecaptchaExpired = () => {
    change("recaptchaVerification", false);
  };

  const handleRecaptchaVerified = (response) => {
    console.log("hi");
    if (response) {
      change("recaptchaVerification", response);
      change("isFormSubmission", false);
    }
  };
  return (
    <Modal className="returning-user" onClose={onClose}>
      <div className="returning-user__title title">Returning user?</div>
      <div className="returning-user__body body">
        <form onSubmit={handleSubmit}>
          <Field name="email" label="Email" component={TextInput} />
          <Recaptcha
            sitekey={RecaptchaKey()}
            render="explicit"
            onloadCallback={recaptchaLoaded}
            verifyCallback={handleRecaptchaVerified}
            expiredCallback={handleRecaptchaExpired}
          />
          <Field
            component={TextInput}
            name="recaptchaVerification"
            type="hidden"
          />
          <Field component={TextInput} name="isFormSubmission" type="hidden" />
          <div className="returning-user__submit">
            <PrimaryButton className="returning-user__submit-button">
              Sign In
            </PrimaryButton>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default reduxForm({
  form: returningUserFormName,
  validate: validate(emailValidation),
})(ReturningUserModal);
