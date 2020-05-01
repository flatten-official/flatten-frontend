import React from "react";
import { withTranslation } from "react-i18next";
const Para1 = ({ t }) => (
  <React.Fragment>
    <div>
      {t("para1")}
      <ul>
        <li>{t("para1l1")}</li>
        <li>{t("para1l2")}</li>
        <li>{t("para1l3")}</li>
      </ul>
    </div>
    <span>{t("source")}</span>
    <a
      target="_blank"
      rel="noreferrer noopener"
      href="https://www.cdc.gov/coronavirus/2019-ncov/prepare/transmission.html"
    >
      {t("CDC")}
    </a>
  </React.Fragment>
);

export default withTranslation("Info")(Para1);
