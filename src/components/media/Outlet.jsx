import React from "react";

// In future should add webp img's to serve in order to improve img loading times
// Need to add a webp loader to the webpack config
const Outlet = ({ t, person }) => (
  <div className="profile__card">
    <div>
      <a href={person.link} target="_blank" rel="noopener noreferrer">
        <img
          src={require(`${
            "./headshots/" + person.src || "./headshots/default.png"
          }`)}
          alt={name}
          loading="lazy"
          className="profile__img"
        />
      </a>
    </div>
    <div className="description">
      <p className="profile__name">
        {person.name}
        {person.degrees}
      </p>
      <p className="profile__role">{t("roles." + person.roleKey)}</p>
      {person.titleKey ? (
        <p className="profile__title">{t("titles." + person.titleKey)}</p>
      ) : null}
    </div>
  </div>
);

export default Outlet;