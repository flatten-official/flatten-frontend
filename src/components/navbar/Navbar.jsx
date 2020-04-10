import React from "react";
import { Link } from "react-scroll";
import { NavLink, useLocation } from "react-router-dom";
import { withTranslation } from "react-i18next";
import i18next from "i18next";
import history from "../../history";

import logo from "../../assets/logo-black.png";

const Navbar = ({ t }) => {
  let location = useLocation();
  let logoLink = null;
  let homeLink = null;
  let symptomsLink = null;
  let heatmapLink = null;

  const i18nlang = i18next.language;
  console.log(i18nlang);
  let toggle;
  let current;
  let selectedEn = false;
  let selectedUs = false;
  let selectedFr = false;
  switch (i18nlang) {
    case "en":
      toggle = "fr";
      current = "en";
      selectedEn = true;
      break;
    case "enUS":
      toggle = "fr";
      current = "en";
      selectedUs = true;
      break;
    case "fr":
      toggle = "en";
      current = "fr";
      selectedFr = true;
      break;
    default:
      toggle = "fr";
      current = "en";
      selectedEn = true;
  }

  const languageHandler = (event) => {
    let lang = event.currentTarget.value;
    let linkLang = `${location.pathname}?lang=${lang}`;
    history.push(linkLang);
  };

  if (location.pathname == ("/" || "#symptoms" || "#heatmap")) {
    logoLink = (
      <Link
        activeClass="active"
        to="home"
        spy={true}
        smooth={true}
        offset={-70}
        duration={1000}
      >
        <img className="navbar__logo" src={logo} />
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
  } else {
    logoLink = (
      <a href="/">
        <img className="navbar__logo" src={logo} />
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
  }

  return (
    <nav className="nav">
      <div className="nav__content body">
        <li className="nav__item navbar__logo-container">{logoLink}</li>
        <li className={`nav__item_en nav__optional`}>{homeLink}</li>
        <li className={`nav__item_${current}`}>{symptomsLink}</li>
        <li className={`nav__item_${current}`}>{heatmapLink}</li>
        <NavLink className={`navbar__covid_${current}`} exact to="/info">
          {t("info")}
        </NavLink>
        <select className="body navbar__lang" onChange={languageHandler}>
          <option className="body" value="en" selected={selectedEn}>
            en-ca
          </option>
          <option className="body" value="enUS" selected={selectedUs}>
            en-us
          </option>
          <option className="body" value="fr" selected={selectedFr}>
            fr
          </option>
        </select>
      </div>
    </nav>
  );
};

export default withTranslation("Navbar")(Navbar);
