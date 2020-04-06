import React from "react";

import Navbar from "../navbar/Navbar";
import HomePage from "./HomePage";
import Heatmap from "../heatmap/Heatmap";
import TrackYourSymptoms from "../form/TrackYourSymptoms";
import EsriLink from "../esri_gsi_map/EsriLink";

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <HomePage />
        <TrackYourSymptoms />
        <Heatmap />
        <EsriLink />
      </React.Fragment>
    );
  }
}

export default Home;
