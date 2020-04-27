import React, { useEffect } from "react";
import { Trans, withTranslation } from "react-i18next";
import { scroller } from "react-scroll";
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
        <b>
          <Trans t={t} i18nKey="thanks">
            Thank you for submitting our form!
          </Trans>
        </b>
        <br />
        <Trans t={t} i18nKey="heatmap-prompt">
          Exit to go to the heatmap.
        </Trans>
      </div>
      <GiftIcon className="submit-modal__gift-icon" />
      <div className="submit-modal__share">
        <FacebookButton />
        <TwitterButton />
      </div>
    </Modal>
  );
};

export default withTranslation("FormSubmissionPopup")(SubmitModal);
