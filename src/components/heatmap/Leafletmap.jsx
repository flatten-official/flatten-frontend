import React from "react";
import { render } from "react-dom";
import PrimaryButton from "../common/buttons/PrimaryButton";
import { Map, Marker, Popup, TileLayer, GeoJSON, LayersControl } from "react-leaflet";
import convertedBoundaries from "./converted_boundaries.js";
import Legend from "./Legend";

console.log("converted", convertedBoundaries);

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
const CON_SCHEME_THRESHOLDS = [5, 25, 100, 250];

function styleConfirmedPolygons(feature) {
  const case_num = feature.properties["CaseCount"];

  return {
    // define the outlines of the map
    weight: 0.9,
    color: "gray",
    dashArray: "3",
    // define the color and opacity of each polygon
    fillColor: getColour(case_num, COLOUR_SCHEME, CON_SCHEME_THRESHOLDS),
    fillOpacity: case_num === 0 ? 0 : POLYGON_OPACITY
  };
}

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
    }
    else {
      // case if data_tag is the confirmed cases
      const num_cases = feature.properties["CaseCount"]

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
    this.state = { tab: "vuln", formData: null, confirmed_cases: null };
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
    console.log("getting form data");
    let url =
      "https://storage.googleapis.com/flatten-271620.appspot.com/form_data.json";
    fetch(url)
      .then(r => r.json())
      .then(d => {
        console.log(d);
        return d;
      })
      .then(formData => this.setState({ formData }));
  }

  getConfirmedCasesData() {
    console.log("getting confirmed cases data");
    let url =
      "https://opendata.arcgis.com/datasets/e5403793c5654affac0942432783365a_0.geojson";
    fetch(url)
      .then(r => r.json())
      .then(d => {
        console.log(d);
        return d;
      })
      .then(confirmed_cases => this.setState({ confirmed_cases }));
  }

  renderMap(formData, confirmed_cases, styleFunc, bindPopupOnEachFeature, tab) {
    let data;
    if (formData !== null && (tab === "both" || tab === "pot" || tab === "vuln")) {
      data = convertedBoundaries;
    }
    else if (tab == "conf") {
      data = confirmed_cases;
    }
    else {
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
    let legend;
    let styleFunc;
    let title;

    console.log(this.state.formData)

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

    // this function is called with each polygon when the GeoJSON polygons are rendered
    // just creates the popup content and binds a popup to each polygon
    // `feature` is the GeoJSON feature (the FSA polygon)
    // use the FSA polygon FSA ID to get the FSA data from `formData`
    let bindPopupOnEachFeature = (feature, layer) => {
      let fsaID = feature.properties["CFSAUID"];
      if (!this.state.formData.fsa[fsaID]) {
        console.log("no data for fsa ID", fsaID);
      }
      let fsaData = this.state.formData.fsa[fsaID];
      if (!fsaData) {
        fsaData = {}; // instead of an error, it will say 'undefined' in the popup
      }

      let content = `FSA ID: ${fsaID} <br/>`;
      // `FSA data: ${JSON.stringify(fsaData)}`

      if (this.state.tab === "vuln") {
        content += `Vulnerable cases: ${fsaData["risk"]} <br/>`;
      } else if (this.state.tab === "conf") {
        content = `${feature.properties["ENGNAME"]} <br/><br/>` + `${feature.properties["CaseCount"]} confirmed cases <br />` + `Last Updated: ${feature.properties["Last_Updated"]}`;
      } else if (this.state.tab === "both") {
        content += `Potential and Vulnerable: ${fsaData["both"]} <br/>`;
      } else if (this.state.tab === "pot") {
        content += `Potential Cases: ${fsaData["pot"]} <br/>`;
      }

      if (this.state.tab !== "conf") {
        content += `We received ${fsaData["number_reports"]} reports total.`
      }
      layer.bindPopup(content);
    };

    // feel free to change classNames I just named them
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
            {this.renderMap(this.state.formData,
              this.state.confirmed_cases,
              styleFunc,
              bindPopupOnEachFeature,
              this.state.tab
            )}
            <Legend />
          </Map>
        </div>
        <div className="TabSelectors btn_group">
          <PrimaryButton onClick={e => this.setTab("both")}>Potential and Vulnerable cases</PrimaryButton>
          <PrimaryButton onClick={e => this.setTab("pot")}>Potential cases</PrimaryButton>
          <PrimaryButton onClick={e => this.setTab("vuln")}>Vulnerable individuals</PrimaryButton>
          <PrimaryButton onClick={e => this.setTab("conf")}>Confirmed cases</PrimaryButton>
        </div>
      </div>
    );
  }
}

export default Leafletmap;
