import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { submit } from "redux-form";
import { withTranslation } from "react-i18next";
import i18next from "i18next";

import { submitForm } from "../../actions/index";
import PrimaryButton from "../common/buttons/PrimaryButton";
// DO NOT REPLACE
import { symptomsFormName } from "./SymptomsFormEn";
import SubmitModal from "./SubmitModal";
import SyringeIcon from "../../assets/syringe.svg";
import SymptomsFormEn from "./SymptomsFormEn";
import SymptomsFormFr from "./SymptomsFormFr";

const TrackYourSymptoms = ({ t }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(submit(symptomsFormName));
  };

  const handleSubmit = async (values) => {
    setShowModal(true);
    await dispatch(submitForm(values));
  };

  const handleSubmitSuccess = () => {
    // once the submitForm action is working, close the modal if submission was successful
    // setShowModal(false);
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
          onClick={handleClick}
        >
          {t("submit")}
        </PrimaryButton>
      </div>
      {showModal && <SubmitModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default withTranslation("Form")(TrackYourSymptoms);
