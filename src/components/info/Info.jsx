import React, { useEffect } from "react";
import { withTranslation } from "react-i18next";
import i18next from "i18next";

import InfoEn from "./InfoEn";
import InfoFr from "./InfoFr";

const Info = ({ t }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const i18nlang = i18next.language;

  let component = <InfoEn />;
  switch (i18nlang) {
    case "fr":
      component = <InfoFr />;
      break;
    case "en":
    default:
      component = <InfoEn />;
  }

  return (
    <div id="info">
      <div className="info__headercontainer">
        <h4 className="title info__title">{t("header")}</h4>
        <div className="body info__description">{t("body")}</div>
      </div>
      {component}
    </div>
  );
};

export default withTranslation("Info")(Info);
