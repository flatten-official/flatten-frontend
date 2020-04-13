const classNames = (...potentialClassNames) =>
  potentialClassNames.filter((className) => !!className).join(" ");

export default classNames;
