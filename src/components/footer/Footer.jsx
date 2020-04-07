import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

class Footer extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <div className="footer">
        <div className="footer__container">
          <div className="footer__pair">
            <div className="footer__section body">
              <p>
                <b>{t("feedback")}</b>
              </p>
              <a>
                <p>{t("feedback-link")}</p>
              </a>
            </div>
            <div className="footer__section body">
              <p>
                <b>{t("additional-info")}</b>
              </p>
              <Link className="footer__link" to="/about-us">
                <p>{t("about-us")}</p>
              </Link>
              <Link className="footer__link" to="/supporters">
                <p>{t("supporters")}</p>
              </Link>
            </div>
          </div>
          <div className="footer__pair">
            <div className="footer__section body">
              <p>
                <b>{t("legal")}</b>
              </p>
              <a
                className="footer__link"
                href="https://drive.google.com/file/d/1Cb9yb1zFXrQs0TKIAytx-16vCuHpJBDc/view"
              >
                <p>{t("tos")}</p>
              </a>
              <a
                className="footer__link"
                href="https://drive.google.com/file/d/1dbkrOLBBp_yqus-oeQ_JXdanDbdb8u-6/view"
              >
                <p>{t("privacy")}</p>
              </a>
            </div>
            <div className="footer__section body">
              <p>
                <b>{t("contact")}</b>
              </p>
              <a
                className="footer__link"
                href="mailto:flattenofficial@gmail.com"
              >
                <p>flattenofficial@gmail.com</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation("Footer")(Footer);
