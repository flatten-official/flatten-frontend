import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import PrimaryButton from "../common/buttons/PrimaryButton";
import { Map, TileLayer, GeoJSON } from "react-leaflet";
import PropTypes from "prop-types";
import Legend from "./Legend";
import LocateControl from "./LocateControl";

import {
  BOTH_TAB,
  CONF_TAB,
  CONFIRMED_CIRCLE_STYLE,
  NO_DATA_THRESHOLD,
  NOT_ENOUGH_GRAY,
  POLYGON_OPACITY,
  POT_TAB,
  TABS,
  VULN_TAB,
} from "./mapConstants";

import { getColour } from "./helper";
// import L from "leaflet";

// this will work for USA once we have data to fetch for usa FORMS

class Leafletmap extends Component {
  tabIndex = 0;
  state = { tab: BOTH_TAB };

  // updateDimensions() {
  //   const height = window.innerWidth >= 992 ? window.innerHeight - 200 : 500;
  //   this.setState({ height: height });
  // }

  // componentDidMount() {
  //   this.updateDimensions();
  //   window.addEventListener("resize", this.updateDimensions.bind(this));
  // }
  //
  // componentWillUnmount() {
  //   window.removeEventListener("resize", this.updateDimensions.bind(this));
  // }

  setTab = (tabID, index) => {
    document
      .getElementById("tabs")
      .children[this.tabIndex].classList.remove("active");
    document.getElementById("tabs").children[index].classList.add("active");
    this.tabIndex = index;

    this.setState({ tab: tabID });
  };

  createConfirmedStyle = (colourScheme) => (feature) => {
    // case if dataTag is the confirmed cases
    const numCases = feature.properties[this.props.country.confirmedTag];
    let colour, opacity;

    if (numCases && numCases > 0) {
      colour = getColour(colourScheme, numCases);
      opacity = POLYGON_OPACITY;
    }

    return {
      // define the outlines of the map
      weight: 0.9,
      color: "white",
      // define the color and opacity of each polygon
      fillColor: colour || null,
      fillOpacity: opacity || 0,
    };
  };

  createFormStyle = (tab) => (feature) => {
    /**
     Returns a function that given a polygon gives it it's color
     */
    const { dataTag, colourScheme } = TABS[tab];
    const { regionName, geoJsonRegionName } = this.props.country;
    let opacity, colour;

    // Get data for that postal code from the form
    const regionData = this.props.data.form[regionName][
      feature.properties[geoJsonRegionName]
    ];

    // only set numbers if it exists in form_data_obj
    if (regionData && dataTag in regionData) {
      const numTotal = regionData.number_reports;

      if (numTotal >= NO_DATA_THRESHOLD) {
        const numCases = regionData[dataTag];
        colour = getColour(colourScheme, numCases / numTotal);

        if (numCases === 0) opacity = 0;
      }
    }

    return {
      // define the outlines of the map
      weight: 0.9,
      color: "white",
      // define the color and opacity of each polygon
      fillColor: colour || NOT_ENOUGH_GRAY,
      fillOpacity: opacity || POLYGON_OPACITY,
    };
  };

  getGeoJson = () => {
    if (this.state.tab === CONF_TAB) {
      return this.props.data.confirmed;
    }

    return this.props.country.geoJson;
  };

  getStyleFunction = () => {
    const tab = this.state.tab;
    if (tab === CONF_TAB) {
      if (this.props.country.useCirclesForConfirmed)
        return (_) => CONFIRMED_CIRCLE_STYLE;
      else return this.createConfirmedStyle(TABS[tab].colourScheme);
    }

    return this.createFormStyle(tab);
  };

  // default map renderer. it only renders circles if pointTolayer is defined
  render() {
    const { t, country, data } = this.props;

    // we wait until the formData is not null before rendering the GeoJSON.
    // otherwise it will try to create a popup for every FSA but the data won't
    // be there yet.
    if (!data.form || !data.confirmed) return <h3>{t("loading")}</h3>;

    // const styleOptions = {
    //   className: "popupCustom",
    // };
    // // needs more info for potential cases by county
    // const bindPopupOnEachFeatureINT = (feature, layer) => {
    //   let content;
    //   let regionID = "";
    //   let regionData;
    //   let somaliaMultiplier = 1;
    //
    //   if (country === USA) {
    //     regionID = feature.properties.COUNTYNS;
    //     regionData = this.props.data.form.county[regionID];
    //   } else {
    //     regionID = feature.properties.name;
    //     try {
    //       regionData = this.props.data.form.region[regionID];
    //     } catch {
    //       regionData = null;
    //     }
    //     somaliaMultiplier = 25;
    //   }
    //
    //   let regionReports;
    //   try {
    //     regionReports = regionData.number_reports;
    //   } catch {
    //     regionReports = 0;
    //   }
    //
    //   if (regionData) {
    //     if (regionReports < 25 / somaliaMultiplier) {
    //       content = "<h3>" + feature.properties.NAME;
    //       if (country === USA) {
    //         content += " County</h3>We don't have enough data for this region";
    //       } else {
    //         content += "</h3>We don't have enough data for this region";
    //       }
    //     } else {
    //       content = "<h3>" + feature.properties.NAME;
    //
    //       if (country === USA) {
    //         content += " County</h3>";
    //       } else {
    //         content += "</h3>";
    //       }
    //
    //       if (this.state.tab === VULN_TAB) {
    //         content +=
    //           "<h3>" +
    //           regionData.risk +
    //           " vulnerable individuals" +
    //           regionData.number_reports +
    //           " reports in total</h3>";
    //       } else if (this.state.tab === BOTH_TAB) {
    //         content +=
    //           "<h3>" +
    //           regionData.both +
    //           " vulnerable individuals who are also potential cases" +
    //           regionData.number_reports +
    //           " reports in total</h3>";
    //       } else if (this.state.tab === POT_TAB) {
    //         content +=
    //           "<h3>" +
    //           regionData.pot +
    //           " potential cases" +
    //           regionData.number_reports +
    //           " reports in total</h3>";
    //       }
    //     }
    //   } else {
    //     if (this.state.tab === CONF_TAB) {
    //       if (country === USA) {
    //         content =
    //           "<h3>" +
    //           feature.properties.Combined_Key +
    //           "</h3>" +
    //           "Confirmed Cases: " +
    //           feature.properties.Confirmed;
    //       } else {
    //         content =
    //           "<h3>" +
    //           feature.properties.COUNTRY +
    //           "</h3>" +
    //           "<p>Confirmed Cases: " +
    //           feature.properties.CONFIRMED +
    //           "</p>";
    //       }
    //     } else {
    //       content =
    //         "<h3>" +
    //         feature.properties.NAME +
    //         " County</h3>" +
    //         "We don't have enough data for this region";
    //     }
    //   }
    //
    //   layer.bindPopup(content, styleOptions);
    // };
    //
    // // this function is called with each polygon when the GeoJSON polygons are rendered
    // // just creates the popup content and binds a popup to each polygon
    // // `feature` is the GeoJSON feature (the FSA polygon)
    // // use the FSA polygon FSA ID to get the FSA data from `formData`
    // const bindPopupOnEachFeature = (feature, layer) => {
    //   const fsaID = feature.properties.CFSAUID;
    //   let fsaData = data.form.fsa[fsaID];
    //   if (!fsaData) {
    //     console.log("no data for fsa ID", fsaID);
    //     fsaData = {}; // instead of an error, it will say 'undefined' in the popup
    //   }
    //
    //   let content;
    //
    //   if (this.state.tab === CONF_TAB) {
    //     content =
    //       `<h3>${feature.properties.ENGNAME}</h3>` +
    //       `${feature.properties.CaseCount} ${t("confirmedCases")} <br />` +
    //       `${t("last_updated")}: ${feature.properties.Last_Updated}`;
    //   } else {
    //     let XXX;
    //     const YYY = fsaData.number_reports;
    //     const one = YYY === one;
    //
    //     if (YYY < 25) {
    //       content = t("msg_noentries");
    //     } else {
    //       if (this.state.tab === VULN_TAB) {
    //         XXX = fsaData.risk;
    //         if (one) content = t("vul_case_popup_1");
    //         else content = t("vul_case_popup");
    //       } else if (this.state.tab === BOTH_TAB) {
    //         XXX = fsaData.both;
    //         if (one) content = t("pot_vul_popup_1");
    //         else content = t("pot_vul_popup");
    //       } else if (this.state.tab === POT_TAB) {
    //         XXX = fsaData.pot;
    //         if (one) content = t("pot_case_popup_1");
    //         else content = t("pot_case_popup");
    //       }
    //     }
    //     content = content
    //       .replace("FSA", fsaID)
    //       .replace("XXX", XXX)
    //       .replace("YYY", YYY);
    //   }
    //
    //   layer.bindPopup(content, styleOptions);
    // };
    //
    // let pointToLayer;
    // let bindPopups = bindPopupOnEachFeature;
    //
    // if (country === USA || country === SOMALIA) {
    //   bindPopups = bindPopupOnEachFeatureINT;
    //   pointToLayer = (feature, latlng) => {
    //     let radius = MIN_CIRCLE_RADIUS;
    //     let cases = feature.properties.Confirmed;
    //     let somaliaMultiplier = 1;
    //     if (country === USA) {
    //       cases = feature.properties.Confirmed;
    //     } else {
    //       somaliaMultiplier = 0.025;
    //       if (this.state.tab === POT_TAB) {
    //         cases = data.form[feature.properties.NAME].pot;
    //       } else if (this.state.tab === VULN_TAB) {
    //         cases = data.form[feature.properties.NAME].risk;
    //       } else if (this.state.tab === BOTH_TAB) {
    //         cases = data.form[feature.properties.NAME].both;
    //       }
    //     }
    //
    //     if (cases > 10000 * somaliaMultiplier) {
    //       radius = MAX_CIRCLE_RAD;
    //     } else if (cases > 5000 * somaliaMultiplier) {
    //       radius = MAX_CIRCLE_RAD * (4 / 5);
    //     } else if (cases > 2500 * somaliaMultiplier) {
    //       radius = MAX_CIRCLE_RAD * (3 / 5);
    //     } else if (cases > 1000 * somaliaMultiplier) {
    //       radius = MAX_CIRCLE_RAD / 2;
    //     } else if (cases > 500 * somaliaMultiplier) {
    //       radius = MAX_CIRCLE_RAD * (2 / 5);
    //     } else if (cases > 100 * somaliaMultiplier) {
    //       radius = MAX_CIRCLE_RAD / 5;
    //     }
    //
    //     return L.circleMarker(latlng, {
    //       radius: radius,
    //     });
    //   };
    // }

    // return (
    //   <>
    //     <div id="tabs" className="TabSelectors btn_group">
    //       <PrimaryButton
    //         className="active"
    //         onClick={(e) => this.setTab(BOTH_TAB, 0)}
    //       >
    //         {t("pot_vul_button")}
    //       </PrimaryButton>
    //     </div>
    //     <div className="mapTitle">Spacer</div>
    //     <div>
    //       <Map
    //         id="leaflet-map"
    //         center={country.view.start}
    //         zoom={country.view.startZoom}
    //       >
    //         <TileLayer
    //           attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    //           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //         />
    //       </Map>
    //     </div>
    //   </>
    // );

    return (
      <>
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
          <PrimaryButton onClick={(e) => this.setTab(CONF_TAB, 3)}>
            {t("cul_button")}
          </PrimaryButton>
        </div>
        <div>
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
              // the geojson layer when the tab changes. This does the work of
              // unbinding all popups and recreating them with the correct data.
              data={this.getGeoJson()}
              style={this.getStyleFunction()}
              // onEachFeature={bindPopups}
              // pointToLayer={pointToLayer}
              key={this.state.tab}
            />
            <LocateControl />
            <Legend tab={TABS[this.state.tab]} country={country} />
          </Map>
        </div>
      </>
    );
  }
}

Leafletmap.propTypes = {
  data: PropTypes.object,
  country: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation("Leafletmap")(Leafletmap);
