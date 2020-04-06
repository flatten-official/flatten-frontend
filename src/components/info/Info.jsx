import React, { Component } from "react";
import Para0 from "./paragraphs/Para0";
import Para1 from "./paragraphs/Para1";
import Para2 from "./paragraphs/Para2";
import Para3 from "./paragraphs/Para3";
import Para4 from "./paragraphs/Para4";
import Para5 from "./paragraphs/Para5";
import Para6 from "./paragraphs/Para6";
import Para7 from "./paragraphs/Para7";
import Para8 from "./paragraphs/Para8";
import Para9 from "./paragraphs/Para9";
import Para10 from "./paragraphs/Para10";

const Paragraphs = [
  {
    header: "What is a Coronavirus (COVID-19)?",
    body: <Para0 />,
  },
  {
    header: "How does COVID-19 spread?",
    body: <Para1 />,
  },
  {
    header: "What are the symptoms of COVID-19?",
    body: <Para2 />,
  },
  {
    header: "How do I prevent myself and my loved ones from getting COVID-19?",
    body: <Para3 />,
  },
  {
    header: "When should I see my family doctor or go to the hospital?",
    body: <Para4 />,
  },
  {
    header: "What is social distancing and how do I do it?",
    body: <Para5 />,
  },
  {
    header: `What makes a citizen "Vulnerable"?`,
    body: <Para6 />,
  },
  {
    header: `What makes a citizen a "Potential Case"?`,
    body: <Para7 />,
  },
  {
    header: `What makes a citizen a "Confirmed Case"?`,
    body: <Para8 />,
  },
  {
    header: "What public health/medical expertise does our team have?",
    body: <Para9 />,
  },
  {
    header: "External Resources",
    body: <Para10 />,
  },
];

const Info = () => (
  <React.Fragment>
    <h4 className="title info__title">Information</h4>
    {Paragraphs.map((para, index) => (
      <div className="info__para">
        <h2 className="info__header">{para.header}</h2>
        <div className="info__body description">{para.body}</div>
      </div>
    ))}
  </React.Fragment>
);

export default Info;
