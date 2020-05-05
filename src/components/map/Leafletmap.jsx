import React from "react";
import { withTranslation } from "react-i18next";
import { GeoJSON, Map, TileLayer } from "react-leaflet";
import PropTypes from "prop-types";
import LocateControl from "./LocateControl";
import { getCircleSize, getColour } from "./helper";
import Legend from "./Legend";
import L from "leaflet";

import {
  BASE_POLYGON_STYLE,
  BLANK_POLYGON_STYLE,
  CONFIRMED_CIRCLE_STYLE,
  DATA_TYPE,
  NOT_ENOUGH_DATA_POLYGON_STYLE,
  POLYGON_OPACITY,
  POPUP_OPTIONS,
  SHAPE_TYPE,
} from "./mapConstants";

/**
 * Leaflet map is the component that contains the map (and only the map from)
 * @param t         the language function to get text (from the right language) passed from i18n
 * @param data      the data passed to the map fetched from Flatten's servers
 * @param country   the country data object from mapConstants.js for the current country
 * @param tab       the tab data object from mapConstants.js for the current tab
 * @param dataInfo  the dataInfo object from mapConstants.js for the current data source
 */
const LeafletMap = ({ t, data, country, tab, dataInfo }) => {
  const getRegionName = (feature) =>
    dataInfo.fields.getRegionName(feature.properties);

  const getRegionalData = (feature, regionName = null) => {
    if (dataInfo.type === DATA_TYPE.OVERLAY) {
      // If it's an overlay we need to get the region name first and then use that to find the region in our data
      if (!regionName) regionName = getRegionName(feature);
      return dataInfo.fields.getRegions(data)[regionName];
    } else {
      return feature.properties;
    }
  };

  /**
   * Returns the count for the current tab and region. e.g. 10 vulnerable if it's the vulnerable tab.
   */
  const getCount = (regionalData) =>
    dataInfo.fields[tab.data.field](regionalData);

  /**
   Returns a function that given a polygon gives it it's color
   */
  const polygonStyle = (feature) => {
    const regionalData = getRegionalData(feature);
    let numCases;

    if (dataInfo.type === DATA_TYPE.OVERLAY) {
      const isPercent = tab.data.isPercent;
      const minCount = dataInfo.notEnoughDataThreshold;

      // Get data for that postal code from the form
      if (!regionalData) return NOT_ENOUGH_DATA_POLYGON_STYLE;

      let totalCount;
      if (minCount || isPercent) {
        // If one or the other we need the total count

        totalCount = dataInfo.fields.getRegionalTotal(regionalData);

        if (!totalCount) return NOT_ENOUGH_DATA_POLYGON_STYLE;
      }

      if (minCount && totalCount < minCount)
        return NOT_ENOUGH_DATA_POLYGON_STYLE;

      numCases = getCount(regionalData);

      if (isPercent) numCases /= totalCount;
    } else {
      numCases = getCount(regionalData);
    }

    if (!numCases || numCases <= 0) return BLANK_POLYGON_STYLE;

    return {
      ...BASE_POLYGON_STYLE,
      // define the color and opacity of each polygon
      fillColor: getColour(tab.ui.colourScheme, numCases),
      fillOpacity: POLYGON_OPACITY,
    };
  };

  // this function is called with each polygon when the GeoJSON polygons are rendered
  // just creates the popup content and binds a popup to each polygon
  // `feature` is the GeoJSON feature (the FSA polygon)
  // use the FSA polygon FSA ID to get the FSA data from `formData`
  const popupBinder = (feature, layer) => {
    let regionName = getRegionName(feature);
    const regionData = getRegionalData(feature, regionName);

    if (dataInfo.ui && dataInfo.ui.nameSuffix)
      regionName += dataInfo.ui.nameSuffix;

    let content = `<h3>${regionName}</h3>`; // Use back ticks to escape sequence

    if (!regionData) {
      content += t("insufficient_responses_message");
      layer.bindPopup(content, POPUP_OPTIONS);
      return;
    }

    const count = getCount(regionData);

    let total;

    if (dataInfo.fields.getRegionalTotal)
      total = dataInfo.fields.getRegionalTotal(regionData);

    const minThreshold = dataInfo.notEnoughDataThreshold;

    if (minThreshold && total < minThreshold) {
      content += t("insufficient_responses_message");
      layer.bindPopup(content, POPUP_OPTIONS);
      return;
    }

    content += `<p>` + t(tab.ui.popupMessage, { count: count });

    if (!isNaN(total)) {
      content += `<br/><br/> ` + t("report_count_summary.", { count: total });
    }

    content += `</p>`;

    if (dataInfo.fields.getLastUpdated) {
      const lastUpdated = dataInfo.fields.getLastUpdated(regionData);
      if (lastUpdated) content += t("last_updated", { time: lastUpdated });
    }

    layer.bindPopup(content, POPUP_OPTIONS);
  };

  /**
   * Defines the markers for maps that use circles instead of polygons. See Leaflet documentation.
   */
  const pointToLayer = (feature, latLng) => {
    const regionalData = getRegionalData(feature);
    if (!regionalData) return null;
    const count = getCount(regionalData);

    if (!count) return null;
    return L.circleMarker(latLng, {
      radius: getCircleSize(
        dataInfo.ui.circleSizes,
        dataInfo.ui.thresholds,
        count
      ),
    });
  };

  // we wait until the formData is not null before rendering the GeoJSON.
  // otherwise it will try to create a popup for every FSA but the data won't
  // be there yet.
  if (!data) return <h3>{t("loading")}</h3>;

  return (
    <Map
      id="leaflet-map"
      maxBounds={country.view.bounds}
      center={country.view.start}
      zoom={country.view.startZoom}
      minZoom={country.view.minZoom}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON
        data={dataInfo.type === DATA_TYPE.OVERLAY ? dataInfo.baseGeoJson : data}
        style={
          dataInfo.shapeType === SHAPE_TYPE.CIRCLES
            ? CONFIRMED_CIRCLE_STYLE
            : polygonStyle
        }
        onEachFeature={popupBinder}
        pointToLayer={dataInfo.shapeType === SHAPE_TYPE.CIRCLES && pointToLayer} // Only if it's a circle data source
        key={tab.ui.uniqueKey} // the key prop ensures React will re-render when the tab changes
      />
      <LocateControl />
      {dataInfo.shapeType === SHAPE_TYPE.POLYGONS && (
        <Legend tab={tab} dataInfo={dataInfo} />
      )}
    </Map>
  );
};

LeafletMap.propTypes = {
  data: PropTypes.object,
  country: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  tab: PropTypes.object.isRequired,
  dataInfo: PropTypes.object.isRequired,
};

export default withTranslation("Leafletmap")(LeafletMap);
