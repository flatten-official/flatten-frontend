import React, { useEffect } from "react";

import HomePage from "./HomePage";
import Heatmap from "../heatmap/Heatmap";
import TrackYourSymptoms from "../form/TrackYourSymptoms";
import EsriLink from "../esri-gsi-map/EsriLink";

const Home = () => {
  return (
    <React.Fragment>
      <HomePage />
      <TrackYourSymptoms />
      <Heatmap />
      <EsriLink />
    </React.Fragment>
  );
};

export default Home;
