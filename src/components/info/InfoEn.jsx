import React from "react";
import { withTranslation } from "react-i18next";

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

const InfoEn = ({ t }) => {
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

          <label
            htmlFor={`accordion-${index}`}
            className="info__paraheadercontainer"
          >
            <div className="info__header description">{para.header}</div>
            <i className="info__arrow"></i>
          </label>
          <div className="drop-down">
            <div className="info__body description">{para.body}</div>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};

export default withTranslation("Info")(InfoEn);
