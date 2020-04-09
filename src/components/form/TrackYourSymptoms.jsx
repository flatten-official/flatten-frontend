import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { submit } from "redux-form";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";

import { submitForm } from "../../actions/index";
import PrimaryButton from "../common/buttons/PrimaryButton";
// DO NOT REPLACE
import { symptomsFormName } from "./SymptomsForm";
import SubmitModal from "./SubmitModal";
import SyringeIcon from "../../assets/syringe.svg";

import SymptomsForm from "./SymptomsForm";

const TrackYourSymptoms = ({ daily }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const { t } = useTranslation("Form");

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

  let status = true;
  if (daily) {
    status = !daily.exists;
  }
  return status ? (
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
      {/* {component} */}
      <SymptomsForm onSubmit={handleSubmit} />
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
  ) : (
    <div className="title symptomsSubmitted" id="symptoms">
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

export default connect(mapStateToProps)(TrackYourSymptoms);
