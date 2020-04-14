import React from "react";
import { withTranslation } from "react-i18next";
import PrimaryButton from "../common/buttons/PrimaryButton";
import { Map, TileLayer, GeoJSON } from "react-leaflet";
import convertedBoundaries from "./converted_boundaries.js";
import counties from "./county_boundaries.js";
import Legend from "./Legend";
import L from "leaflet";
import { getMapConfirmedData, getMapFormData } from "../../actions/index";
import i18next from "i18next";
import { connect } from "react-redux";

// checks language
const i18nlang = i18next.language;

const CANADA_VIEW = {
  bounds: [
    [38, -150],
    [87, -33],
  ],
  center: [54, -97],
  zoom: 4,
};

const USA_VIEW = {
  bounds: [
    [15, -180],
    [77, -60],
  ],
  center: [38.5, -97.2],
  zoom: 5,
};

const MIN_ZOOM = 3;

// white, yellow, orange, brown, red, black
const COLOUR_SCHEME = ["#ffffb2", "#fecc5c", "#fd8d3c", "#f03b20", "#bd0026"];
const CONF_SCHEME_THRESHOLDS = [5, 25, 100, 250];
const POT_SCHEME_THRESHOLDS = [0.02, 0.05, 0.1, 0.25];
const HIGH_RISK_SCHEME_THRESHOLDS = [0.15, 0.25, 0.35, 0.5];
const BOTH_SCHEME_THRESHOLDS = [0.01, 0.02, 0.05, 0.1];
const POLYGON_OPACITY = 0.4;
const NOT_ENOUGH_GRAY = "#909090";
// max size circle can be on map
const MAX_CIRCLE_RAD = 25;
const MIN_CIRCLE_RADIUS = 3;

// Current button
let currTab = 0;

// this will work for USA once we have data to fetch for usa FORMS
function createStyleFunction(formData, colourScheme, thresholds, dataTag) {
  return (feature) => {
    let opacity = POLYGON_OPACITY; // If no data, is transparent
    let colour = NOT_ENOUGH_GRAY; // Default color if not enough data

    let postCodeData;

    if (i18nlang === "enUS") {
      postCodeData = formData
        ? formData.county[feature.properties.COUNTYNS]
        : null;
    } else {
      postCodeData = formData ? formData.fsa[feature.properties.CFSAUID] : null;
    }

    // only set numbers if it exists in form_data_obj
    if (postCodeData && dataTag in postCodeData) {
      const numTotal = postCodeData.number_reports;

      if (numTotal >= 25) {
        const numCases = postCodeData[dataTag];

        if (numCases === 0) {
          opacity = 0;
        } else
          colour = getColour(numCases / numTotal, colourScheme, thresholds);
      }
    } else if (dataTag === "conf") {
      // case if dataTag is the confirmed cases
      const numCases = feature.properties.CaseCount;

      if (numCases === 0) {
        opacity = 0;
      } else {
        colour = getColour(numCases, colourScheme, thresholds);
      }
    }

    return {
      // define the outlines of the map
      weight: 0.9,
      color: "gray",
      dashArray: "3",
      // define the color and opacity of each polygon
      fillColor: colour,
      fillOpacity: opacity,
    };
  };
}

// for circles
function createStyleFunctionUSA() {
  return {
    weight: 0,
    color: "red",
    fillColor: "red",
    fillOpacity: 0.5,
  };
}

// assigns color based on thresholds
function getColour(cases, colourScheme, colorThresholds) {
  if (colorThresholds.length !== colourScheme.length - 1)
    // Minus one since one more color then threshold
    console.log("WARNING: list lengths don't match in getColour.");

  for (let i = 0; i < colorThresholds.length; i++) {
    if (cases < colorThresholds[i]) return colourScheme[i];
  }

  return colourScheme[colourScheme.length - 1];
}

class Leafletmap extends React.Component {
  state = {
    tab: "both",
    formData: null,
    confirmedCases: null,
  };

  componentDidMount() {
    this.dispatch(getMapConfirmedData());
    this.dispatch(getMapFormData());
  }

  setTab = (tabID, index) => {
    document
      .getElementById("tabs")
      .children[currTab].classList.remove("active");
    document.getElementById("tabs").children[index].classList.add("active");
    currTab = index;

    this.setState({ tab: tabID });
  };

  // default map renderer. it only renders circles if pointTolayer is defined
  renderMap(
    formData,
    confirmedCases,
    bindPopupOnEachFeature,
    tab,
    pointToLayer,
    styleFuncCircles
  ) {
    let data;
    let styleFunc;

    if (
      formData !== null &&
      (tab === "both" || tab === "pot" || tab === "vuln")
    ) {
      data = i18nlang === "enUS" ? counties : convertedBoundaries;

      if (tab === "pot") {
        styleFunc = createStyleFunction(
          formData,
          COLOUR_SCHEME,
          POT_SCHEME_THRESHOLDS,
          "pot"
        );
      } else if (tab === "vuln") {
        styleFunc = createStyleFunction(
          formData,
          COLOUR_SCHEME,
          HIGH_RISK_SCHEME_THRESHOLDS,
          "risk"
        );
      } else if (tab === "both") {
        styleFunc = createStyleFunction(
          formData,
          COLOUR_SCHEME,
          BOTH_SCHEME_THRESHOLDS,
          "both"
        );
      }
    } else if (tab === "conf") {
      data = confirmedCases;
      styleFunc = createStyleFunction(
        formData,
        COLOUR_SCHEME,
        CONF_SCHEME_THRESHOLDS,
        "conf"
      );
      if (i18nlang === "enUS") {
        return (
          <GeoJSON
            data={data}
            style={styleFuncCircles}
            onEachFeature={bindPopupOnEachFeature}
            pointToLayer={pointToLayer}
            key={tab}
          />
        );
      }
    } else {
      return null;
    }

    return (
      <GeoJSON
        data={data}
        style={styleFunc}
        onEachFeature={bindPopupOnEachFeature}
        key={tab}
      />
    );
  }

  render() {
    const { t } = this.props;
    let title;
    if (this.state.formData !== null) {
      title =
        i18nlang === "fr"
          ? "Réponse totales: " +
            this.state.formData.total_responses +
            " | Dernière mise à jour: " +
            new Date(1000 * this.state.formData.time)
          : "Total Responses: " +
            this.state.formData.total_responses +
            " | Last update: " +
            new Date(1000 * this.state.formData.time);
    } else {
      title = i18nlang === "fr" ? "Chargement..." : "Loading...";
    }

    const view = i18nlang === "enUS" ? USA_VIEW : CANADA_VIEW;

    // needs more info for potential cases by county
    const bindPopupOnEachFeatureUSA = (feature, layer) => {
      let content;
      const countyID = feature.properties.COUNTYNS;
      const countyData = this.state.formData.county[countyID];
      let countyReports;
      try {
        countyReports = countyData.number_reports;
      } catch {
        countyReports = 0;
      }

      if (countyData) {
        if (countyReports < 25) {
          content =
            "<b>" +
            feature.properties.NAME +
            " County</b><br/>" +
            "We don't have enough data for this region";
        } else {
          content = "<b>" + feature.properties.NAME + " County</b>";
          if (this.state.tab === "vuln") {
            content +=
              "<p>" +
              countyData.risk +
              " vulnerable individuals<br/>" +
              countyData.number_reports +
              " reports in total</p>";
          } else if (this.state.tab === "both") {
            content +=
              "<p>" +
              countyData.both +
              " vulnerable individuals who are also potential cases<br/>" +
              countyData.number_reports +
              " reports in total</p>";
          } else if (this.state.tab === "pot") {
            content +=
              "<p>" +
              countyData.pot +
              " potential cases<br/>" +
              countyData.number_reports +
              " reports in total</p>";
          }
        }
      } else {
        if (this.state.tab === "conf") {
          content =
            "<b>" +
            feature.properties.Combined_Key +
            "</b>" +
            "<p>Confirmed Cases: " +
            feature.properties.Confirmed +
            "</p>";
        } else {
          content =
            "<b>" +
            feature.properties.NAME +
            " County</b><br/>" +
            "We don't have enough data for this region";
        }
      }

      layer.bindPopup(content);
    };

    // this function is called with each polygon when the GeoJSON polygons are rendered
    // just creates the popup content and binds a popup to each polygon
    // `feature` is the GeoJSON feature (the FSA polygon)
    // use the FSA polygon FSA ID to get the FSA data from `confirmedData`
    const bindPopupOnEachFeature = (feature, layer) => {
      const fsaID = feature.properties.CFSAUID;
      let fsaData = this.state.formData.fsa[fsaID];
      if (!fsaData) {
        console.log("no data for fsa ID", fsaID);
        fsaData = {}; // instead of an error, it will say 'undefined' in the popup
      }

      let content;

      if (this.state.tab === "conf") {
        content =
          `<b>${feature.properties.ENGNAME}</b><br/><br/>` +
          `${feature.properties.CaseCount} ${t("confirmedCases")} <br />` +
          `${t("last_updated")}: ${feature.properties.Last_Updated}`;
      } else {
        let XXX;
        const YYY = fsaData.number_reports;
        const one = YYY === 1;

        if (this.state.tab === "vuln") {
          XXX = fsaData.risk;
          if (one) content = t("vul_case_popup_1");
          else content = t("vul_case_popup");
        } else if (this.state.tab === "both") {
          XXX = fsaData.both;
          if (one) content = t("pot_vul_popup_1");
          else content = t("pot_vul_popup");
        } else if (this.state.tab === "pot") {
          XXX = fsaData.pot;
          if (one) content = t("pot_case_popup_1");
          else content = t("pot_case_popup");
        }
        content = content
          .replace("FSA", fsaID)
          .replace("XXX", XXX)
          .replace("YYY", YYY);
      }
      layer.bindPopup(content);
    };

    let pointToLayer;
    let bindPopups = bindPopupOnEachFeature;

    if (i18nlang === "enUS") {
      bindPopups = bindPopupOnEachFeatureUSA;
      pointToLayer = (feature, latlng) => {
        let radius = MIN_CIRCLE_RADIUS;
        const cases = feature.properties.Confirmed;

        if (cases > 10000) {
          radius = MAX_CIRCLE_RAD;
        } else if (cases > 5000) {
          radius = MAX_CIRCLE_RAD * (4 / 5);
        } else if (cases > 2500) {
          radius = MAX_CIRCLE_RAD * (3 / 5);
        } else if (cases > 1000) {
          radius = MAX_CIRCLE_RAD / 2;
        } else if (cases > 500) {
          radius = MAX_CIRCLE_RAD * (2 / 5);
        } else if (cases > 100) {
          radius = MAX_CIRCLE_RAD / 5;
        }

        return L.circleMarker(latlng, {
          radius: radius,
        });
      };
    }

    //
    // we wait until the confirmedData is not null before rendering the GeoJSON.
    // otherwise it will try to create a popup for every FSA but the data won't
    // be there yet.
    //
    // the key prop on the GeoJSON component ensures React will re-render
    // the geojson layer when the tab changes. This does the work of
    // unbinding all popups and recreating them with the correct data.

    return (
      <div>
        <div className="PageTitle body"> {title} </div>
        <div className="map-body">
          <Map
            maxBounds={view.bounds}
            center={view.center}
            zoom={view.zoom}
            className="map-body"
            style={{ zIndex: 0 }}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              minZoom={MIN_ZOOM}
            />
            {this.renderMap(
              this.state.formData,
              this.state.confirmedCases,
              bindPopups,
              this.state.tab,
              pointToLayer,
              createStyleFunctionUSA
            )}
            <Legend colourScheme={COLOUR_SCHEME} tab={this.state.tab} />
          </Map>
        </div>
        <div id="tabs" className="TabSelectors btn_group">
          <PrimaryButton
            className="active"
            onClick={(_) => this.setTab("both", 0)}
          >
            {t("pot_vul_button")}
          </PrimaryButton>
          <PrimaryButton onClick={(_) => this.setTab("pot", 1)}>
            {t("pot_button")}
          </PrimaryButton>
          <PrimaryButton onClick={(_) => this.setTab("vuln", 2)}>
            {t("vul_button")}
          </PrimaryButton>
          <PrimaryButton onClick={(_) => this.setTab("conf", 3)}>
            {t("cul_button")}
          </PrimaryButton>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  if (state.status) {
    return {
      formData: state.status.formData,
      confirmedData: state.status.confirmedData,
    };
  }
  return state;
};

const LeafletMapConnected = connect(mapStateToProps)(Leafletmap);

export default withTranslation("Leafletmap")(LeafletMapConnected);
