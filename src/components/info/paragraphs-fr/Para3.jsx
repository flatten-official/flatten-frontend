import React from "react";

import "./Para.css";

const Para3 = () => (
  <React.Fragment>
    <p>
      Il n’existe actuellement aucun vaccin, médicament ou produit naturel qui
      protège contre le COVID-19. Pour réduire les risques de transmission, il
      est important de mettre en application les mesures de prévention générales
      recommandées pendant la pandémie de COVID-19. Il s’agit notamment du
      lavage fréquent des mains à l’eau et au savon (durant 20 secondes) ou avec
      une solution désinfectante à base d’alcool, d’éviter de porter les mains
      au visage, de l’étiquette respiratoire (ex. tousser dans le coude) et du
      maintien d’une distance minimale de deux mètres entre les personnes.
    </p>
    <p>
      Il est recommandé de rehausser les mesures de nettoyage et de désinfection
      des surfaces fréquemment touchées (jouets, téléphones, appareils
      électroniques, poignées de porte, tables de chevet, télécommandes, etc.) à
      l’aide d’un produit désinfectant ou d’une solution d’eau de javel (1
      partie d’eau de javel pour 9 parties d’eau).
    </p>
    <p>
      Une liste de produits est disponible sur le site du Gouvernement du
      Canada:
      <a
        className="infoLink"
        target="_blank"
        href="https://www.canada.ca/fr/sante-canada/services/medicaments-produits-sante/desinfectants/covid-19/liste.html"
      >
        {" "}
        Liste de désinfectants pour surfaces dures autorisés par Santé Canada
        (COVID-19)
      </a>
    </p>

    <span>Source: </span>
    <a
      className="infoLink"
      target="_blank"
      href="https://www.cdc.gov/coronavirus/2019-ncov/prepare/prevention.html"
    >
      Centers for Disease Control and Prevention
    </a>
  </React.Fragment>
);

export default Para3;
