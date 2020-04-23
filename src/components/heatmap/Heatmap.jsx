import React from "react";
import { withTranslation } from "react-i18next";
import Leafletmap from "./Leafletmap";
import PropTypes from "prop-types";
import { getMapConfirmedData, getMapFormData } from "../../actions";
import { connect } from "react-redux";

const MapDataFooter = ({ t, formData }) => {
  const getNumResponses = (formData) =>
    formData.total_responses.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Adds commas to number

  const getDate = (formData) => new Date(1000 * formData.time).toString();

  return (
    <div className="heatmap__minidescription body">
      <b>{t("p9")}</b>
      <p>{formData ? getNumResponses(formData) : "Loading..."}</p>
      <b>{t("p10")}</b>
      <p>{formData ? getDate(formData) : "Loading..."}</p>
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

    this.state = {
      width: 0,
      height: 0,
      ratio: 190,
    };
  }

  componentDidMount() {
    this.props.loadData();
  }

  render() {
    const t = this.props.t;
    const formData = this.props.data.form;
    const confirmedData = this.props.data.confirmed;

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
              </p>
            </div>
          </div>
        </div>
        <div className="heatmap__container">
          {formData && confirmedData && (
            <Leafletmap formData={formData} confirmedCases={confirmedData} />
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

            <MapDataFooter t={t} formData={formData} />

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

const mapStateToProps = (state) => ({ data: state.mapData });

// Passes loadData as a prop to HeatMap where load data calls both data loading functions
const mapDispatchToProps = (dispatch) => ({
  loadData: () => {
    dispatch(getMapFormData());
    dispatch(getMapConfirmedData());
  },
});

const HeatMapConnected = connect(mapStateToProps, mapDispatchToProps)(HeatMap);

export default withTranslation("Heatmap")(HeatMapConnected);
