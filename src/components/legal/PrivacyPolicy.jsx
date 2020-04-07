import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
const PrivacyPolicy = () => (
  <>
    <Navbar/>
    <div className="legal__body">
      <div className="title legal__title">Privacy Policy</div>
      <iframe
        src="https://drive.google.com/file/d/1dbkrOLBBp_yqus-oeQ_JXdanDbdb8u-6/preview"
        className="pdf"
      >
        <p>Your browser does not support iframes.</p>
      </iframe>
    </div>
    <Footer/>
  </>
);

export default PrivacyPolicy;
