import React, { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { NavLink, useLocation } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { getGeolocation } from "../../actions";
import i18next from "i18next";

import history from "../../history";

import logo from "../../assets/logo-black.png";

const Navbar = ({ t, getGeolocation }) => {
  useEffect(() => {
    getGeolocation();
  }, []);

  const [value] = useState(i18next.language);

  const location = useLocation();

  let logoLink;
  let homeLink;
  let symptomsLink;
  let heatmapLink;
  let infoLink;

  const current = value === "fr" ? "fr" : "en";

  const languageHandler = (event) => {
    const lang = event.currentTarget.value;
    const linkLang = `${location.pathname}?lang=${lang}`;
    history.push(linkLang);
  };

  if (location.pathname === ("/" || "#symptoms" || "#heatmap")) {
    logoLink = (
      <Link
        activeClass="active"
        to="home"
        spy={true}
        smooth={true}
        offset={-70}
        duration={1000}
      >
        <img className="nav__logo" src={logo} />
      </Link>
    );
    homeLink = (
      <Link
        activeClass="active"
        to="home"
        spy={true}
        smooth={true}
        offset={-70}
        duration={1000}
        hashSpy={true}
      >
        {t("home")}
      </Link>
    );
    symptomsLink = (
      <Link
        activeClass="active"
        to="symptoms"
        spy={true}
        smooth={true}
        offset={-70}
        duration={1000}
        hashSpy={true}
      >
        {t("form")}
      </Link>
    );
    heatmapLink = (
      <Link
        activeClass="active"
        to="heatmap"
        spy={true}
        smooth={true}
        offset={-70}
        duration={1000}
        hashSpy={true}
      >
        {t("heatmap")}
      </Link>
    );
    infoLink = (
      <Link
        activeClass="active"
        to="info"
        spy={true}
        smooth={true}
        offset={-70}
        duration={1000}
        hashSpy={true}
      >
        {t("info")}
      </Link>
    );
  } else {
    logoLink = (
      <a href="/">
        <img className="nav__logo" src={logo} />
      </a>
    );
    homeLink = (
      <a className="nav__a" href="/">
        {t("home")}
      </a>
    );
    symptomsLink = (
      <a className="nav__a" href="/#symptoms">
        {t("form")}
      </a>
    );
    heatmapLink = (
      <a className="nav__a" href="/#heatmap">
        {t("heatmap")}
      </a>
    );
    infoLink = (
      <a className="nav__a" href="/#info">
        {t("info")}
      </a>
    );
  }

  return (
    <nav className="nav">
      <div className="nav__content body">
        <li className="nav__item nav__logo-container">{logoLink}</li>
        <li className={`nav__item-en nav__optional`}>{homeLink}</li>
        <li className={`nav__item-${current}`}>{symptomsLink}</li>
        <li className={`nav__item-${current}`}>{heatmapLink}</li>
        <li className={`nav__item-${current}`}>{infoLink}</li>
        <select
          className="body nav__lang"
          onChange={languageHandler}
          value={value}
        >
          <option className="body" value="en">
            en-ca
          </option>
          <option className="body" value="enUS">
            en-us
          </option>
          <option className="body" value="fr">
            fr
          </option>
        </select>
      </div>
    </nav>
  );
};

export default connect(null, { getGeolocation })(
  withTranslation("Navbar")(Navbar)
);
