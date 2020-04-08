import React, { useEffect } from "react";
import { scroller } from "react-scroll";
import Modal from "../common/modal/Modal";
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
    <Modal className="submit-modal" onClose={onClose}>
      <div className="submit-modal__content body">
        <b>Thank you for submitting our form!</b>
        <br />
        Exit to go to the heatmap.
      </div>
      <GiftIcon className="submit-modal__gift-icon" />
    </Modal>
  );
};

export default SubmitModal;
