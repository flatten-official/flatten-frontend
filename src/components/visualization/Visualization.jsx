import React, { Component, useEffect } from "react";
import { withTranslation } from "react-i18next";
import * as d3 from "d3";
import utils from "./vis_utils.js";

let config = {
  height: 180,
  margin: { top: 20, right: 30, bottom: 30, left: 40 },
};

function genData(
  raw,
  province,
  graphProperty,
  timeSeriesProperty = "Time Series (Daily)"
) {
  let timeSeries = raw[province][timeSeriesProperty];
  let dates = Object.keys(timeSeries);
  let provinces = Object.keys(raw);
  return dates.map((date) => ({
    date: new Date(date),
    value: timeSeries[date][graphProperty],
  }));
}

// d3 example
let drawCasesChart = (t, name, container_selector) => {
  let width = document.querySelector(container_selector).offsetWidth;

  let svg = d3
    .select(container_selector)
    .append("svg")
    .attr("viewBox", [0, 0, width, config.height])
    .attr("width", width)
    .attr("height", config.height)
    .call(utils.responsivefy);

  let url =
    "https://storage.googleapis.com/flatten-staging-271921.appspot.com/confirmed_time_series.json";

  d3.json(url).then((raw) => {
    let x = d3
      .scaleTime()
      .range([config.margin.left, width - config.margin.right]);

    let y = d3
      .scaleLinear()
      .range([config.height - config.margin.bottom, config.margin.top]);

    let line = d3
      .line()
      .x((d) => x(d.date))
      .y((d) => y(d.value));

    let xAxis = d3.axisBottom().scale(x);
    let yAxis = d3.axisLeft().scale(y);
    svg
      .append("g")
      .attr("id", `${name}-xaxis`)
      .attr(
        "transform",
        `translate(0,${config.height - config.margin.bottom})`
      );
    svg
      .append("g")
      .attr("id", `${name}-yaxis`)
      .attr("transform", `translate(${config.margin.left},0)`);

    svg
      .append("path")
      .attr("id", `${name}-line`)
      .attr("fill", "none")
      .attr("stroke", "steelblue");

    function update(selectedGroup) {
      // Create new data with the selection?
      // var dataFilter = data.map(function(d){return {time: d.date, value:d[selectedGroup]} })
      let data = genData(raw, selectedGroup, "Total Deaths");

      let t = d3.transition().duration(300).ease(d3.easeLinear);

      x.domain(d3.extent(data, (d) => d.date));
      svg.selectAll(`#${name}-xaxis`).transition(t).call(xAxis);

      y.domain(d3.extent(data, (d) => d.value));
      svg.selectAll(`#${name}-yaxis`).transition(t).call(yAxis);

      // Give these new data to update line
      d3.select(`#${name}-line`).transition(t).attr("d", line(data));
    }

    // add the options to the button
    d3.select("#viz-select")
      .selectAll("myOptions")
      .data(Object.keys(raw))
      .enter()
      .append("option")
      .text(function (d) {
        return d;
      }) // text showed in the menu
      .attr("value", function (d) {
        return d;
      }); // corresponding value returned by the button

    d3.select("#viz-select").on("change", function (d) {
      // recover the option that has been chosen
      var selectedOption = d3.select(this).property("value");
      // run the updateChart function with this selected option
      update(selectedOption);
    });

    update("ONTARIO");
  });
};

function Visualization({ t }) {
  useEffect(() => {
    drawCasesChart(t, "confirmed-cases-chart", "#cases-chart");
    // drawCasesChart(t, "other-cases-chart", "#cases-chart2");
  }, []);
  return (
    <div className="visualization">
      <div>
        <select id="viz-select"></select>
      </div>
      <div id="cases-chart" className="chart" />
      {/*<div id="cases-chart2" className="chart" />*/}
    </div>
  );
}

export default withTranslation()(Visualization);
