import React, { useEffect } from "react";
import { scroller } from "react-scroll";
import Modal from "../common/modal/Modal";
import GiftIcon from "../../assets/gift.svg";
import FacebookButton from "../common/buttons/FacebookButton";
import TwitterButton from "../common/buttons/TwitterButton";
import PropTypes from "prop-types";

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
      <div className="submit-modal__share">
        <FacebookButton />
        <TwitterButton />
      </div>
    </Modal>
  );
};

SubmitModal.propTypes = {
  onClose: PropTypes.func,
};

export default SubmitModal;
