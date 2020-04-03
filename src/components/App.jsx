import React from "react";

import Form from "./form/Form";
import Heatmap from "./heatmap/Heatmap";

class App extends React.Component {
  render() {
    return (
      <div>
        <Form />
        <Heatmap />
      </div>
    );
  }
}

export default App;
