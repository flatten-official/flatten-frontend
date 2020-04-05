import React from "react";

// In future should add webp img's to serve in order to improve img loading times
// Need to add a webp loader to the webpack config
const Profile = ({ link, src, name, role, titles, degrees }) => (
  <div className="profile__card">
    <div>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img
          src={require(`${src || "./Headshots/default.png"}`)}
          alt={name}
          loading="lazy"
          className="card-img-top"
        />
      </a>
    </div>
    <div>
      <p className="card-text-name">
        {name}
        {degrees}
      </p>
      <p className="card-text-role">{role}</p>
      <p className="card-text-title">{titles}</p>
    </div>
  </div>
);

export default Profile;
