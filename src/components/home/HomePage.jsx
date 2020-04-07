import React from "react";
import PrimaryButton from "../common/buttons/PrimaryButton";
import logo from "../../assets/logo-black.png";

const HomePage = ({ cookieStatus }) => {
  return cookieStatus !== "v" ? (
    <div className="home">
      <div className="home__content">
        <img className="home__logo" src={logo} alt="logo" />
        <div className="body home__description">
          FLATTEN is designed to collect <b>real-time healthcare data</b> and
          <b> increase national awareness</b> throughout this difficult time
          during COVID-19.
          <br />
          <br />
          Our ultimate goal is to flatten the curve of COVID-19, and you can
          do your part by <b>filling out our form once a day</b>.
        </div>
        <PrimaryButton className="home__button body">Returning User</PrimaryButton>
        <br />
        {!cookieStatus && <PrimaryButton className="home__button body">New User</PrimaryButton>}
      </div>
    </div>
  ) : null;
}

export default HomePage;
