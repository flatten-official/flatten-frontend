import RadioButtonGroup from "../../common/fields/RadioButtonGroup";
import CheckboxGroup from "../../common/fields/CheckboxGroup";
import TextInput from "../../common/fields/TextInput";
import PostalCodeInput from "../../common/fields/PostalCodeInput";
import ZipCodeInput from "../../common/fields/ZipCodeInput";

import { getUtils } from "./SymptomsFormUtils";

export const getQuestions = (lang) => {
  const {
    AGE_OPTIONS,
    CONDITION_OPTIONS,
    SEX_OPTIONS,
    SYMPTOM_OPTIONS,
    YES_NO_OPTIONS,
  } = getUtils(lang);
  let questions;
  switch (lang) {
    case "fr":
      questions = [
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
      break;
    case "enUS":
      questions = [
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
          body: "What is the zipcode of your current residence?",
          name: "zipCode",
          component: ZipCodeInput,
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
      break;
    case "en":
    default:
      questions = [
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
  }
  return questions;
};
