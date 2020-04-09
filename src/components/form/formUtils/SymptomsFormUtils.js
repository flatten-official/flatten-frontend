import i18next from "i18next";

export let YES_NO_OPTIONS;

export let SEX_OPTIONS;

export let SYMPTOM_OPTIONS;

export let AGE_OPTIONS;

export let CONDITION_OPTIONS;

export let NEED_OPTIONS;

switch (i18next.language) {
  case "en":
    YES_NO_OPTIONS = [
      { label: "Yes", value: "y" },
      { label: "No", value: "n" },
    ];

    SEX_OPTIONS = [
      { label: "Male", value: "m" },
      { label: "Female", value: "f" },
      { label: "Prefer not to respond", value: "na" },
    ];

    SYMPTOM_OPTIONS = [
      { label: "Fever", value: "fever" },
      { label: "Chills", value: "chills" },
      { label: "Shakes", value: "shakes" },
      { label: "New or worsening cough", value: "cough" },
      { label: "Shortness of breath", value: "shortnessOfBreath" },
      { label: "Diarrhea", value: "diarrhea" },
      { label: "Runny nose", value: "runnyNose" },
      { label: "Sore throat", value: "soreThroat" },
    ];

    AGE_OPTIONS = [
      { label: "Less than 18", value: "<18" },
      { label: "18-25", value: "18-25" },
      { label: "26-34", value: "26-34" },
      { label: "35-44", value: "35-44" },
      { label: "45-54", value: "45-54" },
      { label: "55-64", value: "55-64" },
      { label: "65-74", value: "65-74" },
      { label: "75 and greater", value: ">75" },
    ];

    CONDITION_OPTIONS = [
      { label: "Diabetes", value: "diabetes" },
      { label: "High blood pressure", value: "highBloodPressure" },
      { label: "Heart disease", value: "heartDisease" },
      { label: "Active cancer", value: "cancer" },
      { label: "COPD/Asthma", value: "breathingProblems" },
      { label: "Immunocompromised", value: "immunocompromised" },
      { label: "Kidney disease", value: "kidneyDisease" },
      { label: "History of stroke", value: "historyOfStroke" },
      { label: "Other", value: "other" },
    ];

    NEED_OPTIONS = [
      { label: "Financial support", value: "financialSupport" },
      { label: "Emotional support", value: "emotionalSupport" },
      { label: "Medication/Pharmacy resources", value: "medication" },
      { label: "Food/Necessary resources", value: "food" },
      { label: "Other", value: "other" },
    ];
    break;
  case "fr":
    YES_NO_OPTIONS = [
      { label: "Oui", value: "y" },
      { label: "Non", value: "n" },
    ];

    SEX_OPTIONS = [
      { label: "Homme", value: "m" },
      { label: "Femme", value: "f" },
      { label: "Je préfère ne pas répondre", value: "na" },
    ];

    SYMPTOM_OPTIONS = [
      { label: "Fièvre", value: "fever" },
      { label: "Frissons", value: "chills" },
      { label: "Tremblements", value: "shakes" },
      { label: "Une nouvelle toux ou une toux qui empire", value: "cough" },
      { label: "Essoufflement", value: "shortnessOfBreath" },
      { label: "Diarrhée", value: "diarrhea" },
      { label: "Nez qui coule", value: "runnyNose" },
      { label: "Mal de gorge", value: "soreThroat" },
    ];

    AGE_OPTIONS = [
      { label: "Moins de 18", value: "<18" },
      { label: "18-25", value: "18-25" },
      { label: "26-34", value: "26-34" },
      { label: "35-44", value: "35-44" },
      { label: "45-54", value: "45-54" },
      { label: "55-64", value: "55-64" },
      { label: "65-74", value: "65-74" },
      { label: "Plus de 75", value: ">75" },
    ];

    CONDITION_OPTIONS = [
      { label: "Diabète", value: "diabetes" },
      { label: "L’hypertension", value: "highBloodPressure" },
      { label: "Maladie cardio-vasculaire", value: "heartDisease" },
      { label: "Cancer actif", value: "cancer" },
      { label: "MPOC/Asthme", value: "breathingProblems" },
      { label: "Immunodéprimé(e)", value: "immunocompromised" },
      { label: "Maladie rénale", value: "kidneyDisease" },
      { label: "Antécédents d’AVC", value: "historyOfStroke" },
      { label: "Autre", value: "other" },
    ];

    NEED_OPTIONS = [
      { label: "Financial support", value: "financialSupport" },
      { label: "Emotional support", value: "emotionalSupport" },
      { label: "Medication/Pharmacy resources", value: "medication" },
      { label: "Food/Necessary resources", value: "food" },
      { label: "Other", value: "other" },
    ];

    break;
  case "enUS":
    YES_NO_OPTIONS = [
      { label: "Yes", value: "y" },
      { label: "No", value: "n" },
    ];

    SEX_OPTIONS = [
      { label: "Male", value: "m" },
      { label: "Female", value: "f" },
      { label: "Prefer not to respond", value: "na" },
    ];

    SYMPTOM_OPTIONS = [
      { label: "Fever", value: "fever" },
      { label: "Chills", value: "chills" },
      { label: "Shakes", value: "shakes" },
      { label: "New or worsening cough", value: "cough" },
      { label: "Shortness of breath", value: "shortnessOfBreath" },
      { label: "Diarrhea", value: "diarrhea" },
      { label: "Runny nose", value: "runnyNose" },
      { label: "Sore throat", value: "soreThroat" },
    ];

    AGE_OPTIONS = [
      { label: "Less than 18", value: "<18" },
      { label: "18-25", value: "18-25" },
      { label: "26-34", value: "26-34" },
      { label: "35-44", value: "35-44" },
      { label: "45-54", value: "45-54" },
      { label: "55-64", value: "55-64" },
      { label: "65-74", value: "65-74" },
      { label: "75 and greater", value: ">75" },
    ];

    CONDITION_OPTIONS = [
      { label: "Diabetes", value: "diabetes" },
      { label: "High blood pressure", value: "highBloodPressure" },
      { label: "Heart disease", value: "heartDisease" },
      { label: "Active cancer", value: "cancer" },
      { label: "COPD/Asthma", value: "breathingProblems" },
      { label: "Immunocompromised", value: "immunocompromised" },
      { label: "Kidney disease", value: "kidneyDisease" },
      { label: "History of stroke", value: "historyOfStroke" },
      { label: "Other", value: "other" },
    ];

    NEED_OPTIONS = [
      { label: "Financial support", value: "financialSupport" },
      { label: "Emotional support", value: "emotionalSupport" },
      { label: "Medication/Pharmacy resources", value: "medication" },
      { label: "Food/Necessary resources", value: "food" },
      { label: "Other", value: "other" },
    ];

    break;
  default:
}
