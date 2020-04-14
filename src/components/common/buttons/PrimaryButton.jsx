import React from "react";
import classNames from "../../../utils/classNames";
import PropTypes from "prop-types";

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

PrimaryButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

export default PrimaryButton;
