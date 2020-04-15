import React, { useEffect } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";

import { setDailyCookie } from "../../actions/index";

import SyringeIcon from "../../assets/syringe.svg";

const TrackYourSymptoms = ({ t, dispatch, daily }) => {
  useEffect(() => {
    document.addEventListener("PaperformSubmission", submitSuccess);
  }, []);

  const submitSuccess = () => {
    dispatch(setDailyCookie());
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
      <div data-paperform-id="flatten-covid"></div>
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
