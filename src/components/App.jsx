import React from "react";

import Navbar from "./navbar/Navbar";
import HomePage from "./home/HomePage";
import AboutUs from "./aboutUs/AboutUs";
import Info from "./info/Info";
import Supporters from "./supporters/Supporters";
import TrackYourSymptoms from "./form/TrackYourSymptoms";
import Heatmap from "./heatmap/Heatmap";

class App extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <HomePage />
        <TrackYourSymptoms />
        <Heatmap />
      </>
    );
  }
}

export default App;
