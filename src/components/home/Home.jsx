import React, { useEffect } from "react";
import { connect } from "react-redux";

import { readCookie } from "../../actions/index";
import Navbar from "../navbar/Navbar";
import HomePage from "./HomePage";
import Heatmap from "../heatmap/Heatmap";
import TrackYourSymptoms from "../form/TrackYourSymptoms";
import EsriLink from "../esri-gsi-map/EsriLink";

const Home = ({ dispatch, cookie }) => {
  const readCookieAction = async () => {
    await dispatch(readCookie());
  };

  useEffect(() => {
    readCookieAction();
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      <HomePage cookieStatus={cookie.status} />
      <TrackYourSymptoms />
      <Heatmap />
      <EsriLink />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  cookie: state.cookie,
});

export default connect(mapStateToProps)(Home);
