import React from "react";
import { withTranslation } from "react-i18next";
const Para0 = ({ t }) => (
  <React.Fragment>
    <p>{t("para0")}</p>
    <span>{t("source")}</span>
    <a
      target="_blank"
      rel="noreferrer noopener"
      href="https://www.who.int/health-topics/coronavirus"
    >
      {t("WHO")}
    </a>
  </React.Fragment>
);

export default withTranslation("Info")(Para0);
