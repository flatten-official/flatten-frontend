import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import Leafletmap from "./Leafletmap";
import PropTypes from "prop-types";
import { getMapConfirmedData, getMapFormData } from "../../actions";
import { connect } from "react-redux";
import { getCountry } from "./mapConstants";
import PrimaryButton from "../common/buttons/PrimaryButton";
import { formatTimestamp, getData, getDataInfo } from "./helper";

const MapDataFooter = ({ t, data, fields }) => {
  let numResponses;
  let date;

  if (data) {
    const total = fields.getTotal(data);
    if (total) {
      numResponses = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Adds commas to number
    }

    const timestamp = fields.getTimestamp(data);
    if (timestamp) {
      date = formatTimestamp(timestamp);
    }
  }

  return (
    <div className="heatmap__minidescription body">
      <b>{t("captions.total_responses")}</b>
      <p>{numResponses || "Loading..."}</p>
      <b>{t("captions.latest_update")}</b>
      <p>{date || "Loading..."}</p>
    </div>
  );
};

MapDataFooter.propTypes = {
  t: PropTypes.func.isRequired,
  data: PropTypes.object,
  fields: PropTypes.object.isRequired,
};

const HeatMap = ({ t, data, country, loadData }) => {
  useEffect(() => loadData(), []); // [] to only run once

  const [activeTab, setTab] = useState(country.activeTabs[0]);

  const renderTabs = () => {
    const buttonList = country.activeTabs.map((tab, index) => (
      <PrimaryButton
        key={tab.ui.uniqueKey}
        className={tab === activeTab ? "active" : undefined}
        onClick={(e) => setTab(tab)}
      >
        {t(tab.ui.btnContent)}
      </PrimaryButton>
    ));

    return (
      <div id="tabs" className="TabSelectors btn_group">
        {buttonList}
      </div>
    );
  };

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
              <b>{t("overview")}</b>
              <br />
            </p>
          </div>
        </div>
      </div>
      <div className="heatmap__container">
        {renderTabs()}
        <Leafletmap
          data={getData(activeTab, data)}
          dataInfo={getDataInfo(activeTab, country)}
          country={country}
          tab={activeTab}
        />
      </div>

      <div className="heatmap__header">
        <div className="heatmap__headercontainer">
          <div className="heatmap__description body">
            <p>
              <b>{t("captions.covid19")}</b>
              <br />
              <b>{t("captions.real_time")}</b>
            </p>
          </div>

          {country.ui.showDataFooter && (
            <MapDataFooter
              t={t}
              data={data.form}
              fields={country.data.form.fields}
            />
          )}

          <div className="heatmap__minidescription body">
            <p>
              {t("results_disclaimer")}
              <br />
              <br />
              {t("privacy_disclaimer")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

HeatMap.propTypes = {
  t: PropTypes.func.isRequired,
  country: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  loadData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ data: state.mapData });

// Passes loadData as a prop to HeatMap where load data calls both data loading functions
const mapDispatchToProps = (dispatch, ownProps) => ({
  loadData: () => {
    dispatch(getMapFormData(ownProps.country.data));
    dispatch(getMapConfirmedData(ownProps.country.data));
  },
});

// Add translation and Redux state
const HeatMapConnected = withTranslation("Heatmap")(
  connect(mapStateToProps, mapDispatchToProps)(HeatMap)
);

// Add country
const HeatMapWithCountry = () => <HeatMapConnected country={getCountry()} />;

export default HeatMapWithCountry;
