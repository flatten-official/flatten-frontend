import React from "react";
import { withTranslation } from "react-i18next";
const Para4 = ({ t }) => (
  <React.Fragment>
    <p>{t("para4p1")}</p>
    <p>{t("para4p2")}</p>
    <span>{t("sources")}</span>
    <a
      target="_blank"
      rel="noreferrer noopener"
      href="https://www.ontario.ca/page/2019-novel-coronavirus"
    >
      {t("govON")}
    </a>
    <span>, </span>
    <a
      target="_blank"
      rel="noreferrer noopener"
      href="https://www.cdc.gov/coronavirus/2019-ncov/if-you-are-sick/steps-when-sick.html"
    >
      {t("CDC")}
    </a>
  </React.Fragment>
);

export default withTranslation("Info")(Para4);
