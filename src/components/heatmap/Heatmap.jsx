import React from "react";
import { withTranslation } from "react-i18next";
import i18next from "i18next";
import Leafletmap from "./Leafletmap";
import { connect } from "react-redux";

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
  }

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

    let date = "Loading";
    let totalResponses = "Loading";

    if (this.state.formData !== null) {
      date = "" + new Date(1000 * this.state.formData.time);
      totalResponses = "" + this.state.formData.total_responses;
      // Adds commas to number
      totalResponses = totalResponses.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return location ? (
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
              </p>
            </div>
          </div>
        </div>
        <div className="heatmap__container">
          {this.state.formData && this.state.confirmedCases && (
            <Leafletmap
              formData={this.state.formData}
              confirmedCases={this.state.confirmedCases}
            ></Leafletmap>
          )}
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
              <b>{t("p9")}</b>
              <p>{totalResponses}</p>
              <b>{t("p10")}</b>
              <p>{date}</p>
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
    ) : null;
  }
}

export default withTranslation("Heatmap")(HeatMap);
