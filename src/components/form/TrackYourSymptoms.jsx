import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { submit } from "redux-form";
import { withTranslation } from "react-i18next";

import { submitForm } from "../../actions/index";
import PrimaryButton from "../common/buttons/PrimaryButton";
import SymptomsForm, { symptomsFormName } from "./SymptomsForm";
import SyringeIcon from "../../assets/syringe.svg";

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
      <SymptomsForm onSubmit={handleSubmit} />
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
