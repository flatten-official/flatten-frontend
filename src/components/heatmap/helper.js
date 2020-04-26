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
