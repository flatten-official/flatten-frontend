import React from "react";

import backend from "../apis/backend";

import i18next from "i18next";

let mounting = false;

class Geolocation extends React.Component {

  componentWillMount() {
    // prevent this from being done twice
    if (mounting)  {
      return;
    }
    mounting = true;

    // request from backend
    backend.get("/locale").then((res)=>{
      // Don't set the language if one has already been set by the URL
      let params = new URLSearchParams(window.location.search);
      if(!params.get("lang")) {
        i18next.changeLanguage(res.data.locale).catch(console.error);
      }
    }).catch(console.error);

  }

  render() {
    return null;
  }
}

export default Geolocation;
