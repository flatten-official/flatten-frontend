const classNames = (...potentialClassNames) =>
  potentialClassNames.filter(className => !!className);

export default classNames;
