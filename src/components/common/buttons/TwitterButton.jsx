import React from "react";
import { TwitterShareButton, TwitterIcon } from "react-share";
import { withTranslation } from "react-i18next";

const TwitterButton = ({ t }) => {
  return (
    <div className="share-button">
      <div className="body">{t("twitter-caption")}</div>
      <TwitterShareButton url="https://flatten.ca">
        <TwitterIcon size="8vh" borderRadius="8px" />
      </TwitterShareButton>
    </div>
  );
};

export default withTranslation("FormModal")(TwitterButton);
