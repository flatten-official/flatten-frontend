import { useLeaflet } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import { withTranslation } from "react-i18next";
import i18next from "i18next";

const CONF_SCHEME_THRESHOLDS = [5, 25, 100, 250];
const POT_SCHEME_THRESHOLDS = [0.02, 0.05, 0.1, 0.25];
const HIGH_RISK_SCHEME_THRESHOLDS = [0.15, 0.25, 0.35, 0.5];
const BOTH_SCHEME_THRESHOLDS = [0.01, 0.02, 0.05, 0.1];
const NOT_ENOUGH_GRAY = "#909090";
const i18nlang = i18next.language;

const CONFIRMED_SETTINGS = {
  percent: false,
  notEnoughData: false,
};

const FORM_SETTINGS = {
  percent: true,
  notEnoughData: true,
};

const Legend = ({ t, tab, colourScheme }) => {
  // pick a color threshold and legend title
  let colorThresholds;
  let legendTitle;
  switch (tab) {
    case "conf":
      colorThresholds = CONF_SCHEME_THRESHOLDS;
      legendTitle = t("number_of_cases");
      break;
    case "pot":
      colorThresholds = POT_SCHEME_THRESHOLDS;
      legendTitle = t("pct_responses");
      break;
    case "vuln":
      colorThresholds = HIGH_RISK_SCHEME_THRESHOLDS;
      legendTitle = t("pct_responses");
      break;
    case "both":
      colorThresholds = BOTH_SCHEME_THRESHOLDS;
      legendTitle = t("pct_responses");
      break;
  }

  const settings = tab === "conf" ? CONFIRMED_SETTINGS : FORM_SETTINGS;

  const { map } = useLeaflet();

  useEffect(() => {
    let legendContent = "<h4> " + legendTitle + " </h4>";
    if (settings.notEnoughData)
      legendContent +=
        '<i style="background:' +
        NOT_ENOUGH_GRAY +
        '"/> ' +
        t("not_enough_data_legend") +
        "<br>";

    // Loop through our density intervals and generate a label with a coloured square for each interval.
    for (let i = 0; i < colourScheme.length; i++) {
      // Place square
      legendContent += '<i style="background:' + colourScheme[i] + '"/>';

      const threshold = i === 0 ? 0 : colorThresholds[i - 1];

      if (settings.percent) legendContent += "> " + threshold * 100 + "%<br>";
      else legendContent += "> " + threshold + "<br>";
    }

    const legend = L.control({ position: "bottomright" });

    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");

      div.innerHTML = legendContent;
      return div;
    };

    map.addControl(legend);
    if (i18nlang === "enUS" && tab === "conf") {
      map.removeControl(legend);
    }
    return function cleanup() {
      map.removeControl(legend);
    };
  });
  return null;
};

export default withTranslation("Leafletmap")(Legend);
