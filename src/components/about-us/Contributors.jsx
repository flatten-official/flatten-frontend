import React from "react";
import PropTypes from "prop-types";

const Contributors = ({ name }) => (
  <>
    <div className="oldProfile__card">
      <div className="description">
        <p className="profile__name">{name}</p>
      </div>
    </div>
  </>
);

Contributors.propType = {
  name: PropTypes.string,
};

export default Contributors;
