import { useLeaflet } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import { withTranslation } from "react-i18next";
import i18next from "i18next";

const CONF_SCHEME_THRESHOLDS = [5, 25, 100, 250];
const POT_SCHEME_THRESHOLDS = [0.02, 0.05, 0.1, 0.25];
const HIGH_RISK_SCHEME_THRESHOLDS = [0.15, 0.25, 0.35, 0.5];
const BOTH_SCHEME_THRESHOLDS = [0.01, 0.02, 0.05, 0.1];
const NOT_ENOUGH_GRAY = '#909090';
const i18nlang = i18next.language;

const Legend = (props) => {
  // pick a color threshold and legend title
  let { t } = props;
  let colorThresholds;
  let legendTitle;
  switch (props.tab) {
    case "conf":
      colorThresholds = CONF_SCHEME_THRESHOLDS;
      legendTitle = t('number_of_cases');
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
  let colourScheme = props.colourScheme;
  let tab = props.tab;

  let percent;
  let not_enough_data;
  if (tab === "conf") {
    percent = false;
    not_enough_data = false;
  } else {
    percent = true;
    not_enough_data = true;
  }

  const { map } = useLeaflet();

  useEffect(() => {
    let legend_content = "<h4> " + legendTitle + " </h4>";
    if (not_enough_data)
      legend_content += '<i style="background:' + NOT_ENOUGH_GRAY + '"></i> '
        + t("not_enough_data_legend") + '<br>';

    // Loop through our density intervals and generate a label with a coloured square for each interval.
    for (let i = 0; i < colourScheme.length; i++) {
      // Place square
      legend_content += '<i style="background:' + colourScheme[i] + '"></i>';

      const threshold = i === 0 ? 0 : colorThresholds[i - 1];

      if (percent) legend_content += '> ' + threshold * 100 + '%<br>';
      else legend_content += '> ' + threshold + '<br>';
    }

    const legend = L.control({ position: "bottomright" });

    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");

      div.innerHTML = legend_content;
      return div;
    };

    map.addControl(legend);
    if (i18nlang === "enUS" && props.tab === "conf") {
      map.removeControl(legend);
    }
    return function cleanup() {
      map.removeControl(legend);
    }

  });
  return null;
};

export default withTranslation('Leafletmap')(Legend);
