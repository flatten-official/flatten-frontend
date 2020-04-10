import React from "react";
import { render } from "react-dom";
import { withTranslation } from "react-i18next";
import PrimaryButton from "../common/buttons/PrimaryButton";
import {
  CircleMarker,
  Map,
  Marker,
  Popup,
  TileLayer,
  GeoJSON,
  LayersControl
} from "react-leaflet";
import convertedBoundaries from "./converted_boundaries.js";
import Legend from "./Legend";
import L from "leaflet";
import i18next from "i18next";

// checks language 
const i18nlang = i18next.language;

// stays in Canada
const CANADA_BOUNDS = [[38, -150], [87, -45]];
// starts you in ontario
const ONTARIO = [51.2538, -85.3232];
const INITIAL_ZOOM = 5;
const height = "800px";

// white, yellow, orange, brown, red, black
const COLOUR_SCHEME = ["#ffffb2", "#fecc5c", "#fd8d3c", "#f03b20", "#bd0026"];
const CONF_SCHEME_THRESHOLDS = [5, 25, 100, 250];
const POT_SCHEME_THRESHOLDS = [0.02, 0.05, 0.1, 0.25];
const HIGH_RISK_SCHEME_THRESHOLDS = [0.15, 0.25, 0.35, 0.5];
const BOTH_SCHEME_THRESHOLDS = [0.01, 0.02, 0.05, 0.1];
const POLYGON_OPACITY = 0.4;
const NOT_ENOUGH_GRAY = "#909090";
// max size circle can be on map
const MAX_CIRCLE_RAD = 35;
const MIN_CIRCLE_RADIUS = 6;
const MAX_CASES = 10000;
const CON_SCHEME_THRESHOLDS = [5, 25, 100, 250];
const URLS = {
  "cadForm": "https://storage.googleapis.com/flatten-271620.appspot.com/form_data.json",
  "usaForm": "https://storage.googleapis.com/flatten-271620.appspot.com/form_data_usa.json",
  "cadConf": "https://opendata.arcgis.com/datasets/e5403793c5654affac0942432783365a_0.geojson",
  "usaConf": "https://opendata.arcgis.com/datasets/628578697fb24d8ea4c32fa0c5ae1843_0.geojson",
};


function create_style_function(formData, colour_scheme, thresholds, data_tag) {
  return feature => {
    let opacity = POLYGON_OPACITY; // If no data, is transparent
    let colour = NOT_ENOUGH_GRAY; // Default color if not enough data

    const post_code_data = formData
      ? formData["fsa"][feature.properties.CFSAUID]
      : null;

    // only set numbers if it exists in form_data_obj
    if (post_code_data && data_tag in post_code_data) {
      const num_total = post_code_data["number_reports"];

      if (num_total > 25) {
        const num_cases = post_code_data[data_tag];

        if (num_cases === 0) {
          opacity = 0;
        } else
          colour = getColour(num_cases / num_total, colour_scheme, thresholds);
      }
    } else {
      // case if data_tag is the confirmed cases
      const num_cases = feature.properties["CaseCount"];

      if (num_cases === 0) {
        opacity = 0;
      } else {
        colour = getColour(num_cases, colour_scheme, thresholds);
      }
    }

    return {
      // define the outlines of the map
      weight: 0.9,
      color: "gray",
      dashArray: "3",
      // define the color and opacity of each polygon
      fillColor: colour,
      fillOpacity: opacity
    };
  };
}

// Don't have tabs

// assigns color based on thresholds
function getColour(cases, colour_scheme, color_thresholds) {
  if (color_thresholds.length !== colour_scheme.length - 1)
    // Minus one since one more color then threshold
    console.log("WARNING: list lengths don't match in getColour.");

  for (let i = 0; i < color_thresholds.length; i++) {
    if (cases < color_thresholds[i]) return colour_scheme[i];
  }

  return colour_scheme[colour_scheme.length - 1];
}

class Leafletmap extends React.Component {
  constructor(props) {
    super(props);

    let formUrl;
    let confUrl;

    /*if (i18nlang === "enUS") {      
      formUrl = URLS["usaForm"];
      confUrl = URLS["usaConf"];
    } else {
      formUrl = URLS["cadForm"];
      confUrl = URLS["cadConf"];
    }*/

    formUrl = URLS["usaForm"];
    confUrl = URLS["usaConf"]; 

    this.state = { tab: "both", formURL: formUrl, confURL: confUrl, formData: null, confirmed_cases: null};
    this.setTab = this.setTab.bind(this);

    this.getFormData = this.getFormData.bind(this);
    this.getConfirmedCasesData = this.getConfirmedCasesData.bind(this);
  }

  componentDidMount() {
    this.getFormData();
    this.getConfirmedCasesData();
  }

  setTab(tabID) {
    this.setState({ tab: tabID });
  }

  getFormData() {
    fetch(this.state.formURL)
      .then(r => r.json())
      .then(d => {
        return d;
      })
      .then(formData => this.setState({ formData }));
  }

  getConfirmedCasesData() {
    fetch(this.state.confURL)
      .then(r => r.json())
      .then(d => {
        return d;
      })
      .then(confirmed_cases => this.setState({ confirmed_cases }));
  }

  renderMap(formData, confirmed_cases, styleFunc, bindPopupOnEachFeature, tab) {
    let data;
    if (
      formData !== null &&
      (tab === "both" || tab === "pot" || tab === "vuln")
    ) {
      data = convertedBoundaries;
    } else if (tab == "conf") {
      data = confirmed_cases;
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

  renderMap_USA(formData, confirmed_cases, bindPopupOnEachFeature, tab, pointToLayer) {
    let data = confirmed_cases;

    return (
      <GeoJSON
        data={data}
        onEachFeature={bindPopupOnEachFeature}
        pointToLayer={pointToLayer}
        key={tab}
      />
    );

  }

  render() {
    let { t } = this.props;
    let styleFunc;
    let title;

    if (this.state.tab === "conf") {
      //potential cases style function just for example
      styleFunc = create_style_function(
        this.state.formData,
        COLOUR_SCHEME,
        CONF_SCHEME_THRESHOLDS,
        "conf"
      );
      // legend = confirmedLegend;
    } else if (this.state.tab === "pot") {
      //potential cases style function just for example
      styleFunc = create_style_function(
        this.state.formData,
        COLOUR_SCHEME,
        POT_SCHEME_THRESHOLDS,
        "pot"
      );
      // legend = confirmedLegend;
    } else if (this.state.tab === "vuln") {
      styleFunc = create_style_function(
        this.state.formData,
        COLOUR_SCHEME,
        HIGH_RISK_SCHEME_THRESHOLDS,
        "risk"
      );
    } else if (this.state.tab === "both") {
      styleFunc = create_style_function(
        this.state.formData,
        COLOUR_SCHEME,
        BOTH_SCHEME_THRESHOLDS,
        "both"
      );
    }

    let pointToLayer = (feature, latlng) => {
      let radius = MIN_CIRCLE_RADIUS;
      let percent = feature['properties']['Confirmed']/MAX_CASES;

      if (percent > 1) {
        radius = MAX_CIRCLE_RAD;
      } else if (percent > 0.05) {
        radius = percent * MAX_CIRCLE_RAD;
      }

      return L.circleMarker(latlng, {
        radius: radius
      });
    }

    // for USA
    let bindPopupOnEachFeature_USA = (feature, layer) => {
      let loc = "<b>"+ feature.properties["Combined_Key"] + "</b>";
      let numbers = "<p>Confirmed Cases: " + feature.properties["Confirmed"] + "</p>";

      let content = loc + numbers;

      layer.bindPopup(content);
    };

    // this function is called with each polygon when the GeoJSON polygons are rendered
    // just creates the popup content and binds a popup to each polygon
    // `feature` is the GeoJSON feature (the FSA polygon)
    // use the FSA polygon FSA ID to get the FSA data from `formData`
    let bindPopupOnEachFeature = (feature, layer) => {
      let fsaID = feature.properties["CFSAUID"];
      let fsaData = this.state.formData.fsa[fsaID];
      if (!fsaData) {
        console.log("no data for fsa ID", fsaID);
        fsaData = {}; // instead of an error, it will say 'undefined' in the popup
      }

      let content;

      if (this.state.tab === "conf") {
        content =
          `${feature.properties["ENGNAME"]} <br/><br/>` +
          `${feature.properties["CaseCount"]} ${t("confirmed_cases")} <br />` +
          `${t("last_updated")}: ${feature.properties["Last_Updated"]}`;
      } else {
        let XXX;
        let YYY = fsaData["number_reports"];
        let one = YYY === one;

        if (this.state.tab === "vuln") {
          XXX = fsaData["risk"];
          if (one) content = t("vul_case_popup_1");
          else content = t("vul_case_popup");
        } else if (this.state.tab === "both") {
          XXX = fsaData["both"];
          if (one) content = t("pot_vul_popup_1");
          else content = t("pot_vul_popup");
        } else if (this.state.tab === "pot") {
          XXX = fsaData["pot"];
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
        <div style={{ height }}>
          <div> {title} </div>
          <Map
            maxBounds={CANADA_BOUNDS}
            center={ONTARIO}
            zoom={INITIAL_ZOOM}
            style={{ height, zIndex: 0 }}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              minZoom={4}
            />
            {this.renderMap_USA(
              this.state.formData,
              this.state.confirmed_cases,
              bindPopupOnEachFeature_USA,
              this.state.tab,
              pointToLayer
            )}
            <Legend colourScheme={COLOUR_SCHEME} tab={this.state.tab} />
          </Map>
        </div>
        <div className="TabSelectors btn_group">
          <PrimaryButton onClick={e => this.setTab("both")}>
            {t("pot_vul_button")}
          </PrimaryButton>
          <PrimaryButton onClick={e => this.setTab("pot")}>
            {t("pot_button")}
          </PrimaryButton>
          <PrimaryButton onClick={e => this.setTab("vuln")}>
            {t("vul_button")}
          </PrimaryButton>
          <PrimaryButton onClick={e => this.setTab("conf")}>
            {t("cul_button")}
          </PrimaryButton>
        </div>
      </div>
    );
  }
}

export default withTranslation("Leafletmap")(Leafletmap);
