import React from "react";

import Navbar from "../navbar/Navbar";
import HomePage from "./HomePage";
import Heatmap from "../heatmap/Heatmap";
import TrackYourSymptoms from "../form/TrackYourSymptoms";

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <HomePage />
        <TrackYourSymptoms />
        <Heatmap />
      </React.Fragment>
    );
  }
}

export default Home;
