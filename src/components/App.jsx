import React from "react";

import HomePage from "./home/HomePage";
import TrackYourSymptoms from "./form/TrackYourSymptoms";
import Heatmap from "./heatmap/Heatmap";

class App extends React.Component {
  render() {
    return (
      <>
        <HomePage />
        <TrackYourSymptoms />
        <Heatmap />
      </>
    );
  }
}

export default App;
