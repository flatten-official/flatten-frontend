import React from "react";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { withTranslation } from "react-i18next";

const FacebookButton = ({ t }) => {
  return (
    <div className="share-button">
      <div className="body">{t("facebook-caption")}</div>
      <FacebookShareButton url="https://flatten.ca">
        <FacebookIcon size="8vh" borderRadius="8px" />
      </FacebookShareButton>
    </div>
  );
};

export default withTranslation("FormModal")(FacebookButton);
