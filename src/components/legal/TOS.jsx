import React from "react";
import Navbar from "../navbar/Navbar";
const TOS = () => (
  <>
    <Navbar/>
    <div className="legal__body">
      <div className="title legal__title">Terms Of Service</div>
      <iframe
        src="https://drive.google.com/file/d/1Cb9yb1zFXrQs0TKIAytx-16vCuHpJBDc/preview"
        className="pdf"
      >
        <p>Your browser does not support iframes.</p>
      </iframe>
    </div>
  </>
);

export default TOS;
