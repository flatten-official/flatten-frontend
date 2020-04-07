import React from "react";

import "./Para.css";

const Para8 = () => (
  <React.Fragment>
    <p>
      Personne dont l’infection au coronavirus causant la COVID-19 a été
      confirmée par un laboratoire de référence (LNM ou laboratoire de santé
      publique d’une province ou d’un territoire). La confirmation nécessite des
      tests positifs d’amplification des acides nucléiques (TAAN) sur au moins
      deux cibles génomiques spécifiques ou une seule cible positive avec
      séquençage des acides nucléiques.
    </p>
    <p>
      Les tests de laboratoire positifs effectués par un laboratoire autre qu’un
      laboratoire de référence doivent être confirmés par un laboratoire de
      référence.
    </p>
    <p className="infoNote">
      Remarque : Les tests d’amplification des acides nucléiques doivent être
      validés pour la détection du virus qui cause la COVID‑19.
    </p>
    <p className="infoNote">
      Remarque : Les tests en laboratoire évoluent pour cet agent pathogène
      émergent, et les recommandations de tests de laboratoire changeront à
      mesure que de nouveaux tests seront développés et validés.
    </p>
    <span>Source: </span>
    <a
      className="infoLink"
      target="_blank"
      href="https://www.canada.ca/fr/sante-publique/services/maladies/2019-nouveau-coronavirus/professionnels-sante/definition-nationale-cas.html"
    >
      Agence de santé publique du Canada
    </a>
  </React.Fragment>
);

export default Para8;
