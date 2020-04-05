import React from "react";
import { reduxForm, Field } from "redux-form";
import RadioButtonGroup from "../common/fields/RadioButtonGroup";
import Checkbox from "../common/fields/Checkbox";
import CheckboxGroup from "../common/fields/CheckboxGroup";
import TextInput from "../common/fields/TextInput";
import PostalCodeInput from "../common/fields/PostalCodeInput";
import { 
  AGE_OPTIONS,
  CONDITION_OPTIONS,
  NEED_OPTIONS,
  SEX_OPTIONS,
  SYMPTOM_OPTIONS,
  YES_NO_OPTIONS
} from "./SymptomsFormUtils";
import { validate, isValidPostalCode, isValidEmail } from "../../utils/formValidation";

export const symptomsFormName = "trackYourSymptoms";

const formValidation = [
  ["age", "Age is required"],
  ["contactWithIllness", "Field is required"],
  ["travelOutsideCanada", "Field is required"],
  ["testedPositive", "Field is required"],
  ["postalCode", "Postal code is required (ie. A1A)", ({ postalCode }) => isValidPostalCode(postalCode)],
  ["sex", "Field is required"],
  ["needs", "Field is required", ({ needs }) => Array.isArray(needs) && needs.length > 0],
  ["acknowledgement", "Please accept the Terms and Conditions."],
  ["email", "Please enter a valid email", ({ email }) => !email || isValidEmail(email)]
];

const questions = [
  { 
    body: "Which of the following symptoms are you currently experiencing? (Select all that apply)",
    name: "symptoms",
    component: CheckboxGroup,
    options: SYMPTOM_OPTIONS,
    maxColumns: 2
  },
  { 
    body: "What is your age?",
    name: "age",
    component: RadioButtonGroup,
    options: AGE_OPTIONS,
    maxColumns: 2
  },
  {
    body: "Select any medical conditions you have been diagnosed with (Check all that apply)",
    name: "conditions",
    component: CheckboxGroup,
    options: CONDITION_OPTIONS,
    maxColumns: 2
  },
  {
    body: `Have you had close contact with someone who is coughing, has a fever, or is otherwise
           sick and has been outside of Canada in the last 14 days or has been diagnosed with
           COVID-19?`,
    name: "contactWithIllness",
    component: RadioButtonGroup,
    options: YES_NO_OPTIONS
  },
  {
    body: "Have you traveled outside of Canada within the last 14 days?",
    name: "travelOutsideCanada",
    component: RadioButtonGroup,
    options: YES_NO_OPTIONS
  },
  {
    body: "Have you tested positive for COVID-19?",
    name: "testedPositive",
    component: RadioButtonGroup,
    options: YES_NO_OPTIONS
  },
  {
    body: "What are the three first characters of the postal code of your current residence?",
    name: "postalCode",
    component: PostalCodeInput
  },
  {
    body: "What is your sex?",
    name: "sex",
    component: RadioButtonGroup,
    options: SEX_OPTIONS
  },
  {
    body: "What is your greatest need at this time? (Check all that apply)",
    name: "needs",
    component: CheckboxGroup,
    options: NEED_OPTIONS,
    maxColumns: 2
  },
  {
    body: "What is your email? (optional)",
    name: "email",
    component: TextInput,
  }

];

const SymptomsForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="symptoms-form">
        {questions.map(({ body, ...question }) => (
          <div className="symptoms-form__question" key={question.name}>
            <p className="symptoms-form__question-body body">{body}</p>
            <div className="symptoms-form__question-response">
              <Field {...question}/>
            </div>
          </div>
        ))}
        <div className="symptoms-form__acknowledgement">
          <Field
            name="acknowledgement"
            label={(
              <p className="body">
                <i>
                  By submitting this form, you certify that you are 18+ and agree to our Terms of
                  Service and Privacy Policy.
                </i>
              </p>
            )}
            component={Checkbox}
          />
        </div>
      </div>
    </form>
  );
}

export default reduxForm({
  form: symptomsFormName,
  validate: validate(formValidation),
  initialValues: {
    symptoms: [],
    conditions: [],
    needs: []
  }
})(SymptomsForm);
