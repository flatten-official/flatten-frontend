export const validate = validationArray => values =>
  validationArray.reduce((errors, validation) =>
    values[validation[0]] ?
      errors :
      {
        ...errors,
        [validation[0]]: validation[1]
      },
    {}
  );

export const yesNoOptions = [
  { label: "Yes", value: "y" },
  { label: "No", value: "n" }
];
