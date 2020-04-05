import React, { Component } from "react";
import Para0 from "./Paragraphs/Para0";
import Para1 from "./Paragraphs/Para1";
import Para2 from "./Paragraphs/Para2";
import Para3 from "./Paragraphs/Para3";
import Para4 from "./Paragraphs/Para4";
import Para5 from "./Paragraphs/Para5";
import Para6 from "./Paragraphs/Para6";
import Para7 from "./Paragraphs/Para7";
import Para8 from "./Paragraphs/Para8";
import Para9 from "./Paragraphs/Para9";
import Para10 from "./Paragraphs/Para10";

const Paragraphs = [
  {
    header: "What is a Coronavirus (COVID-19)?",
    body: <Para0 />,
  },
  {
    header: "What are the symptoms of COVID-19?",
    body: <Para1 />,
  },
  {
    header: "How do I prevent myself and my loved ones from getting COVID-19?",
    body: <Para2 />,
  },
  {
    header: "When should I see my family doctor or go to the hospital?",
    body: <Para3 />,
  },
  {
    header: "What is social distancing and how do I do it?",
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

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <h4 className="title">Information</h4>
        {Paragraphs.map((para, index) => (
          <div className="info__para">
            <h2 className="info__title">{para.header}</h2>
            <div className="info__body">{para.body}</div>
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default App;
