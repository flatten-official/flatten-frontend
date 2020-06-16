import React from "react";
import PropTypes from "prop-types";

const Contributors = ({ name }) => (
  <>
    <div className="oldProfile__card">
      <div className="description">
        <h3 className="profile__name">{name}</h3>
      </div>
    </div>
  </>
);

Contributors.propType = {
  name: PropTypes.string,
};

export default Contributors;
