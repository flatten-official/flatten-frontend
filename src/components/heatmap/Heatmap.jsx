import React from "react";
import { Trans, withTranslation } from "react-i18next";
import i18next from "i18next";
import Leafletmap from "./Leafletmap";

const i18nlang = i18next.language;
const URLS = {
  cadForm:
    "https://storage.googleapis.com/flatten-271620.appspot.com/form_data.json",
  usaForm:
    "https://storage.googleapis.com/flatten-271620.appspot.com/form_data_usa.json",
  cadConf:
    "https://opendata.arcgis.com/datasets/e5403793c5654affac0942432783365a_0.geojson",
  usaConf:
    "https://opendata.arcgis.com/datasets/628578697fb24d8ea4c32fa0c5ae1843_0.geojson",
};

class HeatMap extends React.Component {
  constructor(props) {
    super(props);

    let formUrl;
    let confUrl;

    if (i18nlang === "enUS") {
      formUrl = URLS.usaForm;
      confUrl = URLS.usaConf;
    } else {
      formUrl = URLS.cadForm;
      confUrl = URLS.cadConf;
    }

    this.state = {
      formURL: formUrl,
      confURL: confUrl,
      confirmedCases: null,
      formData: null,
      width: 0,
      height: 0,
      ratio: 190,
    };
    this.getFormData = this.getFormData.bind(this);
    this.getConfirmedCasesData = this.getConfirmedCasesData.bind(this);
  }
  componentDidMount() {
    this.getFormData();
    this.getConfirmedCasesData();
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

  getFormData() {
    fetch(this.state.formURL)
      .then((r) => r.json())
      .then((d) => {
        return d;
      })
      .then((formData) => this.setState({ formData }));
  }

  getConfirmedCasesData() {
    fetch(this.state.confURL)
      .then((r) => r.json())
      .then((d) => {
        return d;
      })
      .then((confirmedCases) => this.setState({ confirmedCases }));
  }

  render() {
    const { t } = this.props;
    let title;
    if (this.state.formData !== null) {
      title =
        i18nlang === "fr"
          ? "Réponse totales: " +
            this.state.formData.total_responses +
            " | Dernière mise à jour: " +
            new Date(1000 * this.state.formData.time)
          : "Total Responses: " +
            this.state.formData.total_responses +
            " | Last update: " +
            new Date(1000 * this.state.formData.time);
    } else {
      title = i18nlang === "fr" ? "Chargement..." : "Loading...";
    }
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
          <div className="PageTitle body"> {title} </div>
          <Leafletmap
            formData={this.state.formData}
            confirmedCases={this.state.confirmedCases}
          ></Leafletmap>
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
