import React from "react";

const Para8 = () => (
  <React.Fragment>
    <p>
      A person with laboratory confirmation of infection with the virus that
      causes COVID-19 is performed at a reference laboratory (NML or a
      provincial public health laboratory), and consists of positive nucleic
      acid amplification tests (NAAT) on at least two specific genome targets or
      a single positive target with nucleic acid sequencing.
    </p>
    <p>
      Positive laboratory tests at a non-reference laboratory require additional
      testing at a reference laboratory for confirmation.
    </p>
    <p className="info__note">
      Note: Nucleic acid amplification tests must be validated for detection of
      the virus that causes COVID-19.
    </p>
    <p className="info__note">
      Note: Laboratory tests are evolving for this emerging pathogen, and
      laboratory testing recommendations will change accordingly as new assays
      are developed and validated.
    </p>
    <span>Source: </span>
    <a
      target="_blank"
      href="https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection/health-professionals/national-case-definition.html#exposure"
    >
      Public Health Agency of Canada
    </a>
  </React.Fragment>
);

export default Para8;
