import React from "react";
import { withTranslation } from "react-i18next";
import PrimaryButton from "../common/buttons/PrimaryButton";
import { Map, TileLayer, GeoJSON } from "react-leaflet";
import convertedBoundaries from "./converted_boundaries.js";
import counties from "./county_boundaries.js";
import monga from "./mongadishu_coords.js";
import Legend from "./Legend";
import LocateControl from "./LocateControl";
import L from "leaflet";
import i18next from "i18next";
import { connect } from "react-redux";

// checks language
const i18nlang = i18next.language;

const VIEWS = {
  canada: {
    bounds: [
      [38, -150],
      [87, -45],
    ],
    zoom: 4,
    start: [56.1304, -106.3468],
  },
  usa: {
    bounds: [
      [15, -180],
      [77, -60],
    ],
    start: [37.0902, -95.7129],
    zoom: 3,
  },
  somalia: {
    bounds: [
      [-1.68325, 40.98105],
      [12.02464, 51.13387],
    ],
    start: [2.0469, 45.3182],
    zoom: 8,
  },
};

// white, yellow, orange, brown, red, black
const colourScheme = ["#FAE0A6", "#FABD05", "#FF7800", "#EB4236", "#C70505"];
const CONF_SCHEME_THRESHOLDS = [5, 25, 100, 250];
const POT_SCHEME_THRESHOLDS = [0.02, 0.05, 0.1, 0.25];
const HIGH_RISK_SCHEME_THRESHOLDS = [0.15, 0.25, 0.35, 0.5];
const BOTH_SCHEME_THRESHOLDS = [0.01, 0.02, 0.05, 0.1];
const POLYGON_OPACITY = 1;
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
      color: "white",
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
  constructor(props) {
    super(props);

    this.state = {
      tab: "both",
    };
  }

  updateDimensions() {
    const height = window.innerWidth >= 992 ? window.innerHeight - 200 : 500;
    this.setState({ height: height });
  }

  componentDidMount() {
    console.log(this.props);
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    this.updateDimensions();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
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
  renderMap(data, bindPopupOnEachFeature, tab, pointToLayer, styleFuncCircles) {
    let styleFunc;
    const formData = data.form;
    const confirmedCases = data.confirmed;

    if (
      formData !== null &&
      (tab === "both" || tab === "pot" || tab === "vuln")
    ) {
      if (i18nlang === "enUS") {
        data = counties;
      } else if (i18nlang === "so") {
        data = monga;
      } else {
        data = convertedBoundaries;
      }

      if (tab === "pot" && i18nlang !== "so") {
        styleFunc = createStyleFunction(
          formData,
          colourScheme,
          POT_SCHEME_THRESHOLDS,
          "pot"
        );
      } else if (tab === "vuln" && i18nlang !== "so") {
        styleFunc = createStyleFunction(
          formData,
          colourScheme,
          HIGH_RISK_SCHEME_THRESHOLDS,
          "risk"
        );
      } else if (tab === "both" && i18nlang !== "so") {
        styleFunc = createStyleFunction(
          formData,
          colourScheme,
          BOTH_SCHEME_THRESHOLDS,
          "both"
        );
      }
    } else if (tab === "conf" || i18nlang === "so") {
      if (i18nlang !== "so") {
        data = confirmedCases;
        styleFunc = createStyleFunction(
          formData,
          colourScheme,
          CONF_SCHEME_THRESHOLDS,
          "conf"
        );
      }
      if (i18nlang === "enUS" || i18nlang === "so") {
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

    if (!this.props.data.form || !this.props.data.confirmed)
      return <p>{t("loading")}</p>;

    const title = "title";
    let view;

    switch (i18nlang) {
      case "enUS":
        view = VIEWS.usa;
        break;
      case "so":
        view = VIEWS.somalia;
        break;
      default:
        view = VIEWS.canada;
    }

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

          if (this.state.tab === "vuln") {
            content +=
              "<h3>" +
              regionData.risk +
              " vulnerable individuals" +
              regionData.number_reports +
              " reports in total</h3>";
          } else if (this.state.tab === "both") {
            content +=
              "<h3>" +
              regionData.both +
              " vulnerable individuals who are also potential cases" +
              regionData.number_reports +
              " reports in total</h3>";
          } else if (this.state.tab === "pot") {
            content +=
              "<h3>" +
              regionData.pot +
              " potential cases" +
              regionData.number_reports +
              " reports in total</h3>";
          }
        }
      } else {
        if (this.state.tab === "conf") {
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

    const locateOptions = {
      position: "topleft",
      initialZoomLevel: 12,
      onActivate: () => {}, // callback before engine starts retrieving locations
    };

    // this function is called with each polygon when the GeoJSON polygons are rendered
    // just creates the popup content and binds a popup to each polygon
    // `feature` is the GeoJSON feature (the FSA polygon)
    // use the FSA polygon FSA ID to get the FSA data from `data.form`
    const bindPopupOnEachFeature = (feature, layer) => {
      const fsaID = feature.properties.CFSAUID;
      let fsaData = this.props.data.form.fsa[fsaID];
      if (!fsaData) {
        console.log("no data for fsa ID", fsaID);
        fsaData = {}; // instead of an error, it will say 'undefined' in the popup
      }

      let content;

      if (this.state.tab === "conf") {
        content =
          `<h3>${feature.properties.ENGNAME}</h3>` +
          `${feature.properties.CaseCount} ${t("confirmedCases")} <br />` +
          `${t("last_updated")}: ${feature.properties.Last_Updated}`;
      } else {
        let XXX;
        const YYY = fsaData.number_reports;
        const one = YYY === one;

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

      layer.bindPopup(content, styleOptions);
    };

    let pointToLayer;
    let bindPopups = bindPopupOnEachFeature;

    if (i18nlang === "enUS" || i18nlang === "so") {
      bindPopups = bindPopupOnEachFeatureINT;
      pointToLayer = (feature, latlng) => {
        let radius = MIN_CIRCLE_RADIUS;
        let cases = feature.properties.Confirmed;
        let somaliaMultiplier = 1;
        if (i18nlang === "enUS") {
          cases = feature.properties.Confirmed;
        } else {
          somaliaMultiplier = 0.025;
          if (this.state.tab === "pot") {
            cases = this.props.data.form[feature.properties.NAME].pot;
          } else if (this.state.tab === "vuln") {
            cases = this.props.data.form[feature.properties.NAME].risk;
          } else if (this.state.tab === "both") {
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
    // we wait until the data.form is not null before rendering the GeoJSON.
    // otherwise it will try to create a popup for every FSA but the data won't
    // be there yet.
    //
    // the key prop on the GeoJSON component ensures React will re-render
    // the geojson layer when the tab changes. This does the work of
    // unbinding all popups and recreating them with the correct data.

    return location ? (
      <div>
        <div id="tabs" className="TabSelectors btn_group">
          <PrimaryButton
            className="active"
            onClick={(e) => this.setTab("both", 0)}
          >
            {t("pot_vul_button")}
          </PrimaryButton>
          <PrimaryButton onClick={(e) => this.setTab("pot", 1)}>
            {t("pot_button")}
          </PrimaryButton>
          <PrimaryButton onClick={(e) => this.setTab("vuln", 2)}>
            {t("vul_button")}
          </PrimaryButton>
          <PrimaryButton onClick={(e) => this.setTab("conf", 3)}>
            {t("cul_button")}
          </PrimaryButton>
        </div>
        <div className="mapTitle"> {title} </div>
        <div style={{ height: this.state.height }}>
          <Map
            maxBounds={view.bounds}
            center={view.start}
            zoom={view.zoom}
            style={{ height: this.state.height, zIndex: 0 }}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              minZoom={view.zoom}
            />
            {this.renderMap(
              this.props.data,
              bindPopups,
              this.state.tab,
              pointToLayer,
              createStyleFunctionUSA
            )}
            <LocateControl options={locateOptions} />
            <Legend colourScheme={colourScheme} tab={this.state.tab} />
          </Map>
        </div>
      </div>
    ) : null;
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
