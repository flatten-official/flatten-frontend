import React from "react";
import TextInput from "./TextInput";

const ZipCodeInput = (props) => {
  const { input } = props;

  const handleChange = (event) => {
    const zipCode = event.target.value;
    console.log(zipCode);
    if (
      zipCode.match(
        /^($|[0-9]|[0-9][0-9]|[0-9][0-9][0-9]|[0-9][0-9][0-9][0-9]|[0-9][0-9][0-9][0-9][0-9])$/
      )
    ) {
      input.onChange(event.target.value);
    }
  };

  return <TextInput {...props} onChange={handleChange} />;
};

export default ZipCodeInput;
