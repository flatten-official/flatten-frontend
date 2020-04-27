// assigns color based on thresholds

export function getColour(colourScheme, count) {
  if (colourScheme.thresholds.length !== colourScheme.colours.length - 1)
    // Minus one since one more color then threshold
    console.log("WARNING: list lengths don't match in getColour.");

  for (let i = 0; i < colourScheme.thresholds.length; i++) {
    if (count < colourScheme.thresholds[i]) return colourScheme.colours[i];
  }

  return colourScheme.colours[colourScheme.colours.length - 1];
}

export function getCircleSize(circleSizes, thresholds, count) {
  for (let i = 0; i < thresholds.length; i++) {
    if (count < thresholds[i]) return circleSizes[i];
  }

  return circleSizes[circleSizes.length - 1];
}

export const getCountryTabSpecifics = (tab, country) =>
  country.tabs[tab.keyForCountries];

export const getData = (tab, data) => data[tab.data.objectName];
