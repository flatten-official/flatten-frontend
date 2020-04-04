import React from "react";
import classNames from "../../../utils/classNames";

const PrimaryButton = ({ disabled, onClick, children }) => {
  return (
    <button 
      className={classNames("primary-button", disabled && "disabled")} 
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
