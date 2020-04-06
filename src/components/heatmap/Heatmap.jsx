import React from "react";

class HeatMap extends React.Component {
  state = {
    width: 0,
    height: 0,
    ratio: 190,
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    if (window.innerWidth < 1024) {
      this.setState({
        width: window.innerWidth,
        height: window.innerHeight,
        ratio: Math.floor((window.innerHeight / window.innerWidth) * 100),
      });
    } else {
      this.setState({ ratio: 56.25 });
    }
  };

  render() {
    const ratio = `${this.state.ratio}%`;
    return (
      <div className="heatmap">
        <div className="title">View Virus Data</div>

        <div className="heatmap__container" style={{ paddingTop: ratio }}>
          <iframe src="https://flatten-271620.web.app/" allow="geolocation">
            Sorry, the heat-map did not load.
          </iframe>
        </div>
      </div>
    );
  }
}

export default HeatMap;
