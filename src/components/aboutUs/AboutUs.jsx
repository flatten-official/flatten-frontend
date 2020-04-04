import React from "react";
import "./AboutUs.css";
import Profile from "./Profile";
import Volunteers from "./Volunteers";

const AboutUs = () => (
  <React.Fragment>
    <Disclaimer />
    <div className="about-us">
      <section>
        <h4 className="title"> The Team </h4>
        <p className="description">
          Here are the amazing volunteers who made this project possible!
        </p>
        <p className="contact">
          Contact Us:{" "}
          <a className="emailLink" href="mailto:flattenofficial@gmail.com">
            flattenofficial@gmail.com
          </a>
        </p>
        <hr className="line" />
      </section>
      <section className="profiles">
        <div className="container-fluid d-flex justify-content-center">
          <div className="row about-us-row">
            {Volunteers.map((volunteer, index) => (
              <div key={index} className="col-lg-3 col-md-4 col-sm-5">
                <Profile
                  link={volunteer.link}
                  name={volunteer.name}
                  src={volunteer.src}
                  key={index}
                  role={volunteer.role}
                  degrees={volunteer.degrees}
                  titles={volunteer.titles}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  </React.Fragment>
);

export default AboutUs;
