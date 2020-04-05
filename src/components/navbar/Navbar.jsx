import React from "react";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";

import logo from "../../assets/logo-black.png";

class Navbar extends React.Component {
  render() {
    return (
      <nav className="nav">
        <div className="nav__content body">
          <li className="nav__item">
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
              Home
            </Link>
          </li>
          <li className="nav__item">
            <Link
              activeClass="active"
              to="symptoms__root"
              spy={true}
              smooth={true}
              duration={1000}
            >
              Report Your Symptoms
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
              View Virus Data
            </Link>
          </li>
          <li className="nav__info nav__optional">
            <NavLink className="body" exact to="/info">
              COVID-19 Information
            </NavLink>
          </li>
        </div>
      </nav>
    );
  }
}

export default Navbar;
