import React from "react";
import { ReactTinyLink } from "react-tiny-link";

const Profile = ({ t, outlet }) => (
  <div className="profile__card">
    <div className="description">
      <p className="profile__name">
        {outlet.name}
        {outlet.date}
      </p>
    </div>
    <ReactTinyLink
      cardSize="small"
      showGraphic={true}
      maxLine={2}
      minLine={1}
      url={outlet.link}
    />
  </div>
);

export default Profile;