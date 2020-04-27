import React, { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { useLocation } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { getGeolocation } from "../../actions";
import i18next from "i18next";

import history from "../../history";

const Navbar = ({ t, getGeolocation }) => {
  useEffect(() => {
    getGeolocation();
  }, []);

  const [value] = useState(i18next.language);
  const location = useLocation();
  const languageHandler = (event) => {
    const lang = event.currentTarget.value;
    const linkLang = `${location.pathname}?lang=${lang}`;
    history.push(linkLang);
  };

  let navbar;
  let symptomsLink;
  let heatmapLink;
  let infoLink;

  // for homepage scrolling links, scrolling animation
  if (location.pathname === ("/" || "#symptoms" || "#heatmap" || "#info")) {
    symptomsLink = (
      <Link
        activeClass="active"
        to="symptoms"
        spy={true}
        smooth={true}
        offset={-70}
        duration={1000}
        hashSpy={true}
        className="nav__link nav__text"
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
        className="nav__link nav__text"
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
        className="nav__link nav__text"
      >
        {t("info")}
      </Link>
    );

    navbar = (
      <Link
        activeClass="active"
        to="home"
        spy={true}
        smooth={true}
        offset={-70}
        duration={1000}
      >
        <div className="nav__logo">
          <div className="nav__logo-fixed nav__title">FLATTEN</div>
          <div className="nav__logo-animation nav__title">
            {symptomsLink}
            {heatmapLink}
            {infoLink}
            .CA
          </div>
          <hr />
        </div>
      </Link>
    );

    // for other miscellaneous pages, no scrolling animation
  } else {
    symptomsLink = (
      <a className="nav__link nav__text" href="/#symptoms">
        {t("form")}
      </a>
    );
    heatmapLink = (
      <a className="nav__link nav__text" href="/#heatmap">
        {t("heatmap")}
      </a>
    );
    infoLink = (
      <a className="nav__link nav__text" href="/#info">
        {t("info")}
      </a>
    );

    if (value === "so") {
      heatmapLink = null;
    }

    navbar = (
      <a href="/">
        <div className="nav__logo">
          <div className="nav__logo-fixed nav__title">FLATTEN</div>
          <div className="nav__logo-animation nav__title">
            {symptomsLink}
            {heatmapLink}
            {infoLink}
            .CA
          </div>
          <hr />
        </div>
      </a>
    );
  }

  return (
    <nav className="body nav">
      <div className="nav__container">
        {navbar}

        {/* language dropdown */}
        <select
          className="nav__lang nav__text"
          onChange={languageHandler}
          value={value}
        >
          <option value="en">en-ca</option>
          <option value="enUS">en-us</option>
          <option value="fr">fr</option>
          <option value="so">so</option>
        </select>
      </div>
    </nav>
  );
};

export default connect(null, { getGeolocation })(
  withTranslation("Navbar")(Navbar)
);
