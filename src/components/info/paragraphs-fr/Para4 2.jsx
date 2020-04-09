import React from "react";

import "./Para.css";

const Para4 = () => (
  <React.Fragment>
    <p>
      Si la COVID-19 vous inquiète ou si vous présentez des symptômes comme de
      la toux, de la{" "}
      <a href="https://www.quebec.ca/sante/problemes-de-sante/a-z/informations-generales-sur-le-coronavirus/#c46469">
        fièvre
      </a>{" "}
      ou des difficultés respiratoires, ou d’autres symptômes compatibles avec
      la COVID-19, vous trouverez les numéros de téléphone pour obtenir de
      l’aide sur le site web du{" "}
      <a href="https://www.quebec.ca/coronavirus">Gouvernement du Québec </a>
      ou de la{" "}
      <a href="https://www.santemontreal.qc.ca">
        Direction de santé publique de Montréal{" "}
      </a>
    </p>
    <p>
      Si vous avez de la toux, de la{" "}
      <a href="https://www.quebec.ca/sante/problemes-de-sante/a-z/informations-generales-sur-le-coronavirus/#c46469">
        fièvre
      </a>{" "}
      ou des difficultés respiratoires ou d’autres symptômes compatibles avec la
      COVID-19:
      <li>
        Si votre condition le permet, composez le numéro de téléphone indiqué
        sur le site web du{" "}
        <a href="https://www.quebec.ca/coronavirus">Gouvernement du Québec </a>
        ou de la{" "}
        <a href="https://www.santemontreal.qc.ca">
          Direction de santé publique de Montréal
        </a>
        . Une infirmière vous transmettra les recommandations ou vous donnera un
        rendez-vous, selon votre situation.
      </li>
      <li>
        Ne vous présentez pas dans une clinique médicale sans avoir reçu au
        préalable un rendez-vous;
      </li>
      <li>
        Si vous êtes de retour d’un voyage depuis moins de 14 jours,
        précisez-le;
      </li>
      <li>
        Rendez-vous à l’urgence seulement si vous avez des difficultés
        respiratoires (difficulté à respirer au repos ou impossibilité de
        respirer en position couchée).
      </li>
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

export default Para4;
