import React from "react";
import Checkbox from "./Checkbox";

const CheckboxGroup = ({ 
  input,
  label,
  options,
  meta,
  maxColumns
}) => {
  const containerModifier = maxColumns ? `--columns-${maxColumns}` : "";

  const handleChange = event => {
    const selectedValues = event.target.checked
      ? [...input.value, event.target.name]
      : input.value.filter(value => value !== event.target.name)

    input.onChange(selectedValues)
  };

  return (
    <div className="checkbox-group">
      {label && <span>{label}</span>}
      <div className={`checkbox-group__container${containerModifier}`}>
        {options.map((option, index) => (
          <Checkbox
            key={index}
            name={option.value}
            label={option.label}
            checked={input.value.includes(option.value)}
            onChange={handleChange}
          />
        ))}
      </div>
      {(meta.touched && meta.error) && (
        <div className="error">{meta.error}</div>
      )}
    </div>
  );
};

export default CheckboxGroup;
