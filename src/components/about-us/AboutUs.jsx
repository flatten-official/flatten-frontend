import React, { useEffect } from "react";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";

import people from "./people.json";
import Profile from "./Profile";
import Contributors from "./Contributors";

// TODO : Refactor so data and translations are separate.

const AboutUs = ({ t }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <React.Fragment>
      <div className="about-us__container">
        <section className="about-us__header">
          <h4 className="about-us__title title">{t("header")}</h4>
          <div className="about-us__description">
            <p className="body">{t("p1")}</p>
            <p className="body">
              {t("contact")}
              <a className="email-link" href="mailto:flattenofficial@gmail.com">
                flattenofficial@gmail.com
              </a>
            </p>
          </div>
        </section>

        <div className="about-us__body">
          {people.team.map((person, index) => (
            <Profile key={index} t={t} person={person} />
          ))}
        </div>

        <h4 className="about-us__title title">{t("contributorsHeader")}</h4>
        <div className="about-us__body">
          {people.contributors.map((name, index) => (
            <Contributors key={index} name={name} />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

AboutUs.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("AboutUs")(AboutUs);
