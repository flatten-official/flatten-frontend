import { useEffect } from "react";
import { withLeaflet } from "react-leaflet";
import Locate from "leaflet.locatecontrol";

const LocateControl = ({ leaflet }) => {
  useEffect(() => {
    new Locate({
      position: "topleft",
      initialZoomLevel: 12,
      showPopup: false,
    }).addTo(leaflet.map);
  }, []);

  return null;
};

export default withLeaflet(LocateControl);
