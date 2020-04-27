import React, { useEffect } from "react";
import { scroller } from "react-scroll";
import { withTranslation } from "react-i18next";

import Modal from "../common/modal/Modal";
import GiftIcon from "../../assets/gift.svg";
import FacebookButton from "../common/buttons/FacebookButton";
import TwitterButton from "../common/buttons/TwitterButton";

const SubmitModal = ({ onClose, t }) => {
  useEffect(
    () => () => {
      scroller.scrollTo("heatmap", {
        duration: 1000,
        smooth: true,
        offset: -70,
      });
    },
    []
  );

  return (
    <Modal className="submit-modal" onClose={onClose}>
      <div className="submit-modal__content body">
        <b>{t("thanks")}</b>
        <br />
        {t("heatmap-prompt")}
      </div>
      <GiftIcon className="submit-modal__gift-icon" />
      <div className="submit-modal__share">
        <FacebookButton />
        <TwitterButton />
      </div>
    </Modal>
  );
};

export default withTranslation("FormModal")(SubmitModal);
