import React from "react";
import "./RadioButton.scss";

const ControlledRadioButton = ({ label, value, onChange, checked }) => {
  return (
    <label className="radio-root">
      {label && <span className="radio-label body-black">{label}</span>}
      <input
        type="radio"
        value={value}
        onChange={onChange}
        checked={checked}
      />
    </label>
  );
};

export default ControlledRadioButton;
