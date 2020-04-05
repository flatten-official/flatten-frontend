import React from "react";

import HomePage from "./home/HomePage";
import AboutUs from "./aboutUs/AboutUs";
import Info from "./info/Info";
import Supporters from "./supporters/Supporters";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Supporters />
      </React.Fragment>
    );
  }
}

export default App;
