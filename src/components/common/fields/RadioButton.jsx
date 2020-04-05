import React from "react";

const RadioButton = ({ label, value, onChange, checked }) => {
  return (
    <label className="radio__root">
      {label && <span className="radio__label body">{label}</span>}
      <input
        type="radio"
        value={value}
        onChange={onChange}
        checked={checked}
      />
    </label>
  );
};

export default RadioButton;
