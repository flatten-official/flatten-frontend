import React from "react";
import { withTranslation } from "react-i18next";
import i18next from "i18next";
import Leafletmap from "./Leafletmap";
import PropTypes from "prop-types";

const i18nlang = i18next.language;
const URLS = {
  cad: {
    form:
      "https://storage.googleapis.com/flatten-271620.appspot.com/form_data.json",
    confirmed:
      "https://opendata.arcgis.com/datasets/e5403793c5654affac0942432783365a_0.geojson",
  },
  usa: {
    form:
      "https://storage.googleapis.com/flatten-271620.appspot.com/form_data_usa.json",
    confirmed:
      "https://opendata.arcgis.com/datasets/628578697fb24d8ea4c32fa0c5ae1843_0.geojson",
  },
};

const MapDataFooter = ({ t, formData }) => {
  let date = "Loading...";
  let totalResponses = "Loading...";

  if (formData) {
    date = new Date(1000 * formData.time).toString();
    totalResponses = formData.total_responses.toString();
    // Adds commas to number
    totalResponses = totalResponses.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="heatmap__minidescription body">
      <b>{t("p9")}</b>
      <p>{totalResponses}</p>
      <b>{t("p10")}</b>
      <p>{date}</p>
    </div>
  );
};

MapDataFooter.propTypes = {
  t: PropTypes.any.isRequired,
  formData: PropTypes.object,
};

class HeatMap extends React.Component {
  constructor(props) {
    super(props);

    const urls = i18nlang === "enUS" ? URLS.usa : URLS.cad;

    this.state = {
      formURL: urls.form,
      confURL: urls.confirmed,
      confirmedCases: null,
      formData: null,
      width: 0,
      height: 0,
      ratio: 190,
    };
  }

  componentDidMount() {
    this.getFormData();
    this.getConfirmedCasesData();
  }

  getFormData = async () => {
    const response = await fetch(this.state.formURL);
    const formData = await response.json();
    this.setState({ formData });
  };

  getConfirmedCasesData = async () => {
    const response = await fetch(this.state.confURL);
    const confirmedCases = await response.json();
    this.setState({ confirmedCases });
  };

  render() {
    const { t } = this.props;

    if (!location) return null;

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
                <br />
                <br />
              </p>
            </div>
          </div>
        </div>
        <div className="heatmap__container">
          {this.state.formData && this.state.confirmedCases && (
            <Leafletmap
              formData={this.state.formData}
              confirmedCases={this.state.confirmedCases}
            />
          )}
        </div>

        <div className="heatmap__header">
          <div className="heatmap__headercontainer">
            <div className="heatmap__description body">
              <p>
                <b>{t("p6")}</b>
                <br />
                <b>{t("p7")}</b>
              </p>
            </div>

            <MapDataFooter t={t} formData={this.state.formData || null} />

            <div className="heatmap__minidescription body">
              <p>
                {t("p8")}
                <br />
                <br />
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
