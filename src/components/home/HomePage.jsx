import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Trans, withTranslation } from "react-i18next";

import { submitForm } from "../../actions/index";
import ReturningUserModal from "./ReturningUserModal";
import PrimaryButton from "../common/buttons/PrimaryButton";
import logo from "../../assets/logo-black.png";

import { scroller } from "react-scroll";

const scrollToForm = () => {
  scroller.scrollTo("symptoms", {
    duration: 800,
    delay: 0,
    smooth: "easeInOutQuad",
    offset: -70,
  });
};

const HomePage = ({ cookieStatus, t }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleReturningUserSubmit = async (values) => {
    await dispatch(submitForm(values));
    setShowModal(false);
  };

  let buttons = null;
  console.log(cookieStatus);
  switch (cookieStatus) {
    case "n":
      buttons = (
        <React.Fragment>
          <PrimaryButton
            className="home__button body"
            onClick={() => setShowModal(true)}
          >
            {t("returningUserButton")}
          </PrimaryButton>
          <br />

          <PrimaryButton className="home__button body" onClick={scrollToForm}>
            {t("newUserButton")}
          </PrimaryButton>
        </React.Fragment>
      );
      break;
    case "a":
      buttons = (
        <React.Fragment>
          <PrimaryButton
            className="home__button body"
            onClick={() => setShowModal(true)}
          >
            {t("returningUserButton")}
          </PrimaryButton>
        </React.Fragment>
      );
      break;
    case "e":
      buttons = (
        <React.Fragment>
          <PrimaryButton
            className="home__button body"
            onClick={() => setShowModal(true)}
          >
            {t("returningUserButton")}
          </PrimaryButton>
        </React.Fragment>
      );
      break;
    case "v":
      buttons = null;
      break;
    default:
      buttons = (
        <React.Fragment>
          <PrimaryButton
            className="home__button body"
            onClick={() => setShowModal(true)}
          >
            {t("returningUserButton")}
          </PrimaryButton>
          <br />

          <PrimaryButton className="home__button body" onClick={scrollToForm}>
            {t("newUserButton")}
          </PrimaryButton>
        </React.Fragment>
      );
  }

  return (
    <div className="home">
      <div className="home__content">
        <img className="home__logo" src={logo} alt="logo" />
        <div className="body home__description">
          <Trans t={t} i18nKey="chunk1">
            Flatten is a not-for-profit that focuses on using the
            <b>self-reported data of Canadians</b> to enable a tool that helps
            to slow the spread of COVID-19.
          </Trans>
          <br />
          <br />
          <Trans t={t} i18nKey="chunk2">
            To do your part, <b>fill in the form once a day</b>,
            <b>share with all of your friends</b>, and then tell them to
            <b>do the same</b>.
          </Trans>
        </div>
        {buttons}
      </div>
      {showModal && (
        <ReturningUserModal
          onClose={() => setShowModal(false)}
          onSubmit={handleReturningUserSubmit}
        />
      )}
    </div>
  );
};

export default withTranslation("HomePage")(HomePage);
