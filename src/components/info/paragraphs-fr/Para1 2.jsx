import React from "react";

import "./Para.css";

const Para1 = () => (
  <React.Fragment>
    <p>
      Le virus se transmet principalement:
      <ul>
        <li>
          Par des gouttelettes (toux, éternuement) et par contact direct (ex.
          salive) avec une personne déjà infectée.
        </li>
        <li>Par contact direct ou prolongé avec une personne déjà infectée</li>
        <li>
          En touchant des surfaces ou objets contaminés et en portant par la
          suite les mains au visage, aux yeux et au nez sans lavage préalable
          des mains. La transmission par contact indirect (ex. objets
          contaminés) ne représente pas le mode de transmission principal.
        </li>
      </ul>
    </p>
    <span>Source: </span>
    <a
      className="infoLink"
      target="_blank"
      href="https://www.cdc.gov/coronavirus/2019-ncov/prepare/transmission.html"
    >
      Centers for Disease Control and Prevention
    </a>
  </React.Fragment>
);

export default Para1;
