import React from "react";

import "./Para.css";

const Para5 = () => (
  <React.Fragment>
    <p>
      Les stratégies de distanciation sociale recommandées par le gouvernement
      visent à diminuer la probabilité de contacts avec des personnes infectées,
      et, dans la mesure du possible, de maintenir une distance minimale de deux
      mètres entre les personnes.
    </p>
    <p>
      Le gouvernement du Québec a ordonné de réduire au minimum, à compter du 25
      mars et jusqu’au 13 avril 2020, l’ensemble des services et activités qui
      ne sont pas prioritaires. Une liste des services et activités prioritaires
      a été rendue publique et sera mise à jour périodiquement.
    </p>
    <span>Sources: </span>
    <a
      className="infoLink"
      target="_blank"
      href="https://www.quebec.ca/coronavirus"
    >
      Gouvernement du Québec
    </a>
    <span> et </span>
    <a
      className="infoLink"
      target="_blank"
      href="https://www.santemontreal.qc.ca"
    >
      Direction de santé publique de Montréal
    </a>
  </React.Fragment>
);

export default Para5;
