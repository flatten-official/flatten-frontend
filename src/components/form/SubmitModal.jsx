import React from "react";
import { scroller } from "react-scroll";
import CloseIcon from "../../assets/close.svg";

const SubmitModal = ({ onClose }) => {
  const handleClose = () => {
    onClose();
    scroller.scrollTo("heatmap", {
      duration: 1000,
      smooth: true,
      offset: -70
    });
  } 

  return (
    <div className="submit-modal">
      <div className="submit-modal__content">
        <CloseIcon 
          className="submit-modal__close-icon"
          onClick={handleClose}
        />
        <div className="submit-modal__title title">
          <b>Thank you for submitting our form!</b>
        </div>
        <div className="submit-modal__body title">
          You'll be taken to the heatmap now.
        </div>
      </div>
    </div>
  );
}

export default SubmitModal;
