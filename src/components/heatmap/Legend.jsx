import { MapControl, useLeaflet } from "react-leaflet";
import L from "leaflet";
import React, { useEffect } from "react";
import { withTranslation } from "react-i18next";
import i18next from "i18next";
import { CONFIRMED_TAB, NOT_ENOUGH_GRAY } from "./helper";

const i18nlang = i18next.language;

const LegendContent = ({
  t,
  title,
  includeNotEnoughData,
  isPercent,
  colourScheme,
}) => {
  let legendContent = <h4>{title}</h4>;
  if (includeNotEnoughData)
    legendContent +=
      '<i style="background:' +
      NOT_ENOUGH_GRAY +
      '"></i> ' +
      t("not_enough_data_legend") +
      "<br>";

  // Loop through our density intervals and generate a label with a coloured square for each interval.
  for (let i = 0; i < colourScheme.colors.length; i++) {
    // Place square
    legendContent += <i style={{ background: colourScheme.colors[i] }} />;

    const threshold = i === 0 ? 0 : colourScheme.thresholds[i - 1];

    if (isPercent) legendContent += "> " + threshold * 100 + "%<br>";
    else legendContent += "> " + threshold + "<br>";
  }
  return legendContent;
};

const Legend = ({ t, tab }) => {
  const { map } = useLeaflet();

  const addLegendToMap = () => {
    // TODO Refactor to React Leaflet
    const legend = L.control({ position: "bottomleft" });

    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");
      div.innerHTML = (
        <LegendContent
          t={t}
          title={tab.legendTitle}
          includeNotEnoughData={tab !== CONFIRMED_TAB}
          colourScheme={tab.colourScheme}
          isPercent={tab !== CONFIRMED_TAB}
        />
      );
      return div;
    };

    map.addControl(legend);
    if (i18nlang === "enUS" && tab === "conf") {
      map.removeControl(legend);
    }
    return function cleanup() {
      map.removeControl(legend);
    };
  };

  useEffect(addLegendToMap);

  return null;
};

export default withTranslation("Leafletmap")(Legend);
