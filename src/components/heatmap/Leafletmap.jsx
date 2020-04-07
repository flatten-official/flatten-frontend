import React from "react";
import { render } from "react-dom";
import { Map, Marker, Popup, TileLayer, GeoJSON } from "react-leaflet";
import convertedBoundaries from "./converted_boundaries.js";

console.log("converted", convertedBoundaries);

// stays in Canada
const CANADA_BOUNDS = [[38, -150], [87, -45]];
// starts you in ontario
const ONTARIO = [51.2538, -85.3232];
const INITIAL_ZOOM = 5;
const height = "800px";

// white, yellow, orange, brown, red, black
const COLOUR_SCHEME = ["#ffffb2", "#fecc5c", "#fd8d3c", "#f03b20", "#bd0026"];
const POT_SCHEME_THRESHOLDS = [0.02, 0.05, 0.1, 0.25];
const HIGH_RISK_SCHEME_THRESHOLDS = [0.15, 0.25, 0.35, 0.5];
const BOTH_SCHEME_THRESHOLDS = [0.01, 0.02, 0.05, 0.1];
const POLYGON_OPACITY = 0.4;
const NOT_ENOUGH_GRAY = "#909090";
// max size circle can be on map
const MAX_CIRCLE_RAD = 35;
const MIN_CIRCLE_RADIUS = 6;

///

const CON_SCHEME_THRESHOLDS = [5, 25, 100, 250];

// gets data from gcloud
// let form_data_obj = {
//   total_responses: 6969, // total number of reports recieved
//   max: 9992,
//   time: 29483929829, // UTC unix timestamp in ms since the origin
//   fsa: {
//     B1A: {
//       number_reports: 4938,
//       pot: 23,
//       risk: 18,
//       both: 2, // NB these are not included if fsa excluded is true
//       fsa_excluded: false // flag to include / exclude regions with less than 50 people from census data
//     },
//     M5T: {
//       number_reports: 4938,
//       pot: 23,
//       risk: 18,
//       both: 2, // NB these are not included if fsa excluded is true
//       fsa_excluded: false // flag to include / exclude regions with less than 50 people from census data
//     },
//     M5B: {
//       number_reports: 4938,
//       pot: 23,
//       risk: 18,
//       both: 2, // NB these are not included if fsa excluded is true
//       fsa_excluded: false // flag to include / exclude regions with less than 50 people from census data
//     },
//     S0G: {
//       number_reports: 4938,
//       pot: 23,
//       risk: 18,
//       both: 2, // NB these are not included if fsa excluded is true
//       fsa_excluded: false // flag to include / exclude regions with less than 50 people from census data
//     }
//   }
// };
// let confirmed_data;

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
    this.state = { tab: "conf", formData: null };
    this.setTab = this.setTab.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  setTab(tabID) {
    this.setState({ tab: tabID });
  }

  getData() {
    console.log("getting form data");
    let url =
      "https://storage.googleapis.com/flatten-271620.appspot.com/form_data.json";
    fetch(url)
      .then(r => r.json())
      .then(formData => this.setState({ formData }));
  }

  render() {
    let legend;
    let styleFunc;
    let title;

    if (this.state.tab === "conf") {
      title = "Confirmed Cases";
      //potential cases style function just for example
      styleFunc = create_style_function(
        this.state.formData,
        COLOUR_SCHEME,
        POT_SCHEME_THRESHOLDS,
        "pot"
      );
      // legend = confirmedLegend;
    } else if (this.state.tab === "vuln") {
      title = "Vulnerable cases";
      styleFunc = create_style_function(
        this.state.formData,
        COLOUR_SCHEME,
        HIGH_RISK_SCHEME_THRESHOLDS,
        "risk"
      );
    }

    //feel free to change classNames

    return (
      <div>
        <div className="PageTitle">
          {title}
          <div className="TabSelectors">
            <button onClick={e => this.setTab("conf")}>Confirmed case</button>
            <button onClick={e => this.setTab("vuln")}>vulnerable cases</button>
          </div>
        </div>
        <div style={{ height }}>
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
            <GeoJSON data={convertedBoundaries} style={styleFunc} />
          </Map>
        </div>
      </div>
    );
  }
}

export default Leafletmap;
