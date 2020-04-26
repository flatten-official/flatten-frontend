import React, { useState, useEffect } from "react";
import { withTranslation } from "react-i18next";
import { scroller } from "react-scroll";

import PrimaryButton from "../common/buttons/PrimaryButton";
import FlattenLogo from "../common/logo/FlattenLogo";
import HomepageSplash from "../../assets/homepage.svg";
import HomepageMobileSplash from "../../assets/homepagemobile.svg";

const scrollToForm = () => {
  scroller.scrollTo("symptoms", {
    duration: 800,
    delay: 0,
    smooth: "easeInOutQuad",
    offset: -70,
  });
};

const HomePage = () => {
  const [isMobile, setIsMobile] = useState(false);

  const onResize = () => {
    if (isMobile !== window.innerWidth <= 600) {
      setIsMobile(window.innerWidth <= 600);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="home">
      {isMobile ? (
        <HomepageMobileSplash className="home__splash" />
      ) : (
        <HomepageSplash className="home__splash" />
      )}
      <div className="home__content">
        <div className="home__description">
          <div className="title">Data saves lives.</div>
          <div className="body">
            Add your data to our interactive map to flatten the COVID-19 curve
            in Canada.
          </div>
        </div>
        <div className="home__footer">
          <PrimaryButton className="home__button body" onClick={scrollToForm}>
            Add my data
          </PrimaryButton>
          <FlattenLogo />
        </div>
      </div>
    </div>
  );
};

export default withTranslation("HomePage")(HomePage);
