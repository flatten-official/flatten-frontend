import React from "react";

const Checkbox = ({
  input,
  label,
  name,
  meta
}) => {
  return (
    <div className="checkbox__root">
      <label className="checkbox__container">
        <input
          {...input}
          type="checkbox"
          name={name}
          checked={input.value}
        />
        {label && <span className="checkbox__label body">{label}</span>}
      </label>
      {(meta.touched && meta.error) && (
        <span className="error">{meta.error}</span>
      )}
    </div> 
  );
};

export default Checkbox;
