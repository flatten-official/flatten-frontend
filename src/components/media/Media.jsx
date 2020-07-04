import React, { useEffect } from "react";
import { ReactTinyLink } from "react-tiny-link";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";

const Media = ({ t }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-us__container">
      <section className="about-us__header">
        <h4 className="about-us__title title">{t("mediaPage")}</h4>
        <div className="about-us__description">
          <p className="body">{t("description")}</p>
        </div>
        <ReactTinyLink
          cardSize="small"
          showGraphic={true}
          maxLine={2}
          minLine={1}
          url="https://www.amazon.com/Steve-Madden-Mens-Jagwar-10-5/dp/B016X44MKA/ref=lp_18637582011_1_1?srs=18637582011&ie=UTF8&qid=1550721409&sr=8-1"
        />
      </section>
    </div>
  );
};

Media.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("Media")(Media);
