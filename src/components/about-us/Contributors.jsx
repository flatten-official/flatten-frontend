import React from "react";
import PropTypes from "prop-types";

const Contributors = ({ name }) => (
  <>
    <p className="OldProfile__name">{name}</p>
  </>
);

Contributors.propType = {
  name: PropTypes.string,
};

export default Contributors;
