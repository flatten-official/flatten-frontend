import React from "react";
import RadioButton from "./RadioButton";

const RadioButtonGroup = ({ input, options, label, meta }) => {
  return (
    <div className="radio-group__root">
      {label && <span>{label}</span>}
      <div className="radio-group__container">
        {options.map(option => (
          <RadioButton
            key={option.label}
            label={option.label}
            value={option.value}
            onChange={input.onChange}
            checked={input.value === option.value}
          />
        ))}
      </div>
      {(meta.touched && meta.error) && (
        <span className="error">{meta.error}</span>
      )}
    </div>
  );
};

export default RadioButtonGroup;
