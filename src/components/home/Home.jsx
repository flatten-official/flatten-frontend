import React from "react";
import i18next from "i18next";
import HomePage from "./HomePage";
import ShareLinks from "../share-links/ShareLinks";
import Map from "../map/MapPage";
import TrackYourSymptoms from "../form/TrackYourSymptoms";
import EsriLink from "../esri-gsi-map/EsriLink";
import Info from "../info/Info";
import Media from "../media/Media";

const Home = () => {
  const lang = i18next.language;
  const cadToggle = lang === "en" || lang === "fr";
  return (
    <React.Fragment>
      <HomePage />
      {/* <Visualization /> */}
      <TrackYourSymptoms />
      <Map />
      {cadToggle && <EsriLink />}
      <Info />
      <Media />
      <ShareLinks />
    </React.Fragment>
  );
};

export default Home;
