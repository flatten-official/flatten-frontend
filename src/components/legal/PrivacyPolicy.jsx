import React, { useEffect } from "react";
import i18next from "i18next";
const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const lang = i18next.language;
  let src =
    lang === "fr"
      ? "https://drive.google.com/file/d/1MxJo7fDJbp22mBulqyBt_G367RnL-Xzs/preview"
      : "https://drive.google.com/file/d/1ueuRMZ1BlKFvmMmJxNr6_ieHj543P4W6/preview";

  return (
    <div className="legal__body">
      <div className="title legal__title">Privacy Policy</div>
      <iframe src={src} className="pdf">
        <p>Your browser does not support iframes.</p>
      </iframe>
    </div>
  );
};
export default PrivacyPolicy;
