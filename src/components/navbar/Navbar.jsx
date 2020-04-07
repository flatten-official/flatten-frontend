import React from "react";
import { Link } from "react-scroll";
import { NavLink, useLocation } from "react-router-dom";
import { withTranslation } from "react-i18next";
import i18next from "i18next";

import logo from "../../assets/logo-black.png";

const Navbar = ({ t }) => {
  let location = useLocation();
  let logoLink = null;
  let homeLink = null;
  let symptomsLink = null;
  let heatmapLink = null;

  const i18nlang = i18next.language;
  let toggle;
  switch (i18nlang) {
    case "en":
      toggle = "fr";
      break;
    case "fr":
      toggle = "en";
      break;
  }
  let linkLang = `/?lang=${toggle}`;

  if (location.pathname == ("/" || "#symtpoms" || "#heatmap")) {
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
        <li className="nav__item nav__optional">{homeLink}</li>
        <li className="nav__item">{symptomsLink}</li>
        <li className="nav__item">{heatmapLink}</li>
        <li className="nav__info">
          <NavLink className="navbar__covid" exact to="/info">
            {t("info")}
          </NavLink>
          <a href={linkLang} className="navbar__lang">
            {toggle}
          </a>
        </li>
      </div>
    </nav>
  );
};

export default withTranslation("Navbar")(Navbar);
