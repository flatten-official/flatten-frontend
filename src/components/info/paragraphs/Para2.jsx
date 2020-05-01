import React from "react";
import { withTranslation } from "react-i18next";
const Para2 = ({ t }) => (
  <React.Fragment>
    <p>{t("para2p1")}</p>
    <p>{t("para2p2")}</p>
    <p>{t("para2p3")}</p>
    <span>{t("source")} </span>
    <a
      target="_blank"
      rel="noreferrer noopener"
      href="https://www.ontario.ca/page/2019-novel-coronavirus"
    >
      {t("healthontario")}
    </a>
  </React.Fragment>
);

export default withTranslation("Info")(Para2);
