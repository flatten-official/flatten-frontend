import React, { useEffect } from "react";
import i18next from "i18next";
import { withTranslation } from "react-i18next";
const PrivacyPolicy = ({ t }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const lang = i18next.language;
  const src =
    lang === "fr"
      ? "https://drive.google.com/file/d/1MxJo7fDJbp22mBulqyBt_G367RnL-Xzs/preview"
      : "https://drive.google.com/file/d/1ueuRMZ1BlKFvmMmJxNr6_ieHj543P4W6/preview";

  return (
    <div className="legal__body">
      <div className="title legal__title">{t("PP")}</div>
      <iframe src={src} className="pdf">
        <p>{t("error")}</p>
      </iframe>
    </div>
  );
};
export default withTranslation("Legal")(PrivacyPolicy);
