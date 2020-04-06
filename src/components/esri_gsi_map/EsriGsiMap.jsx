import React from "react";

class EsriGsiMap extends React.Component {
  state = {
    width: 0,
    height: 0,
    ratio: 190,
  };

  render() {
    const ratio = `${this.state.ratio}%`;
    return (
      <div className="heatmap">
        <div className="esrimap__container" style={{ paddingTop: ratio }}>
          <iframe src="https://experience.arcgis.com/experience/48d10d406869457990432a21e09dc0a1">
            Sorry, the heat-map did not load.
          </iframe>
        </div>
      </div>
    );
  }
}

export default EsriGsiMap;
