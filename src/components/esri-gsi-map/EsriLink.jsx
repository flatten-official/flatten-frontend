import React from "react";
import PrimaryButton from "../common/buttons/PrimaryButton";
import history from "../../history";

class EsriLink extends React.Component {
  render() {
    return (
      <div className="esri__link">
        <PrimaryButton
          className="esri__link-button"
          onClick={() => history.push("/dashboard-analytics")}
        >
          View Detailed Coronavirus Data
        </PrimaryButton>
      </div>
    );
  }
}

export default EsriLink;
