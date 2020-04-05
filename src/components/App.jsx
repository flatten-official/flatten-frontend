import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import Home from "./home/Home";
import Info from "./info/Info";
import Team from "./team/Team";
import Supporters from "./supporters/Supporters";
import history from "../history";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Router history={history} style={{ height: "auto" }}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/info" exact component={Info} />
            <Route path="/team" exact component={Team} />
            <Route path="/supporters" exact component={Supporters} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
