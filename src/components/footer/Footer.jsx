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
    // TODO : Include French version (and improve message)
    const title =
      "I helped flatten the curve of COVID-19 by filling out a form for an interactive heatmap, check it out here: www.flatten.ca";

    return (
      <div className="footer">
        <div className="footer__container">
          <div className="footer__pair">
            <div className="footer__section body">
              <p>
                <b>{t("share")}</b>
              </p>
              <span className="footer__icon">
                <FacebookShareButton url={url} quote={title}>
                  <FacebookIcon size={32} round={true} />
                </FacebookShareButton>
              </span>
              <span className="footer__icon">
                <TwitterShareButton url={url} title={title}>
                  <TwitterIcon size={32} round={true} />
                </TwitterShareButton>
              </span>
              <LinkedinShareButton url={url} title={title}>
                <LinkedinIcon size={32} round={true} />
              </LinkedinShareButton>
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
              <Link className="footer__link" to="/terms-of-service">
                <p>{t("tos")}</p>
              </Link>
              <Link className="footer__link" to="/privacy-policy">
                <p>{t("privacy")}</p>
              </Link>
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
              <a className="footer__link" href="https://blog.flatten.ca">
                <p>Blog</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation("Footer")(Footer);
