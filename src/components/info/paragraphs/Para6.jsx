import React from "react";
import { withTranslation } from "react-i18next";
const Para6 = ({ t }) => (
  <React.Fragment>
    <p>{t("para6")}</p>
    <div>
      {t("para6p1")}
      <ul>
        <li>{t("para6l1")} </li>
        <li>{t("para6l2")}</li>
        <li>{t("para6l3")}</li>
      </ul>
    </div>

    <span>{t("source")}</span>
    <a
      target="_blank"
      rel="noreferrer noopener"
      href="https://www.canada.ca/en/public-health/services/publications/diseases-conditions/vulnerable-populations-covid-19.html"
    >
      {t("healthCAN")}
    </a>
  </React.Fragment>
);

export default withTranslation("Info")(Para6);
