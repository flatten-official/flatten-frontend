import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import i18next from "i18next";
import SubmitModal from "./SubmitModal";

import { setDailyCookie } from "../../actions/index";

import SyringeIcon from "../../assets/syringe.svg";

const TrackYourSymptoms = ({ t, dispatch, daily }) => {
  const [showModal, setShowModal] = useState(true);

  const lang = i18next.language;
  let formID;

  switch (lang) {
    case "fr":
      formID = "flatten-covid-fr";
      break;
    case "enUS":
      formID = "flatten-covid-enus";
      break;
    case "so":
      formID = "azzve9ao";
      break;
    default:
      formID = "flatten-covid";
  }
  useEffect(() => {
    document.addEventListener("PaperformSubmission", submitSuccess);
    return () =>
      document.removeEventListener("PaperformSubmission", submitSuccess);
  }, []);

  const submitSuccess = () => {
    dispatch(setDailyCookie());
    setShowModal(true);
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
      <div data-paperform-id={formID} />
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
