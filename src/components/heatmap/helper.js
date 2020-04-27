// assigns color based on thresholds

import i18next from "i18next";

export function getColour(colourScheme, count) {
  if (colourScheme.thresholds.length !== colourScheme.colours.length - 1)
    // Minus one since one more color then threshold
    console.log("WARNING: list lengths don't match in getColour.");

  for (let i = 0; i < colourScheme.thresholds.length; i++) {
    if (count < colourScheme.thresholds[i]) return colourScheme.colours[i];
  }

  return colourScheme.colours[colourScheme.colours.length - 1];
}

export const formatTimestamp = (timestamp) =>
  new Date(1000 * timestamp).toString();

export function getCircleSize(circleSizes, thresholds, count) {
  for (let i = 0; i < thresholds.length; i++) {
    if (count < thresholds[i]) return circleSizes[i];
  }

  return circleSizes[circleSizes.length - 1];
}

export const getDataInfo = (tab, country) => country.data[tab.data.source];

export const getData = (tab, data) => data[tab.data.source];

export const getNameGetter = () =>
  i18next.language === "fr" ? "getFrenchName" : "getEnglishName";

export const getConfirmedPopupContent = (t, count, _) => {
  return `${count} ${t("confirmedCases")} <br />`;
};

export const getFormPopupContent = (t, count, total, popupTxt) => {
  if (!total) return null;

  if (total === 1) popupTxt += "_1"; // TODO Use plurals

  return t(popupTxt).replace("XXX", count).replace("YYY", total); // TODO use https://www.i18next.com/translation-function/interpolation
};
