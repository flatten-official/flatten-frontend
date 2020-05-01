import React from "react";
import { withTranslation } from "react-i18next";
const Para5 = ({ t }) => (
  <React.Fragment>
    <p>{t("para5")}</p>
    <span>{t("source")}</span>
    <a
      target="_blank"
      rel="noreferrer noopener"
      href="https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection/health-professionals/public-health-measures-mitigate-covid-19.html"
    >
      {t("govCAN")}
    </a>
  </React.Fragment>
);

export default withTranslation("Info")(Para5);
