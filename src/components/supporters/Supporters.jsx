import React, { useEffect } from "react";
import GiftIcon from "../../assets/gift.svg";
import { withTranslation } from "react-i18next";

const Supporters = ({ t }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const companies = t("companies", { returnObjects: true });

  return (
    <React.Fragment>
      <div className="body supporters__header">
        <h4 className="title">{t("header")}</h4>
        {t("description")}
        <br />
        <br />
        {t("contact")}
        <a className="email-link" href="mailto:flattenofficial@gmail.com">
          flattenofficial@gmail.com
        </a>
        <GiftIcon className="supporters__icon" />
      </div>

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
