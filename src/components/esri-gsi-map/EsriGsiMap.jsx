import React from "react";
import { withTranslation } from "react-i18next";

class EsriGsiMap extends React.Component {
  state = {
    width: 0,
    height: 0,
    ratio: 190,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { t } = this.props;
    const ratio = `${this.state.ratio}%`;
    return (
      <div className="esrimap">
        <div className="esrimap__container" style={{ paddingTop: ratio }}>
          <iframe src="https://experience.arcgis.com/experience/48d10d406869457990432a21e09dc0a1">
            {t("error")}
          </iframe>
        </div>
      </div>
    );
  }
}

export default withTranslation("EsriGsiMap")(EsriGsiMap);
