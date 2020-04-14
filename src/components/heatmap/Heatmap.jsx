import React from "react";
import { Trans, withTranslation } from "react-i18next";

import MapIcon from "../../assets/map.svg";
import Leafletmap from "./Leafletmap";

class HeatMap extends React.Component {
  // TODO Remove sizing from component (move to .scss)
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
          <div className="heatmap__title">
            <div className="title">{t("header")}</div>
            <MapIcon className="heatmap__map-icon" />
          </div>

          <div className="heatmap__description body">
            <p>{t("p1")}</p>
          </div>

          <div className="heatmap__description body">
            <p>
              <Trans t={t} i18nKey="p2">
                <b>High-Risk Potential Cases:</b> This tab displays all
                individuals that are especially vulnerable to COVID-19 in Canada
                that are also deemed potential cases, based on data inputted
                into Flatten's form.
              </Trans>
            </p>

            <p>
              <Trans t={t} i18nKey="p3">
                <b>Potential Cases:</b> This tab displays all of the potential
                cases of COVID-19 in Canada, based on data inputted into
                Flatten's form.
              </Trans>
            </p>

            <p>
              <Trans t={t} i18nKey="p4">
                <b>Vulnerable Individuals:</b> This tab displays all individuals
                that are especially vulnerable to COVID-19 in Canada, based on
                data inputted into Flatten's form.
              </Trans>
            </p>
          </div>

          <div className="heatmap__description body">
            <p>
              <i>{t("p5")}</i>
            </p>
          </div>
        </div>
        <div className="heatmap__container">
          <Leafletmap />
        </div>
      </div>
    );
  }
}

export default withTranslation("Heatmap")(HeatMap);
