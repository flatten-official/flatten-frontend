import React from "react";
import { FacebookShareButton, FacebookIcon } from "react-share";

const FacebookButton = () => (
  <div className="share-button">
    <div className="body">Share</div>
    <FacebookShareButton url="https://flatten.ca">
      <FacebookIcon size="8vh" borderRadius="8px" />
    </FacebookShareButton>
  </div>
);

export default FacebookButton;
