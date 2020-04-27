import React from "react";
import { withTranslation } from "react-i18next";
import { GeoJSON, Map, TileLayer } from "react-leaflet";
import PropTypes from "prop-types";
import LocateControl from "./LocateControl";
import { getCircleSize, getColour, getNameGetter } from "./helper";
import Legend from "./Legend";
import L from "leaflet";

import {
  BLANK_POLYGON_STYLE,
  CONFIRMED_CIRCLE_STYLE,
  DATA_TYPE,
  NOT_ENOUGH_DATA_POLYGON_STYLE,
  POLYGON_OPACITY,
  POPUP_OPTIONS,
  SHAPE_TYPE,
} from "./mapConstants";

const LeafletMap = ({ t, data, country, tab, dataInfo }) => {
  const nameGetter = getNameGetter();

  const getRegionName = (feature) => {
    if (dataInfo.type === DATA_TYPE.OVERLAY)
      return dataInfo.baseLayer.fields.getRegionName(feature.properties);
    else return dataInfo.fields[nameGetter](feature.properties);
  };

  const getRegionalData = (feature, regionName = null) => {
    if (dataInfo.type === DATA_TYPE.OVERLAY) {
      // If it's an overlay we need to get the region name first and then use that to find the region in our data
      if (!regionName) regionName = getRegionName(feature);
      return dataInfo.fields.getRegions(data)[regionName];
    } else {
      return feature.properties;
    }
  };

  const getCount = (regionalData) =>
    dataInfo.fields[tab.data.field](regionalData);

  /**
   Returns a function that given a polygon gives it it's color
   */
  const createPolygonStyle = () => (feature) => {
    const regionalData = getRegionalData(feature);
    let numCases;

    if (dataInfo.type === DATA_TYPE.OVERLAY) {
      const isPercent = tab.data.isPercent;
      const minCount = country.data.form.notEnoughDataThreshold;

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
      // define the outlines of the map
      weight: 0.9,
      color: "white",
      // define the color and opacity of each polygon
      fillColor: getColour(tab.ui.colourScheme, numCases),
      fillOpacity: POLYGON_OPACITY,
    };
  };

  const getGeoJson = () =>
    dataInfo.type === DATA_TYPE.OVERLAY ? dataInfo.baseLayer.geoJson : data;

  const getStyleFunction = () =>
    dataInfo.shapeType === SHAPE_TYPE.CIRCLES
      ? (_) => CONFIRMED_CIRCLE_STYLE
      : createPolygonStyle();

  // this function is called with each polygon when the GeoJSON polygons are rendered
  // just creates the popup content and binds a popup to each polygon
  // `feature` is the GeoJSON feature (the FSA polygon)
  // use the FSA polygon FSA ID to get the FSA data from `formData`
  const getPopupBinder = () => {
    return (feature, layer) => {
      let regionName = getRegionName(feature);
      const regionData = getRegionalData(feature, regionName);

      if (country.suffix) regionName += " " + country.suffix;

      let content = `<h3>${regionName}</h3>`;

      if (!regionData) {
        content += t("msg_noentries");
        layer.bindPopup(content, POPUP_OPTIONS);
        return;
      }

      const count = getCount(regionData);
      let total;
      if ("getRegionalTotal" in dataInfo.fields)
        total = dataInfo.fields.getRegionalTotal(regionData);
      const minThreshold = country.data.form.notEnoughDataThreshold;

      if (minThreshold && total < minThreshold) {
        content += t("msg_noentries");
        layer.bindPopup(content, POPUP_OPTIONS);
        return;
      }

      content += tab.ui.getPopupContent(t, count, total);

      const lastUpdated = dataInfo.fields.getLastUpdated(regionData);
      if (lastUpdated) content += `${t("last_updated")}: ${lastUpdated}`;

      layer.bindPopup(content, POPUP_OPTIONS);
    };
  };

  const getPointToLayer = () => {
    if (dataInfo.shapeType !== SHAPE_TYPE.CIRCLES) return undefined;

    return (feature, latLng) => {
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
        // the key prop on the GeoJSON component ensures React will re-render
        // the geojson layer when the activeTab changes. This does the work of
        // unbinding all popups and recreating them with the correct data.
        data={getGeoJson()}
        style={getStyleFunction()}
        onEachFeature={getPopupBinder()}
        pointToLayer={getPointToLayer()}
        key={tab.ui.uniqueKey}
      />
      <LocateControl />
      <Legend tab={tab} />
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
