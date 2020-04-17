import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import Navbar from "./navbar/Navbar";
import Home from "./home/Home";
import Info from "./info/Info";
import About from "./about-us/AboutUs";
import Supporters from "./supporters/Supporters";
import EsriGsiMap from "./esri-gsi-map/EsriGsiMap";
import history from "../history";
import Footer from "./footer/Footer";
import TOS from "./legal/TOS";
import PrivacyPolicy from "./legal/PrivacyPolicy";
import NotFoundPage from "./notfound/NotFoundPage.jsx";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Router history={history} style={{ height: "auto" }}>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/info" exact component={Info} />
            <Route path="/about-us" exact component={About} />
            <Route path="/supporters" exact component={Supporters} />
            <Route path="/terms-of-service" exact component={TOS} />
            <Route path="/privacy-policy" exact component={PrivacyPolicy} />
            <Route path="/dashboard-analytics" exact component={EsriGsiMap} />
            <Route component={NotFoundPage} />
          </Switch>
          <Footer />
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
