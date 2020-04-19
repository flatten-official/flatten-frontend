import React, { useEffect } from "react";
import i18next from "i18next";
const TOS = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const lang = i18next.language;
  let src =
    lang === "fr"
      ? "https://drive.google.com/file/d/1p8L0_pj0jAuuDKBvmx13r6p3SZZfBxgp/preview"
      : "https://drive.google.com/file/d/1diVRWxk7E1JzsXhPyzaN4IjcwHzEwx08/preview";

  return (
    <div className="legal__body">
      <div className="title legal__title">Terms Of Service</div>
      <iframe src={src} className="pdf">
        <p>Your browser does not support iframes.</p>
      </iframe>
    </div>
  );
};

export default TOS;
