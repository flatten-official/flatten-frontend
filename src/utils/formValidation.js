import zip from "./zip_code_database.json";

export const validate = (validationArray) => (values) =>
  validationArray.reduce((errors, validation) => {
    const isValid =
      validation.length === 3 && typeof validation[2] === "function"
        ? validation[2](values)
        : !!values[validation[0]];

    return isValid
      ? errors
      : {
          ...errors,
          [validation[0]]: validation[1],
        };
  }, {});

export const isValidEmail = (email) => {
  // RFC 2822 compliant regex taken from https://gist.github.com/gregseth/5582254
  var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return re.test(String(email).toLowerCase());
};

export const isValidPostalCode = (postalCode) => {
  // regex for Canadian postal code prefixes
  var re = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z]$/;
  return re.test(String(postalCode).toUpperCase());
};

export const isValidZipCode = (zipCode) => {
  // regex for valid US zipcodes
  return zipCode in zip;
};
