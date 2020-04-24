import { Component } from "react";
import { withLeaflet } from "react-leaflet";
import Locate from "leaflet.locatecontrol";

const options = {
  position: "topleft",
  initialZoomLevel: 12,
  onActivate: () => {}, // callback before engine starts retrieving locations
};

class LocateControl extends Component {
  componentDidMount() {
    const { startDirectly, leaflet } = this.props;

    const location = new Locate(options);
    location.addTo(leaflet.map);

    if (startDirectly) {
      // request location update and set location
      location.start();
    }
  }

  render = () => null;
}

export default withLeaflet(LocateControl);
