import React from "react";

const Para7 = () => (
  <React.Fragment>
    <div>
      A person:
      <ul className="infoList">
        <li>
          with fever (over 38 degrees Celsius) and/or new onset of (or
          exacerbation of chronic) cough
        </li>
        <span>
          <strong>AND</strong>
        </span>
        <li>
          who meets the COVID-19 exposure criteria where:
          <ul>
            <li>
              In the 14 days before onset of illness, a person who has:
              travelled to an affected area <strong>OR</strong> has had close
              contact with a confirmed or probable case of COVID-19{" "}
              <strong>OR</strong> had close contact with a person with acute
              respiratory illness who has been to an affected area within 14
              days prior to their illness onset <strong>OR</strong> had
              laboratory exposure to biological material (e.g. primary clinical
              specimens, virus culture isolates) known to contain COVID-19.
            </li>
          </ul>
        </li>
        <li>
          in whom laboratory diagnosis of COVID-19 is:
          <ul>
            <li>inconclusive</li>
            <li>negative (if specimen quality or timing is suspect)</li>
            <li>
              positive but not confirmed by the National Microbiology Laboratory
              (NML) or a provincial public health laboratory by nucleic acid
              amplification tests (NAAT).
            </li>
          </ul>
        </li>
        <li>
          at risk due to a compromised immune system from a medical condition or
          treatment (e.g. chemotherapy)
        </li>
      </ul>
    </div>
    <p className="infoNote">
      Note: A close contact is defined as a person who provided care for the
      patient, including healthcare workers, family members or other caregivers,
      or who had other similar close physical contact or who lived with or
      otherwise had close prolonged contact with a probable or confirmed case
      while the case was ill.
    </p>

    <span>Source: </span>
    <a
      target="_blank"
      href="https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection/health-professionals/national-case-definition.html"
    >
      Public Health Agency of Canada
    </a>
  </React.Fragment>
);

export default Para7;
