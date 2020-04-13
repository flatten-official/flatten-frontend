import React from "react";
import classNames from "../../../utils/classNames";

const PrimaryButton = ({ disabled, onClick, className, children }) => {
  return (
    <button
      className={classNames(
        "primary-button",
        "body",
        disabled && "disabled",
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
