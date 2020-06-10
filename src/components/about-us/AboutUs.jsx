import React, { useEffect } from "react";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";

import Profile from "./Profile";
import OldProfile from "./OldProfile";

// TODO : Refactor so data and translations are separate.

const AboutUs = ({ t }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tier1 = t("tier1", { returnObjects: true });
  const tier2 = t("tier2", { returnObjects: true });
  const tier3 = t("tier3", { returnObjects: true });
  const advisors = t("advisors", { returnObjects: true });
  const tier4 = t("tier4", { returnObjects: true });
  const oldTeam = t("oldTeam", { returnObjects: true });
  return (
    <React.Fragment>
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
        {tier1.map((tier1, index) => (
          <Profile
            key={index}
            link={tier1.link}
            name={tier1.name}
            src={tier1.src}
            role={t("tier1." + index + ".role")} // Not using tier1.role because won't work if translation is missing.
            degrees={tier1.degrees}
          />
        ))}
      </div>

      <div className="about-us__body">
        {tier2.map((tier2, index) => (
          <Profile
            key={index}
            link={tier2.link}
            name={tier2.name}
            src={tier2.src}
            role={t("tier2." + index + ".role")} // Not using tier2.role because won't work if translation is missing.
            degrees={tier2.degrees}
          />
        ))}
      </div>

      <div className="about-us__body">
        {tier3.map((tier3, index) => (
          <Profile
            key={index}
            link={tier3.link}
            name={tier3.name}
            src={tier3.src}
            role={t("tier3." + index + ".role")} // Not using tier3.role because won't work if translation is missing.
            degrees={tier3.degrees}
          />
        ))}
      </div>

      <div className="about-us__body">
        {advisors.map((advisor, index) => (
          <Profile
            key={index}
            link={advisor.link}
            name={advisor.name}
            src={advisor.src}
            role={t("advisors." + index + ".role")}
            degrees={advisor.degrees}
            titles={t("advisors." + index + ".titles")}
          />
        ))}
      </div>

      <div className="about-us__body">
        {tier4.map((tier4, index) => (
          <Profile
            key={index}
            link={tier4.link}
            name={tier4.name}
            src={tier4.src}
            role={t("tier4." + index + ".role")} // Not using tier4.role because won't work if translation is missing.
            degrees={tier4.degrees}
          />
        ))}
      </div>

      <h4 className="about-us__title title">{t("oldTeamHeader")}</h4>
      <div className="about-us__body">
        {oldTeam.map((member, index) => (
          <OldProfile key={index} name={oldTeam.name} />
        ))}
      </div>
    </React.Fragment>
  );
};

AboutUs.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("AboutUs")(AboutUs);
