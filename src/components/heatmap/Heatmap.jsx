import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import Leafletmap from "./Leafletmap";
import PropTypes from "prop-types";
import { getMapConfirmedData, getMapFormData } from "../../actions";
import { connect } from "react-redux";
import { getCountry, TABS } from "./mapConstants";
import PrimaryButton from "../common/buttons/PrimaryButton";
import { getCountryTabSpecifics, getData } from "./helper";

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
  t: PropTypes.func.isRequired,
  formData: PropTypes.object,
};

const HeatMap = ({ t, data, country, loadData }) => {
  useEffect(() => loadData(), []); // [] to only run once

  const [activeTab, setTab] = useState(TABS[0]);

  const renderTabs = () => {
    const buttonList = TABS.map((tab, index) => (
      <PrimaryButton
        key={tab.tabName}
        className={tab === activeTab ? "active" : undefined}
        onClick={(e) => setTab(tab)}
      >
        {t(tab.tabName)}
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
              <b>{t("p1")}</b>
              <br />
            </p>
          </div>
        </div>
      </div>
      <div className="heatmap__container">
        {renderTabs()}
        <Leafletmap
          data={getData(activeTab, data)}
          country={country}
          tab={activeTab}
          tabSpecifics={getCountryTabSpecifics(activeTab, country)}
        />
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
    dispatch(getMapFormData(ownProps.country));
    dispatch(getMapConfirmedData(ownProps.country));
  },
});

// Add translation and Redux state
const HeatMapConnected = withTranslation("Heatmap")(
  connect(mapStateToProps, mapDispatchToProps)(HeatMap)
);

// Add country
const HeatMapWithCountry = () => <HeatMapConnected country={getCountry()} />;

export default HeatMapWithCountry;
