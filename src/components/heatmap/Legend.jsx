import React from "react";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { NOT_ENOUGH_GRAY } from "./mapConstants";
import Control from "react-leaflet-control";

const LegendContent = ({ t, tab }) => {
  const percentRowText = (threshold) => (
    <>
      &gt; {threshold * 100}%<br />
    </>
  );

  const notPercentRowText = (threshold) => (
    <>
      &gt; {threshold}
      <br />
    </>
  );

  const renderNotEnoughData = () => (
    <>
      <i style={{ background: NOT_ENOUGH_GRAY }} />
      {t("not_enough_data_legend")}
      <br />
    </>
  );

  return (
    <Control position="bottomleft">
      <div className="info legend">
        <h4>{t(tab.ui.legendTitle)}</h4>
        {tab.data.notEnoughDataThreshold && renderNotEnoughData()}
        {tab.ui.colourScheme.colours.map((colour, i) => {
          const threshold = i === 0 ? 0 : tab.ui.colourScheme.thresholds[i - 1];
          return (
            <div key={threshold}>
              <i style={{ background: colour }} />
              {tab.data.isPercent
                ? percentRowText(threshold)
                : notPercentRowText(threshold)}
            </div>
          );
        })}
      </div>
    </Control>
  );
};

LegendContent.propTypes = {
  t: PropTypes.func.isRequired,
  tab: PropTypes.object.isRequired,
};

export default withTranslation("Leafletmap")(LegendContent);
