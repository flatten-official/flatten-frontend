import React from "react";
import TextInput from "./TextInput";

const PostalCodeInput = (props) => {
  const { input } = props;

  const handleChange = (event) => {
    const postalCode = event.target.value.toUpperCase();

    // partial match regex for Canadian postal code prefixes
    if (
      postalCode.match(
        /^(?:[ABCEGHJ-NPRSTVXY]|$)(?:\d|$)(?:[ABCEGHJ-NPRSTV-Z]|$)$/
      )
    ) {
      input.onChange(event.target.value);
    }
  };

  return <TextInput {...props} onChange={handleChange} />;
};

export default PostalCodeInput;
