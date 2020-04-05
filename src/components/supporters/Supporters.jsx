import React from "react";

class Sponsors extends React.Component {
  render() {
    let companies = [
      {
        name: "Google Cloud",
        src: "./companyLogos/google-cloud.png",
        link: "https://cloud.google.com/",
      },
      {
        name: "Vector Institute",
        src: "./companyLogos/vector-institute.png",
        link: "https://vectorinstitute.ai/",
      },
      {
        name: "CIFAR",
        src: "./companyLogos/cifar.png",
        link: "https://cifar.ca",
      },
    ];

    const description = `FLATTEN is a not-for-profit organization platform for collecting 
    and providing real time information regarding the spread of COVID-19 in your local 
    community and around the nation. Although we cannot yet provide tax reciepts, we are 
    accepting donations and you can contact us at the email below should you be interested.`;

    return (
      <React.Fragment>
        <h4 className="title">Supporters</h4>
        <p className="supporters__description">{description}</p>
        <p className="supporters__contact">
          Contact Us:{" "}
          <a className="emailLink" href="mailto:flattenofficial@gmail.com">
            flattenofficial@gmail.com
          </a>
        </p>
        <hr className="line" />
        {companies.map((company, index) => (
          <div key={index} className="supporters__card">
            <a href={company.link} target="_blank" rel="noopener noreferrer">
              <img
                alt={company.name}
                src={require(`${company.src}`)}
                key={index}
                className="logo"
              />
            </a>
            <div>{company.name}</div>
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default Sponsors;
