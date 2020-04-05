import React from "react";
import TextInput from "./TextInput";

const PostalCodeInput = props => {
  const { input } = props;

  const handleChange = event => {
    const postalCode = event.target.value.toUpperCase();

    // regex for ALL Canadian postal code prefixes
    if (postalCode.match(/^(?:[ABCEGHJ-NPRSTVXY]|$)(?:\d|$)(?:[ABCEGHJ-NPRSTV-Z]|$)$/)) {
      input.onChange(event.target.value);
    }
  }

  return (
    <TextInput {...props} className onChange={handleChange} />
  );
};

export default PostalCodeInput;
