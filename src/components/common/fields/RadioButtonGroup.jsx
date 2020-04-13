import React from "react";
import RadioButton from "./RadioButton";

const RadioButtonGroup = ({ input, options, label, meta, maxColumns }) => {
  const containerModifier = maxColumns ? `--columns-${maxColumns}` : "";

  return (
    <div className="radio-button-group">
      {label && <span>{label}</span>}
      <div className={`radio-button-group__container${containerModifier}`}>
        {options.map((option) => (
          <RadioButton
            key={option.label}
            label={option.label}
            value={option.value}
            onChange={input.onChange}
            checked={input.value === option.value}
          />
        ))}
      </div>
      {meta.touched && meta.error && (
        <span className="error">{meta.error}</span>
      )}
    </div>
  );
};

export default RadioButtonGroup;
