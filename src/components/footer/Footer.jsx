import React from "react";
import { Link } from "react-router-dom";
class Footer extends React.Component {
  render() {
    return (
    <div className="footer">
        <div className="footer__container">
            <div className="footer__pair">
                <div className="footer__section body">
                    <p><b>Feedback Form</b></p>
                    <a><p>TBD</p></a>
                </div>
                <div className="footer__section body">
                    <p><b>Additional Information</b></p>
                    <Link className="footer__link" to="/about-us"><p>About Us</p></Link>
                    <Link className="footer__link" to="/supporters"><p>Supporters</p></Link>
                </div>
            </div>
            <div className="footer__pair">
                <div className="footer__section body">
                    <p><b>Legal</b></p>
                    <a className="footer__link" href="https://drive.google.com/file/d/1Cb9yb1zFXrQs0TKIAytx-16vCuHpJBDc/view"><p>Terms of Service</p></a>
                    <a className="footer__link" href="https://drive.google.com/file/d/1dbkrOLBBp_yqus-oeQ_JXdanDbdb8u-6/view"><p>Privacy Policy</p></a>
                </div>
                <div className="footer__section body">
                    <p><b>Contact Us</b></p>
                    <a><p></p></a>
                    <a className="footer__link" href="mailto:flattenofficial@gmail.com"><p>flattenofficial@gmail.com</p></a>
                </div>
            </div>
        </div>
    </div>
    );
  }
}

export default Footer;
