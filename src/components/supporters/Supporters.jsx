import React, { useEffect } from "react";
import { withTranslation } from "react-i18next";

const Supporters = ({ t }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const companies = t("companies", { returnObjects: true });

  return (
    <React.Fragment>
      <h4 className="supporters__title title">{t("header")}</h4>
      <div>
        <p className="supporters__description body">{t("description")}</p>
        <p className="supporters__contact body">
          {t("contact")}
          <a className="email-link" href="mailto:flattenofficial@gmail.com">
            flattenofficial@gmail.com
          </a>
        </p>
      </div>

      <hr className="line" />
      {companies.map((company, index) => (
        <div key={index} className="supporters__card">
          <a
            className="supporters__link title"
            href={company.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {company.name}
          </a>
        </div>
      ))}
    </React.Fragment>
  );
};

export default withTranslation("Supporters")(Supporters);
