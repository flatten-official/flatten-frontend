import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import EnHomePageUS from "./translations/enUS/HomePage.json";
import EnMapPageUS from "./translations/enUS/MapPage.json";
import EnFormUS from "./translations/enUS/Form.json";

import EnHomePage from "./translations/en/HomePage.json";
import EnSupporters from "./translations/en/Supporters.json";
import EnNavbar from "./translations/en/Navbar.json";
import EnMapPage from "./translations/en/MapPage.json";
import EnAboutUs from "./translations/en/AboutUs.json";
import EnEsriGsiMap from "./translations/en/EsriGsiMap.json";
import EnFooter from "./translations/en/Footer.json";
import EnLeafletmap from "./translations/en/Leafletmap.json";
import EnInfo from "./translations/en/Info.json";
import EnForm from "./translations/en/Form.json";
import EnLegal from "./translations/en/Legal.json";
import EnFormModal from "./translations/en/FormModal.json";

import FrHomePage from "./translations/fr/HomePage.json";
import FrSuppporters from "./translations/fr/Supporters.json";
import FrNavbar from "./translations/fr/Navbar.json";
import FrMapPage from "./translations/fr/MapPage.json";
import FrAboutUs from "./translations/fr/AboutUs.json";
import FrEsriGsiMap from "./translations/fr/EsriGsiMap.json";
import FrFooter from "./translations/fr/Footer.json";
import FrLeafletmap from "./translations/fr/Leafletmap.json";
import FrInfo from "./translations/fr/Info.json";
import FrForm from "./translations/fr/Form.json";
import FrLegal from "./translations/fr/Legal.json";
import FrFormModal from "./translations/fr/FormModal.json";

import SoHomePage from "./translations/so/HomePage.json";
import SoSuppporters from "./translations/so/Supporters.json";
import SoNavbar from "./translations/so/Navbar.json";
import SoMapPage from "./translations/so/MapPage.json";
import SoAboutUs from "./translations/so/AboutUs.json";
import SoEsriGsiMap from "./translations/so/EsriGsiMap.json";
import SoFooter from "./translations/so/Footer.json";
import SoLeafletmap from "./translations/so/Leafletmap.json";
import SoInfo from "./translations/so/Info.json";
import SoForm from "./translations/so/Form.json";
import SoFormModal from "./translations/so/FormModal.json";
import SoLegal from "./translations/so/Legal.json";

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
        MapPage: EnMapPage,
        AboutUs: EnAboutUs,
        EsriGsiMap: EnEsriGsiMap,
        Footer: EnFooter,
        Leafletmap: EnLeafletmap,
        Info: EnInfo,
        Form: EnForm,
        FormModal: EnFormModal,
        Legal: EnLegal,
      },
      enUS: {
        HomePage: EnHomePageUS,
        Supporters: EnSupporters,
        Navbar: EnNavbar,
        MapPage: EnMapPageUS,
        AboutUs: EnAboutUs,
        EsriGsiMap: EnEsriGsiMap,
        Footer: EnFooter,
        Info: EnInfo,
        Form: EnFormUS,
        FormModal: EnFormModal,
        Legal: EnLegal,
      },
      fr: {
        HomePage: FrHomePage,
        Supporters: FrSuppporters,
        Navbar: FrNavbar,
        MapPage: FrMapPage,
        AboutUs: FrAboutUs,
        EsriGsiMap: FrEsriGsiMap,
        Footer: FrFooter,
        Leafletmap: FrLeafletmap,
        Info: FrInfo,
        Form: FrForm,
        FormModal: FrFormModal,
        Legal: FrLegal,
      },
      so: {
        HomePage: SoHomePage,
        Supporters: SoSuppporters,
        Navbar: SoNavbar,
        MapPage: SoMapPage,
        AboutUs: SoAboutUs,
        EsriGsiMap: SoEsriGsiMap,
        Footer: SoFooter,
        Leafletmap: SoLeafletmap,
        Info: SoInfo,
        Form: SoForm,
        FormModal: SoFormModal,
        Legal: SoLegal,
      },
    },
  });

export default i18n;
