import {
  isValidPostalCode,
  isValidEmail,
  isValidZipCode,
} from "../../../utils/formValidation";
import i18next from "i18next";

export let formValidation = [
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

switch (i18next.language) {
  case "en":
    formValidation = [
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
    break;
  case "fr":
    formValidation = [
      ["age", "L'âge est requis"],
      ["contactWithIllness", "Champ requis"],
      ["travelOutsideCanada", "Champ requis"],
      ["testedPositive", "Champ requis"],
      [
        "postalCode",
        "Le code postal est requis (ie. A1A)",
        ({ postalCode }) => isValidPostalCode(postalCode),
      ],
      ["sex", "Champ requis"],
      ["acknowledgement", "Veuillez accepter les conditions générales."],
      [
        "recaptchaVerification",
        "Veuillez prouver que vous n'êtes pas un robot.",
      ],
      [
        "email",
        "Veuillez saisir un e-mail valide.",
        ({ email }) => !email || isValidEmail(email),
      ],
    ];
    break;
  case "enUS":
    formValidation = [
      ["age", "Age is required"],
      ["contactWithIllness", "Field is required"],
      ["travelOutsideCanada", "Field is required"],
      ["testedPositive", "Field is required"],
      [
        "zipCode",
        "Zipcode is required (ie. 12345)",
        ({ zipCode }) => isValidZipCode(zipCode),
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
    break;
  default:
}
