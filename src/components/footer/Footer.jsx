import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  LinkedinIcon,
  LinkedinShareButton,
} from "react-share";

class Footer extends React.Component {
  render() {
    const { t } = this.props;
    const url = "www.flatten.ca";
    const title =
      "I helped flatten the curve of COVID-19 by filling out a form for an interactive heatmap, check it out here: www.flatten.ca";

    return (
      <div className="footer">
        <div className="footer__container">
          <div className="footer__pair">
            <div className="footer__section body">
              <b>{t("additional-info")}</b>
              <Link className="footer__link" to="/about-us">
                {t("about-us")}
              </Link>
              <Link className="footer__link" to="/supporters">
                {t("supporters")}
              </Link>
            </div>
            <div className="footer__section body">
              <b>{t("legal")}</b>
              <Link className="footer__link" to="/terms-of-service">
                {t("tos")}
              </Link>
              <Link className="footer__link" to="/privacy-policy">
                {t("privacy")}
              </Link>
            </div>
          </div>
          <div className="footer__pair">
            <div className="footer__section body">
              <b>{t("contact")}</b>
              <a
                className="footer__link"
                href="mailto:flattenofficial@gmail.com"
              >
                flattenofficial@gmail.com
              </a>
              <a className="footer__link" href="https://blog.flatten.ca">
                Blog
              </a>
            </div>

            <div className="footer__section body">
              <b>{t("share")}</b>
              <div className="footer__icon-container">
                <span className="footer__icon">
                  <FacebookShareButton url={url} quote={title}>
                    <FacebookIcon size={32} round bgStyle={{ fill: "black" }} />
                  </FacebookShareButton>
                </span>
                <span className="footer__icon">
                  <TwitterShareButton url={url} title={title}>
                    <TwitterIcon size={32} round bgStyle={{ fill: "black" }} />
                  </TwitterShareButton>
                </span>
                <span className="footer__icon">
                  <LinkedinShareButton url={url} title={title}>
                    <LinkedinIcon size={32} round bgStyle={{ fill: "black" }} />
                  </LinkedinShareButton>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation("Footer")(Footer);
