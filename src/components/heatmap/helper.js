const mapColours = ["#FAE0A6", "#FABD05", "#FF7800", "#EB4236", "#C70505"];
export const NOT_ENOUGH_GRAY = "#909090";

export const SOMALIA = "so";
export const USA = "enUS";
export const CANADA = "en";

export class ColourScheme {
  /**
   * This object holds the colouring infromation for a polygon layered map
   * @param colors the colours for each "heat" section
   * @param thresholds the thresholds between each section. Should be one shorter than the list of colors
   */
  constructor(colors, thresholds) {
    this.colors = colors;
    this.thresholds = thresholds;

    if (this.thresholds.length !== this.colors.length - 1)
      // Minus one since one more color then threshold
      console.log("WARNING: list lengths don't match in getColour.");
  }

  // assigns color based on thresholds
  getColour(count) {
    for (let i = 0; i < this.thresholds.length; i++) {
      if (count < this.thresholds[i]) return this.colors[i];
    }

    return this.colors[this.colors.length - 1];
  }
}

export class TabData {
  constructor(colourScheme, dataTag, legendTitleTag) {
    this.colourScheme = colourScheme;
    this.dataTag = dataTag;
    this.legendTitleTag = legendTitleTag;
  }
}

export const BOTH_TAB = new TabData(
  new ColourScheme(mapColours, [0.01, 0.02, 0.05, 0.1]),
  "both",
  "pct_responses"
);

export const VULN_TAB = new TabData(
  new ColourScheme(mapColours, [0.15, 0.25, 0.35, 0.5]),
  "risk",
  "pct_responses"
);

export const POT_TAB = new TabData(
  new ColourScheme(mapColours, [0.02, 0.05, 0.1, 0.25]),
  "pot",
  "pct_responses"
);

export const CONFIRMED_TAB = new TabData(
  new ColourScheme(mapColours, [5, 25, 100, 250]),
  "conf",
  "number_of_cases"
);
