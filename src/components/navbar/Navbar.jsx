import React from "react";
import { Link } from "react-scroll";
import { NavLink, useLocation } from "react-router-dom";
import { withTranslation } from "react-i18next";

import logo from "../../assets/logo-black.png";

const Navbar = ({ t }) => {
  let location = useLocation();
  console.log(location.pathname);
  let logoLink = null;
  let homeLink = null;
  let symptomsLink = null;
  let heatmapLink = null;

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
        Home
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
        Report Your Symptoms
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
        View Virus Data
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
        Home
      </a>
    );
    symptomsLink = (
      <a className="nav__a" href="/#symptoms">
        Report Your Symptoms
      </a>
    );
    heatmapLink = (
      <a className="nav__a" href="/#heatmap">
        View Virus Data
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
            COVID-19 Information
          </NavLink>
        </li>
      </div>
    </nav>
  );
};

export default withTranslation("Navbar")(Navbar);
