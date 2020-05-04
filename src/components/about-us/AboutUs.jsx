import React, { useEffect } from "react";
import { withTranslation } from "react-i18next";

import Profile from "./Profile";

const AboutUs = ({ t }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const devs = t("devs", { returnObjects: true });
  const advisors = t("advisors", { returnObjects: true });
  const team = t("team", { returnObjects: true });
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
        {devs.map((dev, index) => (
          <Profile
            key={index}
            link={dev.link}
            name={dev.name}
            src={dev.src}
            role={t("devs." + index + ".role")}
            degrees={dev.degrees}
          />
        ))}
      </div>
      <h4 className="about-us__title title">{t("advisorsHeader")}</h4>
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
      <h4 className="about-us__title title">{t("teamHeader")}</h4>
      <div className="about-us__body">
        {team.map((member, index) => (
          <Profile
            key={index}
            link={member.link}
            name={member.name}
            src={member.src}
            role={t("team." + index + ".role")}
            degrees={member.degrees}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default withTranslation("AboutUs")(AboutUs);
