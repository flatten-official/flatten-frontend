import React from "react";

const Checkbox = ({
  input,
  checked,
  onChange,
  label,
  name,
  meta,
}) => {
  const isChecked = input ? input.value : checked;
  const handleChange = input ? input.onChange : onChange;

  return (
    <div className="checkbox">
      <label className="checkbox__container">
        <input
          {...input}
          type="checkbox"
          name={name}
          checked={isChecked}
          onChange = {handleChange}
        />
        {label && <span className="checkbox__label body">{label}</span>}
      </label>
      {(meta && meta.touched && meta.error) && (
        <span className="error">{meta.error}</span>
      )}
    </div> 
  );
};

export default Checkbox;
