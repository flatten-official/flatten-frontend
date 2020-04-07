import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Trans, withTranslation } from "react-i18next";

import { submitForm } from "../../actions/index";
import ReturningUserModal from "./ReturningUserModal";
import PrimaryButton from "../common/buttons/PrimaryButton";
import logo from "../../assets/logo-black.png";


const HomePage = ({ cookieStatus, t }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleReturningUserSubmit = async (values) => {
    await dispatch(submitForm(values));
    setShowModal(false);
  };

  return cookieStatus !== "v" ? (
    <div className="home">
      <div className="home__content">
        <img className="home__logo" src={logo} alt="logo" />
        <div className="body home__description">
          <Trans t={t} i18nKey="chunk1">
            Flatten is designed to collect <b>real-time healthcare data</b>
            and
            <b> increase national awareness</b> throughout this difficult time
            during COVID-19.
          </Trans>
          <br />
          <br />
          <Trans t={t} i18nKey="chunk2">
            Our ultimate goal is to flatten the curve of COVID-19, and you can
            do your part by <b>filling out our form once a day</b>.
          </Trans>
        </div>
        <PrimaryButton
          className="home__button body"
          onClick={() => setShowModal(true)}
        >
          {t("returningUserButton")}
        </PrimaryButton>
        <br />
        {!cookieStatus && (
          <PrimaryButton className="home__button body">
            {t("newUserButton")}
          </PrimaryButton>
        )}
      </div>
      {showModal && (
        <ReturningUserModal
          onClose={() => setShowModal(false)}
          onSubmit={handleReturningUserSubmit}
        />
      )}
    </div>
  ) : null;
};

export default withTranslation("HomePage")(HomePage);
