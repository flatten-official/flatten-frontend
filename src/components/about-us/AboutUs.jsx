import React from "react";
import Profile from "./Profile";
import Volunteers from "./Volunteers";
import Navbar from "../navbar/Navbar";

const AboutUs = () => (
  <React.Fragment>
    <Navbar />
    <section>
      <h4 className="about-us__title title">About Us</h4>
      <div className="about-us__description">
        <p className="body">
          Here are the amazing volunteers who made this project possible!
        </p>
        <p className="body">
          Contact Us:{" "}
          <a className="email-link" href="mailto:flattenofficial@gmail.com">
            flattenofficial@gmail.com
          </a>
        </p>
      </div>
      <hr className="line" />
    </section>
    <section>
      <div className="about-us__body">
        {Volunteers.map((volunteer, index) => (
          <Profile
            key={index}
            link={volunteer.link}
            name={volunteer.name}
            src={volunteer.src}
            key={index}
            role={volunteer.role}
            degrees={volunteer.degrees}
            titles={volunteer.titles}
          />
        ))}
      </div>
    </section>
  </React.Fragment>
);

export default AboutUs;
