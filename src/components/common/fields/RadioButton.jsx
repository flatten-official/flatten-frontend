import React from "react";

const ControlledRadioButton = ({ label, value, onChange, checked }) => {
  return (
    <label className="radio-root">
      {label && <span className="radio-label description">{label}</span>}
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
