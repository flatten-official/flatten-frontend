import React, { useState, useEffect } from "react";
import { submit } from "redux-form";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";

import { submitForm, setDailyCookie } from "../../actions/index";
import PrimaryButton from "../common/buttons/PrimaryButton";

import SymptomsForm, { symptomsFormName } from "./SymptomsForm";
import SubmitModal from "./SubmitModal";
import SyringeIcon from "../../assets/syringe.svg";

const TrackYourSymptoms = ({ t, dispatch, daily }) => {
  useEffect(() => {
    document.addEventListener("PaperformSubmission", submitSuccess);
  }, []);

  const submitSuccess = () => {
    dispatch(setDailyCookie());
  };
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    dispatch(submit(symptomsFormName));
  };

  const handleSubmit = (values) => {
    setShowModal(true);
    dispatch(submitForm(values));
  };

  const dailySubmissionStatus = daily && daily.exists;

  return !dailySubmissionStatus ? (
    <div className="symptoms" id="symptoms" name="symptoms">
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
      {/* <SymptomsForm onSubmit={handleSubmit} /> */}
      <div data-paperform-id="flatten-covid"></div>
      <div className="symptoms__submit">
        <button
          className="primary-button body symptoms__submit-button"
          data-paperform-id="flatten-covid"
          data-popup-button="1"
        >
          Click me to show the form!
        </button>
      </div>
      {/* <div className="symptoms__submit">
        <PrimaryButton
          className="symptoms__submit-button"
          id="google-form-submit"
          onClick={handleClick}
        >
          {t("submit")}
        </PrimaryButton>
      </div> */}
      {showModal && <SubmitModal onClose={() => setShowModal(false)} />}
    </div>
  ) : (
    <div className="symptoms symptoms__submitted title" id="symptoms">
      {t("submitted")}
    </div>
  );
};

const mapStateToProps = (state) => {
  if (state.cookie.status) {
    return { daily: state.cookie.status.daily };
  }
  return state;
};

const TrackYourSymptomsConnected = connect(mapStateToProps)(TrackYourSymptoms);

export default withTranslation("Form")(TrackYourSymptomsConnected);
