import React from "react";
import { Link } from "react-router-dom";
class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="footer__container">
          <div className="footer__pair">
            <div className="footer__section body">
              <p>
                <b>Feedback Form</b>
              </p>
              <a>
                <p>TBD</p>
              </a>
            </div>
            <div className="footer__section body">
              <p>
                <b>Additional Information</b>
              </p>
              <Link className="footer__link" to="/about-us">
                <p>About Us</p>
              </Link>
              <Link className="footer__link" to="/supporters">
                <p>Supporters</p>
              </Link>
            </div>
          </div>
          <div className="footer__pair">
            <div className="footer__section body">
              <p>
                <b>Legal</b>
              </p>
              <Link className="footer__link" to="/terms-of-service">
                <p>Terms of Service</p>
              </Link>
              <Link className="footer__link" to="/privacy-policy">
                <p>Privacy Policy</p>
              </Link>
            </div>
            <div className="footer__section body">
              <p>
                <b>Contact Us</b>
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

export default Footer;
