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

const Legend = (props) => {
  // pick a color threshold and legend title
  const { t } = props;
  let colorThresholds;
  let legendTitle;
  switch (props.tab) {
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

  // colour scheme and tab are passed through props
  const colourScheme = props.colourScheme;
  const tab = props.tab;

  let percent;
  let notEnoughData;
  if (tab === "conf") {
    percent = false;
    notEnoughData = false;
  } else {
    percent = true;
    notEnoughData = true;
  }

  const { map } = useLeaflet();

  useEffect(() => {
    let legendContent = "<h4> " + legendTitle + " </h4>";
    if (notEnoughData)
      legendContent +=
        '<i style="background:' +
        NOT_ENOUGH_GRAY +
        '"></i> ' +
        t("not_enough_data_legend") +
        "<br>";

    // Loop through our density intervals and generate a label with a coloured square for each interval.
    for (let i = 0; i < colourScheme.length; i++) {
      // Place square
      legendContent += '<i style="background:' + colourScheme[i] + '"></i>';

      const threshold = i === 0 ? 0 : colorThresholds[i - 1];

      if (percent) legendContent += "> " + threshold * 100 + "%<br>";
      else legendContent += "> " + threshold + "<br>";
    }

    const legend = L.control({ position: "bottomleft" });

    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "legend");
      div.innerHTML = legendContent;
      return div;
    };

    map.addControl(legend);
    if (i18nlang === "enUS" && props.tab === "conf") {
      map.removeControl(legend);
    }
    return function cleanup() {
      map.removeControl(legend);
    };
  });
  return null;
};

export default withTranslation("Leafletmap")(Legend);
