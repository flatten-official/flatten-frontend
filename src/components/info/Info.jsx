import React from "react";
import { withTranslation } from "react-i18next";
import i18next from "i18next";

import InfoEn from "./InfoEn";
import InfoFr from "./InfoFr";

const Info = ({ t }) => {
  const i18nlang = i18next.language;

  let component = <InfoEn />;
  switch (i18nlang) {
    case "en":
      component = <InfoEn />;
      break;
    case "fr":
      component = <InfoFr />;
      break;
    default:
      component = <InfoEn />;
  }

  return (
    <React.Fragment>
      <h4 className="title info__title">{t("header")}</h4>
      {component}
    </React.Fragment>
  );
};

export default withTranslation("Info")(Info);
