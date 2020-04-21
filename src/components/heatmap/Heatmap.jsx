import React from "react";
import { Trans, withTranslation } from "react-i18next";

import Leafletmap from "./Leafletmap";

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
    const { t } = this.props;

    return (
      <div className="heatmap" id="heatmap">
        <div className="heatmap__header">
          &nbsp; &nbsp;
          <div className="heatmap__headercontainer">
            <div className="heatmap__title">
              <div className="title">{t("header")}</div>
            </div>
            <div className="heatmap__description body">
              <p>
                <b>{t("p1")}</b>
                <br></br>
                <br></br>
                <div className="heatmap__minidescription body">{t("p9")}</div>
              </p>
            </div>
          </div>
        </div>

        <div className="heatmap__container">
          <Leafletmap></Leafletmap>
        </div>

        <div className="heatmap__header">
          <div className="heatmap__headercontainer">
            <div className="heatmap__description body">
              <p>
                <b>{t("p6")}</b>
                <br></br>
                <b>{t("p7")}</b>
              </p>
            </div>
            <div className="heatmap__minidescription body">
              <p>
                {t("p8")}
                <br></br>
                <br></br>
                {t("p5")}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation("Heatmap")(HeatMap);
