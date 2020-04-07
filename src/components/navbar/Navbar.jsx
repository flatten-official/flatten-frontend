import React from "react";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";
import { withTranslation } from "react-i18next";

import logo from "../../assets/logo-black.png";

class Navbar extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <nav className="nav">
        <div className="nav__content body">
          <li className="nav__item navbar__logo-container">
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
          </li>
          <li className="nav__item nav__optional">
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
          </li>
          <li className="nav__item">
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
          </li>
          <li className="nav__item">
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
          </li>
          <li className="nav__info">
            <NavLink className="navbar__covid" exact to="/info">
              {t("info")}
            </NavLink>
          </li>
        </div>
      </nav>
    );
  }
}

export default withTranslation("Navbar")(Navbar);
