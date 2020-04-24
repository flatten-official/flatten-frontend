import { useLeaflet } from "react-leaflet";
import L from "leaflet";
import React, { useEffect } from "react";
import { withTranslation } from "react-i18next";
import {
  ColourScheme,
  CONFIRMED_TAB,
  NOT_ENOUGH_GRAY,
  TabData,
  USA,
} from "./helper";
import PropTypes from "prop-types";
import { renderToString } from "react-dom/server";

const LegendContent = ({
  t,
  titleTag,
  includeNotEnoughData,
  isPercent,
  colourScheme,
}) => {
  // Place square
  // const threshold = i === 0 ? 0 : colourScheme.thresholds[i - 1];
  const getRow = (colour, threshold, isPercent) => (
    <>
      <i style={{ background: colour }} />
      {isPercent ? (
        <>
          > {threshold * 100}%<br />
        </>
      ) : (
        <>
          > {threshold}
          <br />
        </>
      )}
    </>
  );

  return (
    <>
      <h4>{t(titleTag)}</h4>
      {includeNotEnoughData && <i style={{ background: NOT_ENOUGH_GRAY }} />}
      {t("not_enough_data_legend")}
      <br />
      {colourScheme.colors.map((colour) => {
        return getRow(colour, 0, isPercent);
      })}
    </>
  );
};

LegendContent.propTypes = {
  t: PropTypes.func.isRequired,
  titleTag: PropTypes.string.isRequired,
  includeNotEnoughData: PropTypes.bool.isRequired,
  isPercent: PropTypes.bool.isRequired,
  colourScheme: PropTypes.instanceOf(ColourScheme).isRequired,
};

const LegendWithTranslation = withTranslation("Leafletmap")(LegendContent);

const LegendHandler = ({ tab, country }) => {
  const { map } = useLeaflet();

  const addLegendToMap = () => {
    // TODO Refactor to React Leaflet
    const legend = L.control({ position: "bottomleft" });

    // eslint-disable-next-line react/display-name
    const div = L.DomUtil.create("div", "info legend");
    div.innerHTML = renderToString(
      <LegendWithTranslation
        titleTag={tab.legendTitleTag}
        includeNotEnoughData={tab !== CONFIRMED_TAB}
        colourScheme={tab.colourScheme}
        isPercent={tab !== CONFIRMED_TAB}
      />
    );

    legend.onAdd = () => div;

    map.addControl(legend);
    if (country === USA && tab === CONFIRMED_TAB) {
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
  tab: PropTypes.instanceOf(TabData).isRequired,
  country: PropTypes.string.isRequired,
};

export default LegendHandler;
