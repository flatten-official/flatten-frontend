import React from "react";
import { ReactTinyLink } from "react-tiny-link";

const Profile = ({ t, outlet }) => (
  <div className="profile__card">
    <div className="description">
      <p className="profile__name">{outlet.name}</p>
      <p className="profile__role">{outlet.date}</p>
    </div>
    <ReactTinyLink
      cardSize="large"
      showGraphic={true}
      maxLine={0}
      minLine={0}
      url={outlet.link}
    />
  </div>
);

export default Profile;