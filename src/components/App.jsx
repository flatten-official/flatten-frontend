import React from "react";

import Navbar from "./navbar/Navbar";
import HomePage from "./home/HomePage";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <HomePage id="home" />
      </React.Fragment>
    );
  }
}

export default App;
