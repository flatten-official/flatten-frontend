import React from "react";

const Para1 = () => (
  <React.Fragment>
    <div>
      COVID-19 is believed to be spread most commonly from an infected person
      through:
      <ul>
        <li>Respiratory droplets generated when they cough or sneeze</li>
        <li>
          Close, prolonged personal contact such as touching or shaking hands
        </li>
        <li>
          Touching something with the virus on it, then touching your mouth,
          nose, or eyes before washing your hands
        </li>
      </ul>
    </div>
    <span>Source: </span>
    <a
      target="_blank"
      href="https://www.cdc.gov/coronavirus/2019-ncov/prepare/transmission.html"
    >
      Centers for Disease Control and Prevention
    </a>
  </React.Fragment>
);

export default Para1;
