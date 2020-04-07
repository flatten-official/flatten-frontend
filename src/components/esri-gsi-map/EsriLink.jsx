import React from "react";
import { withTranslation } from "react-i18next";

import PrimaryButton from "../common/buttons/PrimaryButton";
import history from "../../history";

class EsriLink extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <div className="esri__link">
        <PrimaryButton
          className="esri__link-button"
          onClick={() => history.push("/dashboard-analytics")}
        >
          {t("button")}
        </PrimaryButton>
      </div>
    );
  }
}

export default withTranslation("EsriGsiMap")(EsriLink);
