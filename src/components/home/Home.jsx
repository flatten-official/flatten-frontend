import React, { useEffect } from "react";
import { connect } from "react-redux";

import { readCookie } from "../../actions/actions";
import Navbar from "../navbar/Navbar";
import HomePage from "./HomePage";
import Heatmap from "../heatmap/Heatmap";
import TrackYourSymptoms from "../form/TrackYourSymptoms";
import EsriLink from "../esri-gsi-map/EsriLink";

const Home = ({ readCookie, user, daily }) => {
  useEffect(() => {
    // Must be a seperate method because useEffect parameter cannot return a promise;
    const readCookieWrapper = async () => readCookie();
    readCookieWrapper();
  }, []);

  let homeStatus;
  if (user) homeStatus = user.status;

  return (
    <React.Fragment>
      <Navbar />
      <HomePage cookieStatus={homeStatus} />
      <TrackYourSymptoms />
      <Heatmap />
      <EsriLink />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  if (state.cookie.status) {
    return { user: state.cookie.status.user, daily: state.cookie.status.daily };
  }
  return state;
};

const actionCreators = { readCookie };

export default connect(mapStateToProps, actionCreators)(Home);
