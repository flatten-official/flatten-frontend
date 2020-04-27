import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import EnHomePageUS from "./translations/en/HomePageUS.json";
import EnHeatmapUS from "./translations/en/HeatmapUS.json";
import EnFormUS from "./translations/en/FormUS.json";

import EnHomePage from "./translations/en/HomePage.json";
import EnSupporters from "./translations/en/Supporters.json";
import EnNavbar from "./translations/en/Navbar.json";
import EnHeatmap from "./translations/en/Heatmap.json";
import EnAboutUs from "./translations/en/AboutUs.json";
import EnEsriGsiMap from "./translations/en/EsriGsiMap.json";
import EnFooter from "./translations/en/Footer.json";
import EnLeafletmap from "./translations/en/Leafletmap.json";
import EnInfo from "./translations/en/Info.json";
import EnForm from "./translations/en/Form.json";
import EnFormSubmissionPopup from "./translations/en/FormSubmissionPopup.json";

import FrHomePage from "./translations/fr/HomePage.json";
import FrSuppporters from "./translations/fr/Supporters.json";
import FrNavbar from "./translations/fr/Navbar.json";
import FrHeatmap from "./translations/fr/Heatmap.json";
import FrAboutUs from "./translations/fr/AboutUs.json";
import FrEsriGsiMap from "./translations/fr/EsriGsiMap.json";
import FrFooter from "./translations/fr/Footer.json";
import FrLeafletmap from "./translations/fr/Leafletmap.json";
import FrInfo from "./translations/fr/Info.json";
import FrForm from "./translations/fr/Form.json";
import FrFormSubmissionPopup from "./translations/fr/FormSubmissionPopup.json";

import SoHomePage from "./translations/so/HomePage.json";
import SoSuppporters from "./translations/so/Supporters.json";
import SoNavbar from "./translations/so/Navbar.json";
import SoHeatmap from "./translations/so/Heatmap.json";
import SoAboutUs from "./translations/so/AboutUs.json";
import SoEsriGsiMap from "./translations/so/EsriGsiMap.json";
import SoFooter from "./translations/so/Footer.json";
import SoLeafletmap from "./translations/so/Leafletmap.json";
import SoInfo from "./translations/so/Info.json";
import SoForm from "./translations/so/Form.json";

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
        Leafletmap: EnLeafletmap,
        Info: EnInfo,
        Form: EnForm,
        FormSubmissionPopup: EnFormSubmissionPopup,
      },
      enUS: {
        HomePage: EnHomePageUS,
        Supporters: EnSupporters,
        Navbar: EnNavbar,
        Heatmap: EnHeatmapUS,
        AboutUs: EnAboutUs,
        EsriGsiMap: EnEsriGsiMap,
        Footer: EnFooter,
        Info: EnInfo,
        Form: EnFormUS,
        FormSubmissionPopup: EnFormSubmissionPopup,
      },
      fr: {
        HomePage: FrHomePage,
        Supporters: FrSuppporters,
        Navbar: FrNavbar,
        Heatmap: FrHeatmap,
        AboutUs: FrAboutUs,
        EsriGsiMap: FrEsriGsiMap,
        Footer: FrFooter,
        Leafletmap: FrLeafletmap,
        Info: FrInfo,
        Form: FrForm,
        FormSubmissionPopup: FrFormSubmissionPopup,
      },
      so: {
        HomePage: SoHomePage,
        Supporters: SoSuppporters,
        Navbar: SoNavbar,
        Heatmap: SoHeatmap,
        AboutUs: SoAboutUs,
        EsriGsiMap: SoEsriGsiMap,
        Footer: SoFooter,
        Leafletmap: SoLeafletmap,
        Info: SoInfo,
        Form: SoForm,
      },
    },
  });

export default i18n;
