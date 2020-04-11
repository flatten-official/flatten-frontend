import React, { useEffect } from "react";
const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="legal__body">
      <div className="title legal__title">Privacy Policy</div>
      <iframe
        src="https://drive.google.com/file/d/1dbkrOLBBp_yqus-oeQ_JXdanDbdb8u-6/preview"
        className="pdf"
      >
        <p>Your browser does not support iframes.</p>
      </iframe>
    </div>
  );
};
export default PrivacyPolicy;
