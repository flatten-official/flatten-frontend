import React from "react";
import { ReactTinyLink } from "react-tiny-link";

const Profile = ({ t, outlet }) => (
  <div className="outlet__card">  
    <ReactTinyLink
      cardSize="small"
      showGraphic={true}
      maxLine={0}
      minLine={0}
      url={outlet.link}
    />
  </div>
);

export default Profile;