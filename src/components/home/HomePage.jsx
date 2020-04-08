import React from "react";
import PrimaryButton from "../common/buttons/PrimaryButton";
import logo from "../../assets/logo-black.png";
import { Trans, withTranslation } from "react-i18next";

import { animateScroll as scroll, scroller } from "react-scroll";

const scrollToForm = () => {
  scroller.scrollTo("symptoms", {
    duration: 800,
    delay: 0,
    smooth: "easeInOutQuad",
  });
};

const HomePage = ({ cookieStatus, t }) => {
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
        <PrimaryButton className="home__button body">
          {t("button1")}
        </PrimaryButton>
        <br />
        {!cookieStatus && (
          <PrimaryButton className="home__button body" onClick={scrollToForm}>
            {t("button2")}
          </PrimaryButton>
        )}
      </div>
    </div>
  ) : null;
};

export default withTranslation("HomePage")(HomePage);
