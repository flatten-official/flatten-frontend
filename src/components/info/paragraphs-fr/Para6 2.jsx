import React from "react";

import "./Para.css";

const Para6 = () => (
  <React.Fragment>
    <p>
      Les personnes les plus vulnérables et les plus à risque de développer des
      atteintes sévères sont les personnes âgées ou ayant des maladies
      chroniques préexistantes (haute pression, maladie cardiaque, maladie
      pulmonaire, cancer, dialyse ou diabète).
    </p>
    <span>Source: </span>
    <a
      className="infoLink"
      target="_blank"
      href="https://www.canada.ca/fr/sante-publique/services/publications/maladies-et-affections/populations-vulnerables-covid-19.html"
    >
      Agence de santé publique du Canada
    </a>
  </React.Fragment>
);

export default Para6;
