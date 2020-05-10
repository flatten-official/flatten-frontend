import canadaGeoJsonBase from "../../assets/map/canada_boundaries.js";
import somaliaGeoJsonBase from "../../assets/map/somalia_coords.js";
import usaGeoJsonBase from "../../assets/map/usa_boundaries";
import i18next from "i18next";

const MAP_COLOURS = ["#FAE0A6", "#FABD05", "#FF7800", "#EB4236", "#C70505"];

export const NOT_ENOUGH_GRAY = "#909090";
export const POLYGON_OPACITY = 1;

// Indicates if circles or polygons should be used
export const SHAPE_TYPE = {
  CIRCLES: 0,
  POLYGONS: 1,
};

// Indicates if the data is simply used to color over the base layer or if it's already a base layer
export const DATA_TYPE = {
  OVERLAY: 0,
  STANDALONE: 1,
};

/**
 * List of possible tabs and their parameters.
 */
export const TABS = {
  both: {
    ui: {
      uniqueKey: 0,
      legendTitle: "percent_responses",
      btnContent: "tabs.vuln_and_pot_cases",
      popupMessage: "vuln_and_pot_case_count_summary.",
      colourScheme: {
        colours: MAP_COLOURS,
        thresholds: [0.01, 0.02, 0.05, 0.1],
      },
    },
    data: {
      source: "form",
      field: "getBoth",
      isPercent: true,
    },
  },
  vulnerable: {
    ui: {
      uniqueKey: 1,
      legendTitle: "percent_responses",
      btnContent: "tabs.vulnerable_cases",
      popupMessage: "vulnerable_case_count_summary.",
      colourScheme: {
        colours: MAP_COLOURS,
        thresholds: [0.15, 0.25, 0.35, 0.5],
      },
    },
    data: {
      source: "form",
      field: "getVulnerable",
      isPercent: true,
    },
  },
  potential: {
    ui: {
      uniqueKey: 2,
      legendTitle: "percent_responses",
      btnContent: "tabs.potential_cases",
      popupMessage: "potential_case_count_summary.",
      colourScheme: {
        colours: MAP_COLOURS,
        thresholds: [0.02, 0.05, 0.1, 0.25],
      },
    },
    data: {
      source: "form",
      field: "getPotential",
      isPercent: true,
    },
  },
  confirmed: {
    ui: {
      uniqueKey: 3,
      legendTitle: "number_of_cases",
      btnContent: "tabs.confirmed_cases",
      popupMessage: "confirmed_case_count_summary.",
      colourScheme: {
        colours: MAP_COLOURS,
        thresholds: [5, 25, 100, 250],
      },
    },
    data: {
      source: "confirmed",
      field: "getConfirmed",
      isPercent: false,
    },
  },
};

/**
 * List of data sources and each data sources' configurations
 * The fields object is key as it is used to access the data.
 * Depending on the field parameter name, different data sources are expected.
 *    - data: the full data object retrieved from the flatten servers
 *    - region : just the data for that region
 *    - prop : feature.properties from the geojson
 */
const DATA_INFO = {
  somaliaForm: {
    url:
      "https://storage.googleapis.com/flatten-staging-271921.appspot.com/somalia_data.json",
    shapeType: SHAPE_TYPE.CIRCLES,
    type: DATA_TYPE.OVERLAY,
    baseGeoJson: somaliaGeoJsonBase,
    fields: {
      getRegionName: (prop) => prop.NAME,
      getRegions: (data) => data.region,
      getPotential: (region) => region.potential,
      getVulnerable: (region) => region.risk,
      getRegionalTotal: (region) => region.number_reports,
      getBoth: (region) => null, // TODO implement field in data source
      getTotal: (data) => null, // TODO implement field in data source
      getTimestamp: (data) => null, // TODO implement ^
    },
    ui: {
      circleSizes: [10, 12, 15, 17, 20, 25],
      thresholds: [3, 12, 25, 125, 250],
    },
  },
  somaliaConfirmed: {
    url:
      "https://storage.googleapis.com/flatten-staging-271921.appspot.com/somalia_confirmed.json",
    shapeType: SHAPE_TYPE.CIRCLES,
    type: DATA_TYPE.STANDALONE,
    fields: {
      getConfirmed: (prop) => prop.CONFIRMED,
      getRegionName: (prop) => prop.COUNTRY,
    },
    ui: {
      circleSizes: [10, 12, 15, 17, 20, 25],
      thresholds: [3, 12, 25, 125, 250],
    },
  },
  canadaConfirmed: {
    type: DATA_TYPE.STANDALONE,
    shapeType: SHAPE_TYPE.POLYGONS,
    url:
      "https://opendata.arcgis.com/datasets/e5403793c5654affac0942432783365a_0.geojson",
    fields: {
      getRegionName: (prop) =>
        i18next.language === "fr" ? prop.FRENAME : prop.ENGNAME,
      getConfirmed: (prop) => prop.CaseCount,
      getLastUpdated: (prop) => prop.Last_Updated,
    },
  },
  canadaForm: {
    url:
      "https://storage.googleapis.com/flatten-271620.appspot.com/form_data.json",
    type: DATA_TYPE.OVERLAY,
    shapeType: SHAPE_TYPE.POLYGONS,
    baseGeoJson: canadaGeoJsonBase,
    fields: {
      getRegionName: (prop) => prop.CFSAUID,
      getRegions: (data) => data.fsa,
      getTotal: (data) => data.total_responses,
      getTimestamp: (data) => data.time,
      getPotential: (region) => region.pot,
      getVulnerable: (region) => region.risk,
      getBoth: (region) => region.both,
      getRegionalTotal: (region) => region.number_reports,
    },
    notEnoughDataThreshold: 25,
  },
  usaConfirmed: {
    type: DATA_TYPE.STANDALONE,
    shapeType: SHAPE_TYPE.CIRCLES,
    url:
      "https://opendata.arcgis.com/datasets/628578697fb24d8ea4c32fa0c5ae1843_0.geojson",
    fields: {
      getRegionName: (prop) => prop.Combined_Key,
      getConfirmed: (prop) => prop.Confirmed,
      getLastUpdated: (prop) => prop.Last_Update,
    },
    ui: {
      circleSizes: [3, 5, 10, 15, 20, 25],
      thresholds: [100, 500, 1000, 5000, 10000],
    },
  },
  usaForm: {
    url:
      "https://storage.googleapis.com/flatten-271620.appspot.com/form_data_usa.json",
    type: DATA_TYPE.OVERLAY,
    shapeType: SHAPE_TYPE.POLYGONS,
    baseGeoJson: usaGeoJsonBase,
    ui: {
      nameSuffix: " County",
    },
    fields: {
      getRegionName: (prop) => prop.NAME,
      getTimestamp: (data) => data.time,
      getTotal: (data) => data.total_responses,
      getRegions: (data) => data.county,
      getPotential: (region) => region.pot,
      getVulnerable: (region) => region.risk,
      getBoth: (region) => region.both,
      getRegionalTotal: (region) => region.number_reports,
    },
    notEnoughDataThreshold: 25,
  },
};

/**
 * List of countries and their data
 */
const COUNTRIES = {
  canada: {
    activeTabs: [TABS.both, TABS.potential, TABS.vulnerable, TABS.confirmed],
    view: {
      bounds: [
        [38, -150],
        [87, -45],
      ],
      startZoom: 4,
      minZoom: 4,
      start: [56.13, -106.347],
    },
    data: {
      confirmed: DATA_INFO.canadaConfirmed,
      form: DATA_INFO.canadaForm,
    },
  },
  usa: {
    activeTabs: [TABS.confirmed, TABS.both, TABS.vulnerable, TABS.potential],
    view: {
      bounds: [
        [15, -180],
        [77, -60],
      ],
      start: [37.1, -95.713],
      startZoom: 4,
      minZoom: 4,
    },
    data: {
      confirmed: DATA_INFO.usaConfirmed,
      form: DATA_INFO.usaForm,
    },
  },
  somalia: {
    activeTabs: [TABS.vulnerable, TABS.potential, TABS.confirmed],
    view: {
      bounds: [
        [1.948, 45.206],
        [2.177, 45.42],
      ],
      start: [2.045, 45.333],
      startZoom: 13,
      minZoom: 13,
    },
    data: {
      confirmed: DATA_INFO.somaliaConfirmed,
      form: DATA_INFO.somaliaForm,
    },
  },
};

// Don't allow these constants to be modified
Object.freeze(COUNTRIES);
Object.freeze(TABS);
Object.freeze(DATA_INFO);

/**
 * Returns the country based on the i18next language
 */
export function getCountry() {
  switch (i18next.language) {
    case "so":
      return COUNTRIES.somalia;
    case "enUS":
      return COUNTRIES.usa;
    default:
      // lang is sometimes en-US or en-GB or en or fr depending on what i18n picks.
      return COUNTRIES.canada;
  }
}

// for USA circles
export const CONFIRMED_CIRCLE_STYLE = (_) => ({
  weight: 0,
  color: "red",
  fillColor: "red",
  fillOpacity: 0.5,
});

export const BASE_POLYGON_STYLE = {
  weight: 0.9,
  color: "white",
};

export const BLANK_POLYGON_STYLE = {
  ...BASE_POLYGON_STYLE,
  opacity: 0,
};
export const NOT_ENOUGH_DATA_POLYGON_STYLE = {
  ...BASE_POLYGON_STYLE,
  fillOpacity: POLYGON_OPACITY,
  fillColor: NOT_ENOUGH_GRAY,
};

export const POPUP_OPTIONS = {
  className: "popupCustom",
};
