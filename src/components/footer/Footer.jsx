import React from "react";

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
                <a><p>About Us</p></a>
                <a><p>Sponsors</p></a>
            </div>
        </div>
        <div className="footer__pair">
            <div className="footer__section body">
                <p><b>Legal</b></p>
                <a><p>Terms of Service</p></a>
                <a><p>Privacy Policy</p></a>
            </div>
            <div className="footer__section body">
                <p><b>Contact Us</b></p>
                <a><p>flattenofficial@gmail.com</p></a>
            </div>
        </div>
            
        </div>
    </div>
    );
  }
}

export default Footer;
