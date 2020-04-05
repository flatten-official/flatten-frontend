import React from "react";

const RadioButton = ({ label, value, onChange, checked }) => {
  return (
    <label className="radio-button">
      <input
        type="radio"
        value={value}
        onChange={onChange}
        checked={checked}
      />
      {label && <span className="radio-button__label body">{label}</span>}
    </label>
  );
};

export default RadioButton;
