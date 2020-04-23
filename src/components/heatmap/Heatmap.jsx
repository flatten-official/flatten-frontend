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

const HeatMap = ({ t, data, loadData }) => {
  loadData();

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
        {data.form && data.confirmed && (
          <Leafletmap formData={data.form} confirmedCases={data.confirmed} />
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

          <MapDataFooter t={t} formData={data.form} />

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
};

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
