import React from "react";
import Checkbox from "./Checkbox";

const CheckboxGroup = ({ input, options, label }) => {
  const handleChange = event => {
    const selectedValues = event.target.checked
      ? [...input.value, event.target.name]
      : input.value.filter(value => value !== event.target.name)

    input.onChange(selectedValues)
  };

  return (
    <div>
      <span>{label}</span>
      <div>
        {options.map(option => (
          <Checkbox
            key={option.value}
            name={option.value}
            label={option.label}
            checked={input.value.includes(option.value)}
            onChange={handleChange}
          />
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroup;
