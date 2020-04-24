import React from "react";
import { withTranslation } from "react-i18next";
import PrimaryButton from "../common/buttons/PrimaryButton";
import { GeoJSON, Map, TileLayer } from "react-leaflet";
import convertedBoundaries from "../../assets/map/converted_boundaries.js";
import counties from "../../assets/map/county_boundaries.js";
import monga from "../../assets/map/mongadishu_coords.js";
import Legend from "./Legend";
import LocateControl from "./LocateControl";
import L from "leaflet";
import i18next from "i18next";
import { connect } from "react-redux";

const BOTH_TAB = "both";
const VULN_TAB = "vuln";
const POT_TAB = "pot";
const CONFIRMED_TAB = "conf";

const BOTH_TAG = "both";
const VULN_TAG = "risk";
const POT_TAG = "pot";
const CONFIRMED_TAG = "conf";

const SOMALIA = "so";
const USA = "enUS";
const CANADA = "en";

const VIEWS = {};
VIEWS[CANADA] = {
  bounds: [
    [38, -150],
    [87, -45],
  ],
  startZoom: 4,
  minZoom: 4,
  start: [56.1304, -106.3468],
};
VIEWS[USA] = {
  bounds: [
    [15, -180],
    [77, -60],
  ],
  start: [37.0902, -95.7129],
  zoom: 3,
  minZoom: 8,
};
VIEWS[SOMALIA] = {
  bounds: [
    [-1.68325, 40.98105],
    [12.02464, 51.13387],
  ],
  start: [2.0469, 45.3182],
  startZoom: 8,
  minZoom: 8,
};

// white, yellow, orange, brown, red, black
const colourScheme = ["#FAE0A6", "#FABD05", "#FF7800", "#EB4236", "#C70505"];
const CONF_SCHEME_THRESHOLDS = [5, 25, 100, 250];
const POT_SCHEME_THRESHOLDS = [0.02, 0.05, 0.1, 0.25];
const HIGH_RISK_SCHEME_THRESHOLDS = [0.15, 0.25, 0.35, 0.5];
const BOTH_SCHEME_THRESHOLDS = [0.01, 0.02, 0.05, 0.1];
const POLYGON_OPACITY = 1;
const NOT_ENOUGH_GRAY = "#909090";
const NO_DATA_THRESHOLD = 25;
// max size circle can be on map
const MAX_CIRCLE_RAD = 25;
const MIN_CIRCLE_RADIUS = 3;

// checks language
const i18nlang = i18next.language;
const country = i18nlang === "fr" ? CANADA : i18nlang;

// Current button
let currTab = 0;

// this will work for USA once we have data to fetch for usa FORMS

const createConfirmedStyle = (coulourScheme, thresholds) => (feature) => {
  // case if dataTag is the confirmed cases
  const numCases = feature.properties.CaseCount;

  return {
    // define the outlines of the map
    weight: 0.9,
    color: "white",
    // define the color and opacity of each polygon
    fillColor: getColour(numCases, colourScheme, thresholds),
    fillOpacity: numCases === 0 ? 0 : POLYGON_OPACITY,
  };
};

const createFormStyle = (formData, colourScheme, thresholds, dataTag) => (
  feature
) => {
  /**
     Returns a function that given a polygon gives it it's color
     */
  // Default to not enough data
  let opacity = POLYGON_OPACITY;
  let colour = NOT_ENOUGH_GRAY;

  // Get data for that postal code from the form
  let postCodeData;

  switch (country) {
    case USA:
      postCodeData = formData.county[feature.properties.COUNTYNS];
      break;
    case CANADA:
      postCodeData = formData.fsa[feature.properties.CFSAUID];
      break;
  }

  // only set numbers if it exists in form_data_obj
  if (postCodeData && dataTag in postCodeData) {
    const numTotal = postCodeData.number_reports;

    if (numTotal >= NO_DATA_THRESHOLD) {
      const numCases = postCodeData[dataTag];

      if (numCases !== 0) {
        colour = getColour(numCases / numTotal, colourScheme, thresholds);
      } else opacity = 0;
    }
  }

  return {
    // define the outlines of the map
    weight: 0.9,
    color: "white",
    // define the color and opacity of each polygon
    fillColor: colour,
    fillOpacity: opacity,
  };
};

// for USA circles
const circleStyle = () => ({
  weight: 0,
  color: "red",
  fillColor: "red",
  fillOpacity: 0.5,
});

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
  state = { tab: BOTH_TAB };

  updateDimensions() {
    const height = window.innerWidth >= 992 ? window.innerHeight - 200 : 500;
    this.setState({ height: height });
  }

  componentDidMount() {
    console.log(this.props);
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  setTab = (tabID, index) => {
    console.log("set tab to: " + tabID);
    document
      .getElementById("tabs")
      .children[currTab].classList.remove("active");
    document.getElementById("tabs").children[index].classList.add("active");
    currTab = index;

    this.setState({ tab: tabID });
  };

  getGeoJson = (data, tab) => {
    if (tab === CONFIRMED_TAB) {
      return data.confirmed;
    }

    switch (country) {
      case USA:
        return counties;
      case CANADA:
        return convertedBoundaries;
      case SOMALIA:
        return monga;
    }
  };

  getStyleFunction = (data, tab) => {
    switch (tab) {
      case CONFIRMED_TAB:
        if (country === USA) return circleStyle;
        else return createConfirmedStyle(colourScheme, CONF_SCHEME_THRESHOLDS);
      case POT_TAB:
        return createFormStyle(
          data.form,
          colourScheme,
          POT_SCHEME_THRESHOLDS,
          POT_TAG
        );
      case VULN_TAB:
        return createFormStyle(
          data.form,
          colourScheme,
          HIGH_RISK_SCHEME_THRESHOLDS,
          VULN_TAG
        );
      case BOTH_TAB:
        return createFormStyle(
          data.form,
          colourScheme,
          BOTH_SCHEME_THRESHOLDS,
          BOTH_TAG
        );
    }
  };

  // default map renderer. it only renders circles if pointTolayer is defined
  render() {
    const { t } = this.props;

    if (!this.props.data.form || !this.props.data.confirmed)
      return <p>{t("loading")}</p>;

    const title = "title";
    const view = VIEWS[country];

    const styleOptions = {
      className: "popupCustom",
    };

    // needs more info for potential cases by county
    const bindPopupOnEachFeatureINT = (feature, layer) => {
      let content;
      let regionID = "";
      let regionData;
      let somaliaMultiplier = 1;

      if (i18nlang === "enUS") {
        regionID = feature.properties.COUNTYNS;
        regionData = this.props.data.form.county[regionID];
      } else {
        regionID = feature.properties.name;
        regionData = this.props.data.form.region[regionID];
        somaliaMultiplier = 25;
      }

      let regionReports;
      try {
        regionReports = regionData.number_reports;
      } catch {
        regionReports = 0;
      }

      if (regionData) {
        if (regionReports < 25 / somaliaMultiplier) {
          content =
            "<h3>" +
            feature.properties.NAME +
            " County</h3>" +
            "We don't have enough data for this region";
        } else {
          content = "<h3>" + feature.properties.NAME;

          if (i18nlang === "enUS") {
            content += " County</h3>";
          } else {
            content += "</h3>";
          }

          if (this.state.tab === VULN_TAB) {
            content +=
              "<h3>" +
              regionData.risk +
              " vulnerable individuals" +
              regionData.number_reports +
              " reports in total</h3>";
          } else if (this.state.tab === BOTH_TAB) {
            content +=
              "<h3>" +
              regionData.both +
              " vulnerable individuals who are also potential cases" +
              regionData.number_reports +
              " reports in total</h3>";
          } else if (this.state.tab === POT_TAB) {
            content +=
              "<h3>" +
              regionData.pot +
              " potential cases" +
              regionData.number_reports +
              " reports in total</h3>";
          }
        }
      } else {
        if (this.state.tab === CONFIRMED_TAB) {
          if (i18nlang === "enUS") {
            content =
              "<h3>" +
              feature.properties.Combined_Key +
              "</h3>" +
              "<p>Confirmed Cases: " +
              feature.properties.Confirmed +
              "</p>";
          } else {
            content =
              "<h3>" +
              feature.properties.COUNTRY +
              "</h3>" +
              "<p>Confirmed Cases: " +
              feature.properties.CONFIRMED +
              "</p>";
          }
        } else {
          content =
            "<h3>" +
            feature.properties.NAME +
            " County</h3>" +
            "We don't have enough data for this region";
        }
      }

      layer.bindPopup(content, styleOptions);
    };

    // this function is called with each polygon when the GeoJSON polygons are rendered
    // just creates the popup content and binds a popup to each polygon
    // `feature` is the GeoJSON feature (the FSA polygon)
    // use the FSA polygon FSA ID to get the FSA data from `formData`
    const bindPopupOnEachFeature = (feature, layer) => {
      const fsaID = feature.properties.CFSAUID;
      let fsaData = this.props.data.form.fsa[fsaID];
      if (!fsaData) {
        console.log("no data for fsa ID", fsaID);
        fsaData = {}; // instead of an error, it will say 'undefined' in the popup
      }

      let content;

      if (this.state.tab === CONFIRMED_TAB) {
        content =
          `<h3>${feature.properties.ENGNAME}</h3>` +
          `${feature.properties.CaseCount} ${t("confirmedCases")} <br />` +
          `${t("last_updated")}: ${feature.properties.Last_Updated}`;
      } else {
        let XXX;
        const YYY = fsaData.number_reports;
        const one = YYY === one;

        if (this.state.tab === VULN_TAB) {
          XXX = fsaData.risk;
          if (one) content = t("vul_case_popup_1");
          else content = t("vul_case_popup");
        } else if (this.state.tab === BOTH_TAB) {
          XXX = fsaData.both;
          if (one) content = t("pot_vul_popup_1");
          else content = t("pot_vul_popup");
        } else if (this.state.tab === POT_TAB) {
          XXX = fsaData.pot;
          if (one) content = t("pot_case_popup_1");
          else content = t("pot_case_popup");
        }
        content = content
          .replace("FSA", fsaID)
          .replace("XXX", XXX)
          .replace("YYY", YYY);
      }

      layer.bindPopup(content, styleOptions);
    };

    let pointToLayer;
    let bindPopups = bindPopupOnEachFeature;

    if (country === USA || country === SOMALIA) {
      bindPopups = bindPopupOnEachFeatureINT;
      pointToLayer = (feature, latlng) => {
        let radius = MIN_CIRCLE_RADIUS;
        let cases = feature.properties.Confirmed;
        let somaliaMultiplier = 1;
        if (i18nlang === "enUS") {
          cases = feature.properties.Confirmed;
        } else {
          somaliaMultiplier = 0.025;
          if (this.state.tab === POT_TAB) {
            cases = this.props.data.form[feature.properties.NAME].pot;
          } else if (this.state.tab === VULN_TAB) {
            cases = this.props.data.form[feature.properties.NAME].risk;
          } else if (this.state.tab === BOTH_TAB) {
            cases = this.props.data.form[feature.properties.NAME].both;
          }
        }

        if (cases > 10000 * somaliaMultiplier) {
          radius = MAX_CIRCLE_RAD;
        } else if (cases > 5000 * somaliaMultiplier) {
          radius = MAX_CIRCLE_RAD * (4 / 5);
        } else if (cases > 2500 * somaliaMultiplier) {
          radius = MAX_CIRCLE_RAD * (3 / 5);
        } else if (cases > 1000 * somaliaMultiplier) {
          radius = MAX_CIRCLE_RAD / 2;
        } else if (cases > 500 * somaliaMultiplier) {
          radius = MAX_CIRCLE_RAD * (2 / 5);
        } else if (cases > 100 * somaliaMultiplier) {
          radius = MAX_CIRCLE_RAD / 5;
        }

        return L.circleMarker(latlng, {
          radius: radius,
        });
      };
    }

    //
    // we wait until the formData is not null before rendering the GeoJSON.
    // otherwise it will try to create a popup for every FSA but the data won't
    // be there yet.
    //
    // the key prop on the GeoJSON component ensures React will re-render
    // the geojson layer when the tab changes. This does the work of
    // unbinding all popups and recreating them with the correct data.

    return (
      <div>
        <div id="tabs" className="TabSelectors btn_group">
          <PrimaryButton
            className="active"
            onClick={(e) => this.setTab(BOTH_TAB, 0)}
          >
            {t("pot_vul_button")}
          </PrimaryButton>
          <PrimaryButton onClick={(e) => this.setTab(POT_TAB, 1)}>
            {t("pot_button")}
          </PrimaryButton>
          <PrimaryButton onClick={(e) => this.setTab(VULN_TAB, 2)}>
            {t("vul_button")}
          </PrimaryButton>
          <PrimaryButton onClick={(e) => this.setTab(CONFIRMED_TAB, 3)}>
            {t("cul_button")}
          </PrimaryButton>
        </div>
        <div className="mapTitle"> {title} </div>
        <div style={{ height: this.state.height }}>
          <Map
            maxBounds={view.bounds}
            center={view.start}
            zoom={view.startZoom}
            style={{ height: this.state.height, zIndex: 0 }} // TODO Add to CSS instead
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              minZoom={view.minZoom}
            />
            <GeoJSON
              data={this.getGeoJson(this.props.data, this.state.tab)}
              style={this.getStyleFunction(this.props.data, this.state.tab)}
              onEachFeature={bindPopups}
              pointToLayer={pointToLayer}
              key={this.state.tab}
            />
            <LocateControl />
            <Legend colourScheme={colourScheme} tab={this.state.tab} />
          </Map>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.locationChange.status);
  if (state.locationChange.status) {
    return { location: state.locationChange.status };
  }
  return { location: false };
};

export default connect(mapStateToProps)(
  withTranslation("Leafletmap")(Leafletmap)
);
