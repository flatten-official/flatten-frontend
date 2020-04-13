import Recaptcha from "react-recaptcha";
import { RecaptchaKey } from "./Recaptcha.js";
import React from "react";

const RecaptchaField = ({
  lang,
  recaptchaLoaded,
  handleRecaptchaVerified,
  handleRecaptchaExpired,
}) => {
  const hl = lang.substring(0, 2);
  return (
    <Recaptcha
      sitekey={RecaptchaKey()}
      render="explicit"
      onloadCallback={recaptchaLoaded}
      verifyCallback={handleRecaptchaVerified}
      expiredCallback={handleRecaptchaExpired}
      hl={hl}
    />
  );
};

export default RecaptchaField;
