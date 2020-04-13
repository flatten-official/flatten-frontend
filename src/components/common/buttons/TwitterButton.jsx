import React from "react";
import { TwitterShareButton, TwitterIcon } from "react-share";

const TwitterButton = () => {
  return (
    <div className="share-button">
      <div className="body">Tweet</div>
      <TwitterShareButton url="https://flatten.ca">
        <TwitterIcon size="8vh" borderRadius="8px" />
      </TwitterShareButton>
    </div>
  );
};

export default TwitterButton;
