import React from "react";

const TextInput = ({ label, input, meta, ...props }) => {
  return (
    <div className="text-input-root">
      <div className="text-input-container">
        {label && <span className="text-input-label">{label}</span>}
        <input type="text" {...input} {...props}/>
      </div>
      {(meta.touched && meta.error) && (
        <span className="error">{meta.error}</span>
      )}
    </div>
  );
};
  
export default TextInput;
