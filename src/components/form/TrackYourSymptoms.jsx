import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { submit } from "redux-form";
import { withTranslation } from "react-i18next";
import i18next from "i18next";

import { submitForm } from "../../actions/index";
import PrimaryButton from "../common/buttons/PrimaryButton";
// DO NOT REPLACE
import { symptomsFormName } from "./SymptomsFormEn";
import SyringeIcon from "../../assets/syringe.svg";
import SymptomsFormEn from "./SymptomsFormEn";
import SymptomsFormFr from "./SymptomsFormFr";

const TrackYourSymptoms = ({ t }) => {
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();

  const handleClick = async () => {
    setSubmitting(true);
    await dispatch(submit(symptomsFormName));
    setSubmitting(false);
  };

  const handleSubmit = (values) => {
    dispatch(submitForm(values));
  };

  const i18nlang = i18next.language;
  let component = <SymptomsFormEn onSubmit={handleSubmit} />;
  switch (i18nlang) {
    case "en":
      component = <SymptomsFormEn onSubmit={handleSubmit} />;
      break;
    case "fr":
      component = <SymptomsFormFr onSubmit={handleSubmit} />;
      break;
    default:
      component = <SymptomsFormEn onSubmit={handleSubmit} />;
  }

  return (
    <div className="symptoms">
      <div className="symptoms__header">
        <div className="symptoms__title">
          <div className="title">{t("header")}</div>
          <SyringeIcon className="symptoms__syringe-icon" />
        </div>
        <p className="symptoms__description body">{t("description")}</p>
        <p className="symptoms__description body">
          <b>{t("disclaimer")} </b>
        </p>
      </div>
      {component}
      <div className="symptoms__submit">
        <PrimaryButton
          className="symptoms__submit-button"
          disabled={submitting}
          onClick={handleClick}
        >
          {t("submit")}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default withTranslation("Form")(TrackYourSymptoms);
