import React from "react";
import CloseIcon from "../../../assets/close.svg";

const Modal = ({ onClose, className, children }) => {
  return (
    <div className="modal">
      <div className={`modal__container ${className}`}>
        <CloseIcon className="modal__close" onClick={onClose} />
        {children}
      </div>
    </div>
  );
};

export default Modal;
