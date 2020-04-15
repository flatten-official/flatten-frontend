import React from "react";
import { withTranslation } from "react-i18next";

import Para0 from "./paragraphs-fr/Para0";
import Para1 from "./paragraphs-fr/Para1";
import Para2 from "./paragraphs-fr/Para2";
import Para3 from "./paragraphs-fr/Para3";
import Para4 from "./paragraphs-fr/Para4";
import Para5 from "./paragraphs-fr/Para5";
import Para6 from "./paragraphs-fr/Para6";
import Para7 from "./paragraphs-fr/Para7";
import Para8 from "./paragraphs-fr/Para8";
import Para9 from "./paragraphs-fr/Para9";
import Para10 from "./paragraphs-fr/Para10";

const InfoFr = ({ t }) => {
  const Paragraphs = [
    {
      header: t("header0"),
      body: <Para0 />,
    },
    {
      header: t("header1"),
      body: <Para1 />,
    },
    {
      header: t("header2"),
      body: <Para2 />,
    },
    {
      header: t("header3"),
      body: <Para3 />,
    },
    {
      header: t("header4"),
      body: <Para4 />,
    },
    {
      header: t("header5"),
      body: <Para5 />,
    },
    {
      header: t("header6"),
      body: <Para6 />,
    },
    {
      header: t("header7"),
      body: <Para7 />,
    },
    {
      header: t("header8"),
      body: <Para8 />,
    },
    {
      header: t("header9"),
      body: <Para9 />,
    },
    {
      header: t("header10"),
      body: <Para10 />,
    },
  ];

  return (
    <React.Fragment>
      {Paragraphs.map((para, index) => (
        <div key={index} className="info__para">
          <input
            type="checkbox"
            className="activate"
            id={`accordion-${index}`}
            name={`accordion-${index}`}
          />
          <label htmlFor={`accordion-${index}`}>
            <div className="info__header description">{para.header}</div>
          </label>
          <div className="drop-down">
            <div className="info__body description">{para.body}</div>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};
export default withTranslation("Info")(InfoFr);
