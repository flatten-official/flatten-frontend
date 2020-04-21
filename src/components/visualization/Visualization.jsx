import React, { Component, useEffect } from "react";
import { withTranslation } from "react-i18next";
import * as d3 from "d3";
import utils from "./vis_utils.js";

let config = {
  height: 180,
  margin: { top: 20, right: 60, bottom: 30, left: 40 },
};

function genData(raw, province, timeSeriesProperty = "Time Series (Daily)") {
  let timeSeries = raw[province][timeSeriesProperty];
  let dates = Object.keys(timeSeries);
  let provinces = Object.keys(raw);
  return dates.map((date) => ({
    date: new Date(date),
    total: {
      deaths: timeSeries[date]["Total Deaths"],
      tested: timeSeries[date]["Total Tested"],
      confirmed_cases: timeSeries[date]["Total Cases"],
      recovered: timeSeries[date]["Total Recovered"],
    },
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

    let x_band = d3
      .scaleBand()
      .range([config.margin.left, width - config.margin.right]);

    let y = d3
      .scaleLinear()
      .range([config.height - config.margin.bottom, config.margin.top]);

    let xAxis = d3.axisBottom().scale(x);
    let yAxis = d3.axisRight().scale(y);
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
      .attr("transform", `translate(${width - config.margin.right},0)`);

    function addBars(rect) {
      rect
        .attr("x", (d) => x(d.date) - x_band.bandwidth())
        .attr("y", (d) => y(d.total.confirmed_cases))
        .attr("width", x_band.bandwidth())
        .attr("height", (d) => y(0) - y(d.total.confirmed_cases));
    }

    let data = genData(raw, "ONTARIO");
    let bars = svg
      .append("g")
      .attr("fill", "steelblue")
      .selectAll("rect")
      .data(data, (d) => d.date.toDateString())
      .join("rect")
      .call(addBars);

    function update(selectedGroup) {
      let data = genData(raw, selectedGroup);

      let t = d3.transition().duration(300).ease(d3.easeLinear);

      let dates = data.map((d) => d.date);
      x.domain(d3.extent(dates));
      x_band.domain(dates);

      svg.selectAll(`#${name}-xaxis`).transition(t).call(xAxis);

      let y_extent = d3.extent(data, (d) =>
        Math.max(d.total.deaths, d.total.confirmed_cases)
      );
      y_extent = [0, y_extent[1] > 10 ? y_extent[1] : 10];
      y.domain(y_extent);
      svg.selectAll(`#${name}-yaxis`).transition(t).call(yAxis);

      // create the bars
      bars
        .data(data, (d) => d.date.toDateString())
        .call((bar) => bar.transition(t).call(addBars));
    }
    let defaultProvince = "ONTARIO";

    let select = svg.append("select").attr("id", "viz-select");
    // add the options to the button
    d3.select("#viz-select")
      .selectAll("myOptions")
      .data(Object.keys(raw))
      .enter()
      .append("option")
      .text(function (d) {
        return d;
      }) // text showed in the menu
      .property("selected", (d) => d === defaultProvince); // corresponding value returned by the button

    d3.select("#viz-select").on("change", function (d) {
      // recover the option that has been chosen
      var selectedOption = d3.select(this).property("value");
      // run the updateChart function with this selected option
      update(selectedOption);
    });

    update(defaultProvince);
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
        <select id="viz-select" selected></select>
      </div>
      <div id="cases-chart" className="chart" />
      {/*<div id="cases-chart2" className="chart" />*/}
    </div>
  );
}

export default withTranslation()(Visualization);
