import convertedBoundaries from "../../assets/map/converted_boundaries.js";
import counties from "../../assets/map/county_boundaries.js";
import monga from "../../assets/map/mongadishu_coords.js";
import i18next from "i18next";

const MAP_COLOURS = ["#FAE0A6", "#FABD05", "#FF7800", "#EB4236", "#C70505"];

export const NOT_ENOUGH_GRAY = "#909090";
export const POLYGON_OPACITY = 1;

export const TABS = [
  {
    colourScheme: {
      colours: MAP_COLOURS,
      thresholds: [0.01, 0.02, 0.05, 0.1],
    },
    dataTag: "both",
    notEnoughDataThreshold: 25,
    legend: {
      legendTitle: "pct_responses",
      isPercent: true,
    },
    tabName: "pot_vul_button",
    dataInGeoJson: false,
    dataName: "form",
    countryTabTag: "both",
  },
  {
    colourScheme: {
      colours: MAP_COLOURS,
      thresholds: [0.15, 0.25, 0.35, 0.5],
    },
    dataTag: "risk",
    notEnoughDataThreshold: 25,
    legend: {
      legendTitle: "pct_responses",
      isPercent: true,
    },
    tabName: "vul_button",
    dataInGeoJson: false,
    dataName: "form",
    countryTabTag: "vuln",
  },
  {
    colourScheme: {
      colours: MAP_COLOURS,
      thresholds: [0.02, 0.05, 0.1, 0.25],
    },
    dataTag: "pot",
    notEnoughDataThreshold: 25,
    legend: {
      legendTitle: "pct_responses",
      isPercent: true,
    },
    tabName: "pot_button",
    dataInGeoJson: false,
    dataName: "form",
    countryTabTag: "pot",
  },
  {
    colourScheme: {
      colours: MAP_COLOURS,
      thresholds: [5, 25, 100, 250],
    },
    dataTag: "conf",
    legend: {
      legendTitle: "number_of_cases",
      isPercent: false,
    },
    tabName: "cul_button",
    dataInGeoJson: true,
    dataName: "confirmed",
    countryTabTag: "confirmed",
  },
];

const COUNTRIES = {
  canada: {
    view: {
      bounds: [
        [38, -150],
        [87, -45],
      ],
      startZoom: 4,
      minZoom: 4,
      start: [56.1304, -106.3468],
    },
    urls: {
      confirmed:
        "https://opendata.arcgis.com/datasets/e5403793c5654affac0942432783365a_0.geojson",
      form:
        "https://storage.googleapis.com/flatten-271620.appspot.com/form_data.json",
    },
    regionName: "fsa",
    geoJson: convertedBoundaries,
    geoJsonRegionName: "CFSAUID",
    confirmedTag: "CaseCount",
    tabs: {
      confirmed: {
        points: false,
      },
      pot: {
        points: false,
      },
      vuln: {
        points: false,
      },
      both: {
        points: false,
      },
    },
  },
  usa: {
    view: {
      bounds: [
        [15, -180],
        [77, -60],
      ],
      start: [37.0902, -95.7129],
      startZoom: 3,
      minZoom: 3,
    },
    urls: {
      form:
        "https://storage.googleapis.com/flatten-271620.appspot.com/form_data_usa.json",
      confirmed:
        "https://opendata.arcgis.com/datasets/628578697fb24d8ea4c32fa0c5ae1843_0.geojson",
    },
    regionName: "county",
    geoJsonRegionName: "COUNTYNS",
    geoJson: counties,
    confirmedThresholds: [],
    confirmedTag: "Confirmed",
    tabs: {
      confirmed: {
        points: true,
        circleSizes: [3, 5, 10, 15, 20, 25],
        thresholds: [100, 500, 1000, 5000, 10000],
      },
      pot: {
        points: false,
      },
      vuln: {
        points: false,
      },
      both: {
        points: false,
      },
    },
  },
  somalia: {
    view: {
      bounds: [
        [-1.68325, 40.98105],
        [12.02464, 51.13387],
      ],
      start: [2.0469, 45.3182],
      startZoom: 13,
      minZoom: 13,
    },
    urls: {
      form:
        "https://storage.googleapis.com/flatten-271620.appspot.com/form_data_usa.json", // TODO Change to somalia
      confirmed:
        "https://storage.googleapis.com/flatten-staging-271921.appspot.com/somalia_confirmed.json",
    },
    geoJson: monga,
    regionName: "region",
    geoJsonRegionName: "name",
    confirmedTag: "CONFIRMED",
    tabs: {
      confirmed: {
        points: true,
        circleSizes: [3, 5, 10, 15, 20, 25],
        thresholds: [3, 12, 25, 125, 250],
      },
      pot: {
        points: true,
        circleSizes: [3, 5, 10, 15, 20, 25, 30],
        thresholds: [3, 12, 25, 125, 250],
      },
      vuln: {
        points: true,
        circleSizes: [3, 5, 10, 15, 20, 25, 30],
        thresholds: [3, 12, 25, 125, 250],
      },
      both: {
        points: true,
        circleSizes: [3, 5, 10, 15, 20, 25],
        thresholds: [3, 12, 25, 125, 250],
      },
    },
  },
};

// Don't allow these constants to be modified
Object.freeze(COUNTRIES);
Object.freeze(TABS);

export function getCountry() {
  switch (i18next.language) {
    case "so":
      return COUNTRIES.somalia;
    case "enUS":
      return COUNTRIES.usa;
    case "fr":
    case "en":
      return COUNTRIES.canada;
  }
}

// for USA circles
export const CONFIRMED_CIRCLE_STYLE = {
  weight: 0,
  color: "red",
  fillColor: "red",
  fillOpacity: 0.5,
};
