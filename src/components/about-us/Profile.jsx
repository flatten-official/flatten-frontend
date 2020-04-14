import React from "react";
import PropTypes from "prop-types";

// In future should add webp img's to serve in order to improve img loading times
// Need to add a webp loader to the webpack config
const Profile = ({ link, src, name, role, titles, degrees }) => (
  <div className="profile__card">
    <div>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img
          src={require(`${src || "./headshots/default.png"}`)}
          alt={name}
          loading="lazy"
          className="profile__img"
        />
      </a>
    </div>
    <div className="description">
      <p className="profile__name">
        {name}
        {degrees}
      </p>
      <p className="profile__role">{role}</p>
      {titles ? <p className="profile__title">{titles}</p> : null}
    </div>
  </div>
);

Profile.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  link: PropTypes.string,
  titles: PropTypes.string,
  degrees: PropTypes.string,
};

export default Profile;
