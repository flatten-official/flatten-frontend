import { useLeaflet } from "react-leaflet";
import L from "leaflet";
import React, { useEffect } from "react";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { renderToString } from "react-dom/server";
import { CONF_TAB, NOT_ENOUGH_GRAY } from "./mapConstants";

const LegendContent = ({ t, tab }) => {
  const { colourScheme, legend } = tab;

  const percentRowText = (threshold) => (
    <>
      &gt; {threshold * 100}%<br />
    </>
  );

  const notPercentRowText = (threshold) => (
    <>
      &gt; {threshold}
      <br />
    </>
  );

  const renderNotEnoughData = () => (
    <>
      <i style={{ background: NOT_ENOUGH_GRAY }} />
      {t("not_enough_data_legend")}
      <br />
    </>
  );

  return (
    <>
      <h4>{t(legend.legendTitle)}</h4>
      {tab.notEnoughDataThreshold && renderNotEnoughData()}
      {colourScheme.colours.map((colour, i) => {
        const threshold = i === 0 ? 0 : colourScheme.thresholds[i - 1];
        return (
          <>
            <i style={{ background: colour }} />
            {legend.isPercent
              ? percentRowText(threshold)
              : notPercentRowText(threshold)}
          </>
        );
      })}
    </>
  );
};

LegendContent.propTypes = {
  t: PropTypes.func.isRequired,
  tab: PropTypes.object.isRequired,
};

const LegendWithTranslation = withTranslation("Leafletmap")(LegendContent);

const LegendHandler = ({ tab, country }) => {
  const { map } = useLeaflet();

  const addLegendToMap = () => {
    // TODO Refactor to React Leaflet
    const legend = L.control({ position: "bottomleft" });

    const div = L.DomUtil.create("div", "info legend");
    div.innerHTML = renderToString(<LegendWithTranslation tab={tab} />);

    legend.onAdd = () => div;

    map.addControl(legend);
    if (country.useCirclesForConfirmed && tab === CONF_TAB) {
      map.removeControl(legend);
    }
    return function cleanup() {
      map.removeControl(legend);
    };
  };

  useEffect(addLegendToMap);

  return null;
};

LegendHandler.propTypes = {
  tab: PropTypes.object.isRequired,
  country: PropTypes.object.isRequired,
};

export default LegendHandler;
