import React from "react";

const Para3 = () => (
  <React.Fragment>
    <p>
      At this time, there is no vaccine, medication, or natural health products
      that have evidence of protecting against COVID-19. We would encourage you
      to practice “social distancing”: Stay home as much as possible, refrain
      from attending large gatherings of people, wash your hands often with soap
      and water for at least 20 seconds (or use hand sanitizer made up of at
      least 60% alcohol), avoid touching your eyes nose or mouth with unwashed
      hands, avoid close contact with people who are sick, and avoid all
      non-essential travel
    </p>
    <p>
      As well, clean high-touch surfaces frequently with regular household
      cleaners or diluted bleach (1 part bleach to 9 parts water): such as toys,
      toilets, phones, electronics, door handles, bedside tables, and television
      remotes
    </p>
    <p>
      For a list of cleaners and disinfectants effective against COVID-19, refer
      to the following Government of Canada resource:
      <a
        target="_blank"
        href="https://www.canada.ca/en/health-canada/services/drugs-health-products/disinfectants/covid-19/list.html"
      >
        {" "}
        List of hard-surface disinfectants for use against coronavirus
        (COVID-19)
      </a>
    </p>

    <span>Source: </span>
    <a
      target="_blank"
      href="https://www.cdc.gov/coronavirus/2019-ncov/prepare/prevention.html"
    >
      Centers for Disease Control and Prevention
    </a>
  </React.Fragment>
);

export default Para3;
