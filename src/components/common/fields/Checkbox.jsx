import React from "react";
import "./Checkbox.scss";

const Checkbox = ({
  input,
  label,
  name,
  meta
}) => {
  return (
    <div className="checkbox-root">
      <label className="checkbox-container">
        <input
          {...input}
          type="checkbox"
          name={name}
          checked={input.value}
        />
        {label && <span className="checkbox-label body-black">{label}</span>}
      </label>
      {(meta.touched && meta.error) && (
        <span className="error">{meta.error}</span>
      )}
    </div> 
  );
};

export default Checkbox;
