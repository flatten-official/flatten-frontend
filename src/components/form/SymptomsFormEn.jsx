import React from "react";
import { reduxForm, Field } from "redux-form";
import Recaptcha from "react-recaptcha";
import { useTranslation } from "react-i18next";

import RadioButtonGroup from "../common/fields/RadioButtonGroup";
import Checkbox from "../common/fields/Checkbox";
import CheckboxGroup from "../common/fields/CheckboxGroup";
import TextInput from "../common/fields/TextInput";
import PostalCodeInput from "../common/fields/PostalCodeInput";
import {
  AGE_OPTIONS,
  CONDITION_OPTIONS,
  SEX_OPTIONS,
  SYMPTOM_OPTIONS,
  YES_NO_OPTIONS,
} from "./SymptomsFormUtilsEn";
import {
  validate,
  isValidPostalCode,
  isValidEmail,
} from "../../utils/formValidation";
import { RecaptchaKey } from "./Recaptcha.js";

export const symptomsFormName = "trackYourSymptoms";

const formValidation = [
  ["age", "Age is required"],
  ["contactWithIllness", "Field is required"],
  ["travelOutsideCanada", "Field is required"],
  ["testedPositive", "Field is required"],
  [
    "postalCode",
    "Postal code is required (ie. A1A)",
    ({ postalCode }) => isValidPostalCode(postalCode),
  ],
  ["sex", "Field is required"],
  ["acknowledgement", "Please accept the Terms and Conditions."],
  ["recaptchaVerification", "Please prove you are not a robot."],
  [
    "email",
    "Please enter a valid email",
    ({ email }) => !email || isValidEmail(email),
  ],
];

const questions = [
  {
    body:
      "Which of the following symptoms are you currently experiencing? Select all that apply.",
    name: "symptoms",
    component: CheckboxGroup,
    options: SYMPTOM_OPTIONS,
    maxColumns: 2,
  },
  {
    body: "What is your age?",
    name: "age",
    component: RadioButtonGroup,
    options: AGE_OPTIONS,
    maxColumns: 2,
  },
  {
    body:
      "Select any medical conditions you have been diagnosed with. Check all that apply.",
    name: "conditions",
    component: CheckboxGroup,
    options: CONDITION_OPTIONS,
    maxColumns: 2,
  },
  {
    body: `Have you had close contact with someone who is coughing, has a fever, or is otherwise
           sick and has been outside of Canada in the last 14 days or has been diagnosed with
           COVID-19?`,
    name: "contactWithIllness",
    component: RadioButtonGroup,
    options: YES_NO_OPTIONS,
  },
  {
    body: "Have you traveled outside of Canada within the last 14 days?",
    name: "travelOutsideCanada",
    component: RadioButtonGroup,
    options: YES_NO_OPTIONS,
  },
  {
    body: "Have you tested positive for COVID-19?",
    name: "testedPositive",
    component: RadioButtonGroup,
    options: YES_NO_OPTIONS,
  },
  {
    body:
      "What are the three first characters of the postal code of your current residence?",
    name: "postalCode",
    component: PostalCodeInput,
  },
  {
    body: "What is your sex?",
    name: "sex",
    component: RadioButtonGroup,
    options: SEX_OPTIONS,
  },
  {
    body: "What is your email? (optional)",
    name: "email",
    component: TextInput,
  },
];

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
  validate: validate(formValidation),
  initialValues: {
    symptoms: [],
    conditions: [],
    needs: [],
  },
})(SymptomsForm);
