import React from "react";
import { Link } from "react-scroll";
import { NavLink, useLocation } from "react-router-dom";
import { withTranslation } from "react-i18next";
import i18next from "i18next";

import logo from "../../assets/logo-black.png";

const options = ["en-ca", "en-us", "fr"];
const defaultOption = options[0];

const Navbar = ({ t }) => {
  let location = useLocation();
  let logoLink = null;
  let homeLink = null;
  let symptomsLink = null;
  let heatmapLink = null;

  const i18nlang = i18next.language;
  let toggle;
  let current;
  switch (i18nlang) {
    case "en":
      toggle = "fr";
      current = "en"
      
      break;
    case "fr":
      toggle = "en";
      current = "fr"
      break;
    default:
      toggle = "fr";
      current = "en"
  }
  let linkLang = `/?lang=${toggle}`;

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
        <li className={`nav__info_${current}`}>
          <NavLink className={`navbar__covid_${current}`} exact to="/info">
            {t("info")}
          </NavLink>
        </li>
        <select className="body nav__lang">
          <option className="body" value="en-ca">
            en-ca
          </option>
          <option className="body" value="en-us">
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

export default withTranslation("Navbar")(Navbar);
