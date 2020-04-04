import React from "react";
import "./Profile.css";

const Profile = ({ link, src, name, role, titles, degrees }) => (
  <div className="card text-center h-100">
    <div className="overflow">
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img
          src={require(`${src || "./Headshots/default.png"}`)}
          alt={name}
          className="card-img-top"
        />
      </a>
    </div>
    <div className="card-body text-dark">
      <p className="card-text-name">
        {name}
        {degrees}
      </p>
      <p className="card-text-role">{role}</p>
      <p className="card-text">{titles}</p>
    </div>
  </div>
);

export default Profile;
