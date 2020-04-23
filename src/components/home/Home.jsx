import React from "react";
import i18next from "i18next";
import HomePage from "./HomePage";
import Visualization from "../visualization/Visualization";
import Heatmap from "../heatmap/Heatmap";
import TrackYourSymptoms from "../form/TrackYourSymptoms";
import EsriLink from "../esri-gsi-map/EsriLink";
import Info from "../info/Info";

const Home = () => {
  const lang = i18next.language;
  let somaliToggle = lang === "so" ? false : true;
  return (
    <React.Fragment>
      <HomePage />
      <Visualization />
      <TrackYourSymptoms />
      {somaliToggle && <Heatmap />}
      {somaliToggle && <EsriLink />}
      <Info />
    </React.Fragment>
  );
};

export default Home;
