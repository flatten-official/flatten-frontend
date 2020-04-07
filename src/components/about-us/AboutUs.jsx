import React, { useEffect } from "react";
import { withTranslation } from "react-i18next";

import Profile from "./Profile";

const AboutUs = ({ t }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const volunteers = t("volunteers", { returnObjects: true });
  return (
    <React.Fragment>
      <section>
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
        <hr className="line" />
      </section>
      <section>
        <div className="about-us__body">
          {volunteers.map((volunteer, index) => (
            <Profile
              key={index}
              link={volunteer.link}
              name={volunteer.name}
              src={volunteer.src}
              key={index}
              role={volunteer.role}
              degrees={volunteer.degrees}
              titles={volunteer.titles}
            />
          ))}
        </div>
      </section>
    </React.Fragment>
  );
};

export default withTranslation("AboutUs")(AboutUs);
