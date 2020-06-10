import React from "react";

// In future should add webp img's to serve in order to improve img loading times
// Need to add a webp loader to the webpack config
const Contributors = ({ name }) => (
  <>
    <div className="OldProfile__card">
      <p className="OldProfile__name">{name}</p>
    </div>
    <br />
  </>
);

export default Contributors;
