import React, { useEffect } from "react";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";

import outlet from "./mediaOutlets.json";
import Profile from "./Outlet";

const Media = ({ t }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="media__container">
      <section className="media__header">
        <h4 className="media__title title">{t("header")}</h4>
        <div className="media__description">
          <p className="body">{t("p1")}</p>
        </div>
      </section>
      <div className="media__body">
        {outlet.outlet.map((story, index) => (
          <Profile key={index} t={t} outlet={story} />
        ))}
      </div>
    </div>
  );
};

Media.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("Media")(Media);
