import React from "react";

const companies = [
  {
    name: "Google Cloud",
    link: "https://cloud.google.com/",
  },
  {
    name: "Vector Institute",
    link: "https://vectorinstitute.ai/",
  },
  {
    name: "CIFAR",
    link: "https://cifar.ca",
  },
];

const description = `FLATTEN is a not-for-profit organization platform for collecting 
and providing real time information regarding the spread of COVID-19 in your local 
community and around the nation. Although we cannot yet provide tax reciepts, we are 
accepting donations and you can contact us at the email below should you be interested.`;

const Supporters = () => (
  <React.Fragment>
    <h4 className="supporters__title title">Supporters</h4>
    <div>
      <p className="supporters__description body">{description}</p>
      <p className="supporters__contact body">
        Contact Us:{" "}
        <a className="email-link" href="mailto:flattenofficial@gmail.com">
          flattenofficial@gmail.com
        </a>
      </p>
    </div>

    <hr className="line" />
    {companies.map((company, index) => (
      <div key={index} className="supporters__card">
        <a
          className="supporters__link title"
          href={company.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {company.name}
        </a>
      </div>
    ))}
  </React.Fragment>
);

export default Supporters;
