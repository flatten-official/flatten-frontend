import React from "react";
import { reduxForm, Field } from "redux-form";
import RadioButtonGroup from "../common/fields/RadioButtonGroup";
import Checkbox from "../common/fields/Checkbox";
import PostalCodeInput from "../common/fields/PostalCodeInput";
import { validate, yesNoOptions } from "./SymptomsFormUtils";
import "./SymptomsForm.scss";

export const symptomsFormName = "trackYourSymptoms";

const formValidation = [
  ["q1", "Field is required"],
  ["q2", "Field is required"],
  ["q3", "Field is required"],
  ["q4", "Field is required"],
  ["q5", "Field is required"],
  ["q6", "Field is required"],
  ["q7", "Field is required"],
  ["postalCode", "Postal code is required (ie. A1A)"],
  ["acknowledgement", "Please accept the Terms and Conditions"]
];

const questions = [
  "Do you have a fever, chills, or shakes?",
  "Do you have a new or worsening cough?",
  "Are you experiencing difficulty breathing or breathlessness?",
  "Are you 60 years of age or older?",
  "Do you have any of the following medical conditions: diabetes, heart disease, active cancer, history of stroke, asthma, COPD, dialysis, or are immunocompromised?",
  "Have you traveled outside of Canada within the last 14 days?",
  "Have you had close contact with someone who is coughing, has a fever, or is otherwise sick and has been outside of Canada in the last 14 days or has been diagnosed with COVID-19?"
];

const SymptomsForm = ({ handleSubmit }) => {
  return (
    <form id={symptomsFormName} onSubmit={handleSubmit}>
      <div className="symptoms-form-body">
        {questions.map((question, i) => (
          <div key={i} className="symptoms-form-question">
            <p className="symptoms-form-question-body body-black">{question}</p>
            <div className="symptoms-form-question-response">
              <Field
                name={`q${i + 1}`}
                options={yesNoOptions}
                component={RadioButtonGroup}
              />
            </div>
          </div>
        ))}
        <div className="symptoms-form-question">
          <p className="symptoms-form-question-body body-black">
            What are the three first characters of the postal code of your current
            residence?
          </p>
          <div className="symptoms-form-question-response">
            <Field
              name="postalCode"
              component={PostalCodeInput}
            />
          </div>
        </div>
        <div className="symptoms-form-acknowledgement">
          <Field
            name="acknowledgement"
            label={(
              <p className="description italic">
                By submitting this form, you certify that you are 18+ and agree to our Terms of
                Service and Privacy Policy.
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
  validate: validate(formValidation)
})(SymptomsForm);
