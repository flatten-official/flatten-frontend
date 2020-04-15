import React, { useEffect } from "react";
import { connect } from "react-redux";

import { readCookie } from "../../actions/index";
import HomePage from "./HomePage";
import Heatmap from "../heatmap/Heatmap";
import TrackYourSymptoms from "../form/TrackYourSymptoms";
import EsriLink from "../esri-gsi-map/EsriLink";
import Info from "../info/Info";

const Home = ({ dispatch, user, daily }) => {
  const readCookieAction = async () => {
    await dispatch(readCookie());
  };

  useEffect(() => {
    readCookieAction();
  }, []);
  let homeStatus;
  if (user) {
    homeStatus = user.status;
  }

  return (
    <React.Fragment>
      <HomePage cookieStatus={homeStatus} />
      <TrackYourSymptoms />
      <Heatmap />
      <EsriLink />
      <Info />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  if (state.cookie.status) {
    return { user: state.cookie.status.user, daily: state.cookie.status.daily };
  }
  return state;
};

export default connect(mapStateToProps)(Home);
