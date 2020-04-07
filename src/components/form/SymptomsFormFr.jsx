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
} from "./SymptomsFormUtilsFr";
import {
  validate,
  isValidPostalCode,
  isValidEmail,
} from "../../utils/formValidation";
import { RecaptchaKey } from "./Recaptcha.js";

// DO NOT CHANGE TO FRENCH
export const symptomsFormName = "trackYourSymptoms";

// DO NOT CHANGE FIELD NAMES
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

// DO NOT CHANGE NAME
const questions = [
  {
    body:
      "Lesquels des symptômes suivants avez vous actuellement? Veuillez cocher tous ceux qui s'appliquent.",
    name: "symptoms",
    component: CheckboxGroup,
    options: SYMPTOM_OPTIONS,
    maxColumns: 2,
  },
  {
    body: "Quel âge avez-vous?",
    name: "age",
    component: RadioButtonGroup,
    options: AGE_OPTIONS,
    maxColumns: 2,
  },
  {
    body:
      "Avez-vous été diagnostiqué avec l'une des conditions médicales suivantes? Veuillez cocher toutes celles qui s'appliquent.",
    name: "conditions",
    component: CheckboxGroup,
    options: CONDITION_OPTIONS,
    maxColumns: 2,
  },
  {
    body:
      "Avez-vous été en contact rapproché avec une personne qui tousse, qui fait de la fièvre, ou qui est malade, et qui a voyagé à l’extérieur du Canada au cours des 14 derniers jours, ou qui a reçu un diagnostic de COVID-19?",
    name: "contactWithIllness",
    component: RadioButtonGroup,
    options: YES_NO_OPTIONS,
  },
  {
    body:
      "Avez-vous voyagé à l’extérieur du Canada au cours de 14 derniers jours?",
    name: "travelOutsideCanada",
    component: RadioButtonGroup,
    options: YES_NO_OPTIONS,
  },
  {
    body: "Avez-vous reçu un diagnostic de COVID-19?",
    name: "testedPositive",
    component: RadioButtonGroup,
    options: YES_NO_OPTIONS,
  },
  {
    body:
      "Quels sont les trois premiers caractères du code postal de votre résidence actuelle?",
    name: "postalCode",
    component: PostalCodeInput,
  },
  {
    body: "Quel est votre sexe ?",
    name: "sex",
    component: RadioButtonGroup,
    options: SEX_OPTIONS,
  },
  {
    body: "Saisissez votre courriel (facultatif)",
    name: "email",
    component: TextInput,
  },
];

const SymptomsForm = (props) => {
  const { t } = useTranslation("Form");
  const recaptchaLoaded = () => {
    // console.log("Loaded");
  };

  const recaptchaExpired = () => {
    setIsVerified(false);
  };

  const verifyCallback = (response) => {
    if (response) {
      props.change("recaptchaVerification", response);
    }
  };
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="symptoms-form">
        {questions.map(({ body, ...question }) => (
          <div className="symptoms-form__question" key={question.name}>
            <p className="symptoms-form__question-body body">{body}</p>
            <div className="symptoms-form__question-response">
              <Field {...question} />
            </div>
          </div>
        ))}

        <div className="symptoms-form__recaptcha">
          <Recaptcha
            sitekey={RecaptchaKey()}
            render="explicit"
            onloadCallback={recaptchaLoaded}
            verifyCallback={verifyCallback}
            expiredCallback={recaptchaExpired}
            hl="fr"
          />
        </div>
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
