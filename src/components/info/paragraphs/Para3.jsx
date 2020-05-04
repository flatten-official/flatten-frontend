import React from "react";
import { withTranslation } from "react-i18next";
const Para3 = ({ t }) => (
  <React.Fragment>
    <p>{t("para3p1")}</p>
    <p>{t("para3p2")}</p>
    <p>
      <a
        target="_blank"
        rel="noreferrer noopener"
        href="https://www.canada.ca/en/health-canada/services/drugs-health-products/disinfectants/covid-19/list.html"
      >
        {t("para3p3")}
      </a>
    </p>

    <span>{t("source")}</span>
    <a
      target="_blank"
      rel="noreferrer noopener"
      href="https://www.cdc.gov/coronavirus/2019-ncov/prepare/prevention.html"
    >
      {t("CDC")}
    </a>
  </React.Fragment>
);

export default withTranslation("Info")(Para3);
