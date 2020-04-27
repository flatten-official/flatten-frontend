import canadaGeoJsonBase from "../../assets/map/converted_boundaries.js";
import somaliaGeoJsonBase from "../../assets/map/mongadishu_coords.js";
import usaGeoJsonBase from "../../assets/map/county_boundaries";
import i18next from "i18next";
import { getConfirmedPopupContent, getFormPopupContent } from "./helper";

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

export const TABS = {
  both: {
    ui: {
      uniqueKey: 0,
      legendTitle: "pct_responses",
      btnContent: "pot_vul_button",
      colourScheme: {
        colours: MAP_COLOURS,
        thresholds: [0.01, 0.02, 0.05, 0.1],
      },
      getPopupContent: (t, count, total) =>
        getFormPopupContent(t, count, total, "pot_vul_popup"),
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
      legendTitle: "pct_responses",
      btnContent: "vul_button",
      getPopupContent: (t, count, total) =>
        getFormPopupContent(t, count, total, "vul_case_popup"),
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
      legendTitle: "pct_responses",
      btnContent: "pot_button",
      getPopupContent: (t, count, total) =>
        getFormPopupContent(t, count, total, "pot_case_popup"),
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
      btnContent: "cul_button",
      getPopupContent: getConfirmedPopupContent,
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
      start: [56.1304, -106.3468],
    },
    ui: {
      showDataFooter: true,
    },
    data: {
      confirmed: {
        type: DATA_TYPE.STANDALONE,
        shapeType: SHAPE_TYPE.POLYGONS,
        url:
          "https://opendata.arcgis.com/datasets/e5403793c5654affac0942432783365a_0.geojson",
        fields: {
          getEnglishName: (prop) => prop.ENGNAME,
          getFrenchName: (prop) => prop.FRENAME,
          getConfirmed: (prop) => prop.CaseCount,
          getLastUpdated: (prop) => prop.Last_Updated,
        },
      },
      form: {
        url:
          "https://storage.googleapis.com/flatten-271620.appspot.com/form_data.json",
        type: DATA_TYPE.OVERLAY,
        shapeType: SHAPE_TYPE.POLYGONS,
        baseLayer: {
          geoJson: canadaGeoJsonBase,
          fields: {
            getRegionName: (prop) => prop.CFSAUID,
          },
        },
        fields: {
          getRegions: (obj) => obj.fsa,
          getTotal: (obj) => obj.total_responses,
          getTimestamp: (obj) => obj.time,
          getPotential: (region) => region.pot,
          getVulnerable: (region) => region.risk,
          getBoth: (region) => region.both,
          getRegionalTotal: (region) => region.number_reports,
        },
        notEnoughDataThreshold: 25,
      },
    },
  },
  usa: {
    activeTabs: [TABS.both, TABS.vulnerable, TABS.potential, TABS.confirmed],
    view: {
      bounds: [
        [15, -180],
        [77, -60],
      ],
      start: [37.0902, -95.7129],
      startZoom: 3,
      minZoom: 3,
    },
    ui: {
      showDataFooter: true,
    },
    data: {
      confirmed: {
        type: DATA_TYPE.STANDALONE,
        shapeType: SHAPE_TYPE.CIRCLES,
        url:
          "https://opendata.arcgis.com/datasets/628578697fb24d8ea4c32fa0c5ae1843_0.geojson",
        fields: {
          getEnglishName: (prop) => prop.Combined_Key,
          getConfirmed: (prop) => prop.Confirmed,
          getLastUpdated: (prop) => prop.Last_Update,
        },
        ui: {
          circleSizes: [3, 5, 10, 15, 20, 25],
          thresholds: [100, 500, 1000, 5000, 10000],
        },
      },
      form: {
        url:
          "https://storage.googleapis.com/flatten-271620.appspot.com/form_data_usa.json",
        type: DATA_TYPE.OVERLAY,
        shapeType: SHAPE_TYPE.POLYGONS,
        baseLayer: {
          geoJson: usaGeoJsonBase,
          fields: {
            getRegionName: (prop) => prop.NAME,
          },
        },
        ui: {
          nameSuffix: " County",
        },
        fields: {
          getTimestamp: (obj) => obj.time,
          getTotal: (obj) => obj.total_responses,
          getRegions: (obj) => obj.county,
          getPotential: (region) => region.pot,
          getVulnerable: (region) => region.risk,
          getBoth: (region) => region.both,
          getRegionalTotal: (region) => region.number_reports,
        },
        notEnoughDataThreshold: 25,
      },
    },
  },
  somalia: {
    activeTabs: [TABS.vulnerable, TABS.potential, TABS.confirmed],
    view: {
      bounds: [
        [-1.68325, 40.98105],
        [12.02464, 51.13387],
      ],
      start: [2.0469, 45.3182],
      startZoom: 13,
      minZoom: 13,
    },
    ui: {
      showDataFooter: false,
    },
    data: {
      confirmed: {
        url:
          "https://storage.googleapis.com/flatten-staging-271921.appspot.com/somalia_confirmed.json",
        shapeType: SHAPE_TYPE.CIRCLES,
        type: DATA_TYPE.STANDALONE,
        fields: {
          getConfirmed: (prop) => prop.CONFIRMED,
          getEnglishName: (prop) => prop.COUNTRY,
        },
        ui: {
          circleSizes: [10, 12, 15, 17, 20, 25],
          thresholds: [3, 12, 25, 125, 250],
        },
      },
      form: {
        url:
          "https://storage.googleapis.com/flatten-staging-271921.appspot.com/somalia_data.json",
        shapeType: SHAPE_TYPE.CIRCLES,
        type: DATA_TYPE.OVERLAY,
        baseLayer: {
          geoJson: somaliaGeoJsonBase,
          fields: {
            getRegionName: (prop) => prop.NAME,
          },
        },
        fields: {
          getRegions: (obj) => obj.region,
          getPotential: (region) => region.potential,
          getVulnerable: (region) => region.risk,
          getBoth: (region) => null, // TODO implement
          getRegionalTotal: (region) => region.number_reports,
          getTotal: (obj) => null, // TODO implement,
        },
        ui: {
          circleSizes: [10, 12, 15, 17, 20, 25],
          thresholds: [3, 12, 25, 125, 250],
        },
        notEnoughDataThreshold: 1,
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

export const BLANK_POLYGON_STYLE = {
  weight: 0.9,
  color: "white",
  opacity: 0,
};

export const NOT_ENOUGH_DATA_POLYGON_STYLE = {
  weight: 0.9,
  color: "white",
  fillOpacity: POLYGON_OPACITY,
  fillColor: NOT_ENOUGH_GRAY,
};
export const POPUP_OPTIONS = {
  className: "popupCustom",
};
