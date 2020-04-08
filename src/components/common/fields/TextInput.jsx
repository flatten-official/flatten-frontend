import React from "react";

const TextInput = ({
  label,
  input,
  meta,
  ...props
}) => {
  return (
    <div className="text-input">
      <div className="text-input__container">
        {label && <div className="text-input__label">{label}</div>}
        <input type="text" {...input} {...props}/>
      </div>
      {(meta.touched && meta.error) && (
        <div className="text-input__error error">{meta.error}</div>
      )}
    </div>
  );
};
  
export default TextInput;
