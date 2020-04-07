import React, { useEffect } from "react";
import { scroller } from "react-scroll";
import CloseIcon from "../../assets/close.svg";
import GiftIcon from "../../assets/gift.svg";

const SubmitModal = ({ onClose }) => {
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
    <div className="submit-modal">
      <div className="submit-modal__container">
        <CloseIcon className="submit-modal__close-icon" onClick={onClose} />
        <div className="submit-modal__content body">
          <b>Thank you for submitting our form!</b>
          <br />
          <br />
          You'll be taken to the heatmap now.
        </div>
        <GiftIcon className="submit-modal__gift-icon" />
      </div>
    </div>
  );
};

export default SubmitModal;
