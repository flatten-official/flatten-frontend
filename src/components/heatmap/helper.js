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

// build the regional info string
export const getPopupContent = (tab, t, count, total) => {
  count = { count: count };
  let content = "<p>";

  switch (tab) {
    case "confirmed_cases":
      content += t("confirmed_case_count_summary.", count);
      break;
    case "potential_cases":
      content += t("potential_case_count_summary.", count);
      break;
    case "vulnerable_cases":
      content += t("vulnerable_case_count_summary.", count);
      break;
    case "high_risk_cases":
      content += t("high_risk_case_count_summary.", count);
      break;
  }

  if (!isNaN(total)) {
    content += `<br/><br/> ${t("report_count_summary.", { count: total })}`;
  }
  content += "</p>";

  return content;
};
