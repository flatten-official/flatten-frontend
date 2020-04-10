import React from "react";
import { reduxForm, Field } from "redux-form";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

import { formValidation } from "./formUtils/formValidation";
import { questions } from "./formUtils/formQuestions";

import Checkbox from "../common/fields/Checkbox";
import TextInput from "../common/fields/TextInput";
import RecaptchaField from "../common/fields/Recaptcha/RecaptchaField";

import { validate } from "../../utils/formValidation";

export const symptomsFormName = "trackYourSymptoms";

const lang = i18next.language;

const SymptomsForm = ({ change, handleSubmit }) => {
  const { t } = useTranslation("Form");
  const recaptchaLoaded = () => {
    //console.log("Loaded");
  };

  const handleRecaptchaExpired = () => {
    change("recaptchaVerification", false);
  };

  const handleRecaptchaVerified = (response) => {
    if (response) {
      change("recaptchaVerification", response);
      change("isFormSubmission", true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="symptoms-form">
        {questions.map(({ body, ...question }) => (
          <div className="symptoms-form__question" key={question.name}>
            <p className="symptoms-form__question-body body">{body}</p>
            <div className="symptoms-form__question-response">
              <Field {...question} />
            </div>
          </div>
        ))}
        <RecaptchaField
          lang={lang}
          recaptchaLoaded={recaptchaLoaded}
          recaptchaExpired={handleRecaptchaVerified}
          verifyCallback={handleRecaptchaExpired}
        />
        <Field
          component={TextInput}
          name="recaptchaVerification"
          type="hidden"
        />
        <div className="symptoms-form__acknowledgement">
          <Field
            name="acknowledgement"
            label={
              <p className="body">
                <i>{t("verify")}</i>
              </p>
            }
            component={Checkbox}
          />
        </div>
      </div>
    </form>
  );
};

export default reduxForm({
  form: symptomsFormName,
  // validate: validate(formValidation),
  initialValues: {
    symptoms: [],
    conditions: [],
    needs: [],
  },
})(SymptomsForm);
