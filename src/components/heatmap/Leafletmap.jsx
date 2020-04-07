import React from "react";
import { render } from 'react-dom'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

// stays in Canada
const CANADA_BOUNDS = [[38, -150], [87, -45]];
// starts you in ontario
const ONTARIO = [51.2538, -85.3232];
const INITIAL_ZOOM = 5;
const height = "800px";

// white, yellow, orange, brown, red, black
const COLOUR_SCHEME = ['#ffffb2', '#fecc5c', '#fd8d3c', '#f03b20', '#bd0026'];
const POT_SCHEME_THRESHOLDS = [0.02, 0.05, 0.1, 0.25];
const HIGH_RISK_SCHEME_THRESHOLDS = [0.15, 0.25, 0.35, 0.50];
const BOTH_SCHEME_THRESHOLDS = [0.01, 0.02, 0.05, 0.1];
const POLYGON_OPACITY = 0.4;
const NOT_ENOUGH_GRAY = '#909090';
// max size circle can be on map
const MAX_CIRCLE_RAD = 35;
const MIN_CIRCLE_RADIUS = 6;

const map = (
  <Map maxBounds={CANADA_BOUNDS} center={ONTARIO} zoom={INITIAL_ZOOM} style={{height, zIndex:0}}>
    <TileLayer
      url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      minZoom={4}
    />
  </Map>
)

// map.on left for later

// function create_legend(colorThrsholds, colourScheme) {
//   let legend_content = '<i style="background:' + NOT_ENOUGH_GRAY + '"></i> ' + text.not_enough_data_legend + '<br>';

//   // Loop through our density intervals and generate a label with a coloured square for each interval.
//   for (let i = 0; i < colourScheme.length; i++) {
//       const threshold = i === 0 ? 0 : colorThrsholds[i - 1] * 100;
//       legend_content +=
//           '<i style="background:' + colourScheme[i] + '"></i> > ' + threshold + '%<br>';
//   }

//   const legend = L.control({ position: 'bottomright' });

//   legend.onAdd = (map) => {
//       const div = L.DomUtil.create('div', 'info legend');
//       div.innerHTML = legend_content;

//       return div;
//   };

//   return legend;
// }

// Don't have tabs

// gets data from gcloud
let form_data_obj, confirmed_data;

// assigns color based on thresholds
function getColour(cases, colour_scheme, color_thresholds) {
    if (color_thresholds.length !== colour_scheme.length - 1)  // Minus one since one more color then threshold
        console.log("WARNING: list lengths don't match in getColour.");


    for (let i = 0; i < color_thresholds.length; i++) {
        if (cases < color_thresholds[i]) return colour_scheme[i];
    }

    return colour_scheme[colour_scheme.length - 1];
}

function create_style_function(colour_scheme, thresholds, data_tag) {
    return (feature) => {
        let opacity = POLYGON_OPACITY; // If no data, is transparent
        let colour = NOT_ENOUGH_GRAY; // Default color if not enough data
        const post_code_data = form_data_obj['fsa'][feature.properties.CFSAUID];

        // only set numbers if it exists in form_data_obj
        if (post_code_data && data_tag in post_code_data) {
            const num_total = post_code_data['number_reports'];

            if (num_total > 25) {
                const num_cases = post_code_data[data_tag];

                if (num_cases === 0) {
                    opacity = 0;
                } else colour = getColour(num_cases / num_total, colour_scheme, thresholds);
            }
        }

        return {
            // define the outlines of the map
            weight: 0.9,
            color: 'gray',
            dashArray: '3',
            // define the color and opacity of each polygon
            fillColor: colour,
            fillOpacity: opacity
        }
    }
}

class Leafletmap extends React.Component{
    render(){
        return (
            <div style={{height}}>
              {map}
            </div>
        );
    }
}

export default Leafletmap;