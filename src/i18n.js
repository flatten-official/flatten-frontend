import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import EnHomePage from "./translations/en/HomePage.json";
import EnSupporters from "./translations/en/Supporters.json";
import EnNavbar from "./translations/en/Navbar.json";
import EnHeatmap from "./translations/en/Heatmap.json";
import EnAboutUs from "./translations/en/AboutUs.json";
import EnEsriGsiMap from "./translations/en/EsriGsiMap.json";
import EnFooter from "./translations/en/Footer.json";
import EnInfo from "./translations/en/Info.json";
import EnForm from "./translations/en/Form.json";

import FrHomePage from "./translations/fr/HomePage.json";
import FrSuppporters from "./translations/fr/Supporters.json";
import FrNavbar from "./translations/fr/Navbar.json";
import FrHeatmap from "./translations/fr/Heatmap.json";
import FrAboutUs from "./translations/fr/AboutUs.json";
import FrEsriGsiMap from "./translations/fr/EsriGsiMap.json";
import FrFooter from "./translations/fr/Footer.json";
import FrInfo from "./translations/fr/Info.json";
import FrForm from "./translations/fr/Form.json";
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      lookupQuerystring: "lang",
    },
    fallbackLng: "en",
    resources: {
      en: {
        HomePage: EnHomePage,
        Supporters: EnSupporters,
        Navbar: EnNavbar,
        Heatmap: EnHeatmap,
        AboutUs: EnAboutUs,
        EsriGsiMap: EnEsriGsiMap,
        Footer: EnFooter,
        Info: EnInfo,
        Form: EnForm,
      },
      enUS: {
        HomePage: EnHomePage,
        Supporters: EnSupporters,
        Navbar: EnNavbar,
        Heatmap: EnHeatmap,
        AboutUs: EnAboutUs,
        EsriGsiMap: EnEsriGsiMap,
        Footer: EnFooter,
        Info: EnInfo,
        Form: EnForm,
      },
      fr: {
        HomePage: FrHomePage,
        Supporters: FrSuppporters,
        Navbar: FrNavbar,
        Heatmap: FrHeatmap,
        AboutUs: FrAboutUs,
        EsriGsiMap: FrEsriGsiMap,
        Footer: FrFooter,
        Info: FrInfo,
        Form: FrForm,
      },
    },
  });

export default i18n;
