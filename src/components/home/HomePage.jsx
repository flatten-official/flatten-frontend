import React from "react";
import { Trans, withTranslation } from "react-i18next";
import i18next from "i18next";
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

const HomePage = ({ t }) => {
  const soMap = i18next.language === "so" ? "home home-so" : "home";
  return (
    <div className={soMap}>
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
            To do your part, <b>fill in the form when your symptoms change</b>,
            <b>share with all of your friends</b>, and then tell them to
            <b>do the same</b>.
          </Trans>
        </div>
        <PrimaryButton className="home__button body" onClick={scrollToForm}>
          {t("newUserButton")}
        </PrimaryButton>
        <PrimaryButton className="home__button body" onClick={scrollToForm}>
          {t("about-us")}
        </PrimaryButton>
        <PrimaryButton className="home__button body" onClick={scrollToForm}>
          {t("Blog")}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default withTranslation("HomePage")(HomePage);
