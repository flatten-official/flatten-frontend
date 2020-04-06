import React from "react";

import Navbar from "../navbar/Navbar";
import HomePage from "./HomePage";
import Heatmap from "../heatmap/Heatmap";
import Footer from "../footer/Footer";
import TrackYourSymptoms from "../form/TrackYourSymptoms";

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <HomePage />
        <TrackYourSymptoms />
        <Heatmap />
        <Footer />
      </React.Fragment>
    );
  }
}

export default Home;
