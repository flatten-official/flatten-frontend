import React from "react";

import "./Para.css";

const Para2 = () => (
  <React.Fragment>
    <p>
      Les symptômes de la COVID-19 sont semblables à ceux de l’influenza ou
      d’autres virus respiratoires. Les symptômes les plus fréquents sont la
      fièvre, la toux et les difficultés respiratoires. Parmi les autres
      symptômes, il y a la fatigue extrême, le mal de gorge, l’écoulement nasal
      et une perte soudaine de l’odorat et du goût sans congestion nasale.
    </p>
    <p>
      La plupart des personnes atteintes de la COVID-19 se rétablissent par
      elles-mêmes et n’ont pas besoin d’être hospitalisées. Toutefois, certaines
      personnes développent des complications sérieuses, telles que des
      difficultés respiratoires et une pneumonie, qui peuvent mener au décès
      dans les cas les plus sévères.
    </p>
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
      href="https://www.santemontreal.qc.ca"
    >
      Direction de santé publique de Montréal
    </a>
  </React.Fragment>
);

export default Para2;
