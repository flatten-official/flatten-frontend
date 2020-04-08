import React from "react";
import { reduxForm, Field } from "redux-form";
import Modal from "../common/modal/Modal";
import TextInput from "../common/fields/TextInput";
import PrimaryButton from "../common/buttons/PrimaryButton";
import { validate, isValidEmail } from "../../utils/formValidation";

export const returningUserFormName = "returningUserForm";

const emailValidation = [
  [
    "email",
    "Please enter a valid email",
    ({ email }) => isValidEmail(email)
  ]
];

const ReturningUserModal = ({ handleSubmit, onClose }) => {
  return (
    <Modal className="returning-user" onClose={onClose}>
      <div className="returning-user__title title">
        Returning user?
      </div>
      <div className="returning-user__body body">
        <form onSubmit={handleSubmit}>
          <Field
            name="email"
            label="Email"
            component={TextInput}
          />
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
  validate: validate(emailValidation)
})(ReturningUserModal);
