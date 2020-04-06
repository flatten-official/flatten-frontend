import React from "react";

const TextInput = ({ label, input, meta, ...props }) => {
  return (
    <div className="text-input">
      <div className="text-input__container">
        {label && <span className="text-input__label">{label}</span>}
        <input type="text" {...input} {...props}/>
      </div>
      {(meta.touched && meta.error) && (
        <span className="error">{meta.error}</span>
      )}
    </div>
  );
};
  
export default TextInput;
