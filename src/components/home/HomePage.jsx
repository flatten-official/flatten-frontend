import React from "react";
import PrimaryButton from "../common/buttons/PrimaryButton";
import logo from "../../assets/logo-black.png";

const HomePage = ({ cookieStatus }) => {
  return cookieStatus !== "v" ? (
    <div className="home">
      <div className="home__content">
        <img className="home__logo" src={logo} alt="logo" />
        <div className="body home__description">
          Flatten is a not-for-profit that focuses on using the
          <b> self-reported data of Canadians</b> to help the slow the spread of
          COVID-19. <br /> <br />
          To do your part, <b>fill in the form once a day</b>,
          <b> share with all of your friends </b>, and then
          <b> tell them to do the same</b>.
        </div>
        <PrimaryButton className="home__button body">
          Returning User
        </PrimaryButton>
        <br />
        {!cookieStatus && (
          <PrimaryButton className="home__button body">New User</PrimaryButton>
        )}
      </div>
    </div>
  ) : null;
};

export default HomePage;
