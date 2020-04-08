import React from "react";

import "./Para.css";

const Para7 = () => (
  <React.Fragment>
    <p>
      Une personne:
      <ul class="infoList">
        <li>
          présentant une fièvre (plus de 38 degrés Celsius) ET/OU montrant
          l'apparition d'une toux (ou exacerbation de la toux chronique)
        </li>
        <span>
          <strong>ET</strong>
        </span>
        <li>
          qui répond aux critères d'exposition du COVID-19, soit qu’au cours des
          14 jours qui ont précédé le début des symptômes, la personne:
          <ul>
            <li>
              A voyagé vers une{" "}
              <a
                className="infoLink"
                target="_blank"
                href="https://www.canada.ca/fr/sante-publique/services/maladies/2019-nouveau-coronavirus/professionnels-sante/liste-regions-touchees-covid-19.html"
              >
                région touchée
              </a>
            </li>
            <b>OU</b>
            <li>
              A été en contact étroit avec un cas confirmé ou probable du
              COVID-19
            </li>
            <b>OU</b>
            <li>
              A été en contact étroit avec une personne atteinte d'une maladie
              respiratoire aiguë qui s'était rendue dans une{" "}
              <a
                className="infoLink"
                target="_blank"
                href="https://www.canada.ca/fr/sante-publique/services/maladies/2019-nouveau-coronavirus/professionnels-sante/liste-regions-touchees-covid-19.html"
              >
                région touchée
              </a>{" "}
              dans les 14 jours précédant le début de la maladie;
            </li>
            <b>OU</b>
            <li>
              A été exposée en laboratoire à du matériel biologique (p. ex.
              échantillons cliniques primaires, isolats de cultures de virus)
              qu'on savait contenir du COVID-19.
            </li>
          </ul>
        </li>
        <li>
          <strong>ET</strong> pour laquelle le diagnostic de laboratoire pour
          COVID-19:
          <ul>
            <li>mène à un diagnostic qui n'est pas décisif;</li>
            <li>
              est négatif (si la qualité ou le moment du prélèvement est
              suspect);
            </li>
            <li>
              est positif, mais n'a pas été confirmé par le Laboratoire national
              de microbiologie (LNM) ou le laboratoire de santé publique d'une
              province ou d'un territoire au moyen de tests d'amplification des
              acides nucléiques (TAAN).
            </li>
          </ul>
        </li>
      </ul>
    </p>
    <p className="infoNote">
      Un contact étroit est défini comme étant une personne qui a prodigué des
      soins au patient, y compris les travailleurs de la santé, les membres de
      la famille ou d'autres personnes soignantes, ou encore une personne ayant
      eu un contact physique étroit, ou qui a vécu avec le cas ou qui a eu
      autrement un contact étroit prolongé avec un cas probable ou confirmé
      alors que ce dernier était malade.
    </p>

    <span>Source: </span>
    <a
      className="infoLink"
      target="_blank"
      href="https://www.canada.ca/fr/sante-publique/services/maladies/2019-nouveau-coronavirus/professionnels-sante/definition-nationale-cas.html "
    >
      Agence de santé publique du Canada
    </a>
  </React.Fragment>
);

export default Para7;
