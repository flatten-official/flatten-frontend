import React, { Component, useEffect } from "react";
import { withTranslation } from "react-i18next";
import * as d3 from "d3";
import utils from "./vis_utils.js";

let height = 180;
let margin = { top: 20, right: 30, bottom: 30, left: 40 };

// d3 example
let drawCasesChart = (t, container_selector) => {
  let width = document.getElementById("cases-chart").offsetWidth;

  let svg = d3
    .select(container_selector)
    .append("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("width", width)
    .attr("height", height)
    .call(utils.responsivefy);

  let url =
    "https://storage.googleapis.com/flatten-staging-271921.appspot.com/confirmed_time_series.json";

  d3.json(url).then((raw) => {
    // let raw = await d3.json(url);
    let priceData = raw["ONTARIO"]["Time Series (Daily)"];
    let dates = Object.keys(priceData);
    let data = dates.map((date) => ({
      date: new Date(date),
      upper: priceData[date]["Total Deaths"],
    }));

    let x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date))
      .range([margin.left, width - margin.right]);

    let y = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.upper))
      .range([height - margin.bottom, margin.top]);

    let line = d3
      .line()
      .x((d) => x(d.date))
      .y((d) => y(d.upper));

    let xAxis = (g) =>
      g.attr("transform", `translate(0,${height - margin.bottom})`).call(
        d3
          .axisBottom(x)
          .ticks(width / 80)
          .tickSizeOuter(0)
      );

    let yAxis = (g) =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(height / 40))
        .call((g) => g.select(".domain").remove());

    svg.append("g").call(xAxis);

    svg.append("g").call(yAxis);

    svg
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("d", line(data));
  });
};

function Visualization({ t }) {
  useEffect(() => {
    drawCasesChart(t, "#cases-chart");
    drawCasesChart(t, "#cases-chart2");
  }, []);
  return (
    <div className="visualization">
      <div id="cases-chart" className="chart" />
      <div id="cases-chart2" className="chart" />
    </div>
  );
}

export default withTranslation()(Visualization);
