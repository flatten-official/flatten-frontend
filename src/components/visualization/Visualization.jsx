import React, { Component, useEffect } from "react";
import { withTranslation } from "react-i18next";
import * as d3 from "d3";
import utils from "./vis_utils.js";

let palette = {
  confirmed_cases: "#EB3246",
  deaths: "#000000",
  recovered: "#4285F4",
};

let drawCasesChart = (t, name, container_selector, config) => {
  let width = document.querySelector(container_selector).offsetWidth;

  let svg = utils.getSvg(container_selector, [width, config.height]);

  let url =
    "https://storage.googleapis.com/flatten-271620.appspot.com/confirmed_time_series.json";

  d3.json(url).then((raw) => {
    const x = d3
      .scaleTime()
      .range([config.margin.left, width - config.margin.right]);

    const x_band = d3
      .scaleBand()
      .paddingInner(0.1)
      .range([config.margin.left, width - config.margin.right]);

    const y = d3
      .scaleLinear()
      .range([config.height - config.margin.bottom, config.margin.top]);

    const xAxis = d3.axisBottom().scale(x).ticks(3);
    const yAxis = d3.axisRight().scale(y).ticks(4);
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

    function updateBars(field, vertical_offset = (d) => 0) {
      // need to return a function here to allow this to be called
      // with the rect as the argument
      return (rect) => {
        rect
          .attr("x", (d) => x(d.date) - x_band.bandwidth())
          .attr("y", (d) => y(d.total[field]) - vertical_offset(d))
          .attr("width", x_band.bandwidth())
          .attr("height", (d) => y(0) - y(d.total[field]));
      };
    }

    let data = utils.genConfirmedData(raw, "ONTARIO");

    function genBars() {
      const bar = svg
        .append("g")
        .selectAll("rect")
        .data(data, (d) => d.date.toDateString())
        .join("rect");
      return bar;
    }

    var textConfirmed = svg
      .append("text")
      .attr("class", `${name}-text`)
      .attr("x", config.margin.left)
      .attr("y", config.height * 0.6)
      .attr("fill", palette.confirmed_cases);

    var textDeaths = svg
      .append("text")
      .attr("class", `${name}-text`)
      .attr("x", config.margin.left)
      .attr("y", config.height * 0.425)
      .attr("fill", palette.deaths);

    var textRecovered = svg
      .append("text")
      .attr("class", `${name}-text`)
      .attr("x", config.margin.left)
      .attr("y", config.height * 0.25)
      .attr("fill", palette.recovered);

    const barsConfirmed = genBars().attr("fill", palette.confirmed_cases);

    const barsDeaths = genBars().attr("fill", palette.deaths);

    const barsRecovered = genBars().attr("fill", palette.recovered);

    function update(selectedGroup) {
      let data = utils.genConfirmedData(raw, selectedGroup);

      const t = d3.transition().duration(300).ease(d3.easeLinear);

      let dates = data.map((d) => d.date);
      let latestDate = d3.max(dates);
      let earliestDate = latestDate - 1000 * 60 * 60 * 24 * 30 * 2; // 2 months

      data = data.filter((d) => d.date > earliestDate);
      dates = dates.filter((d) => d > earliestDate);

      x.domain([earliestDate, latestDate]);
      x_band.domain(dates);

      svg.selectAll(`#${name}-xaxis`).transition(t).call(xAxis);

      let y_extent = d3.extent(
        data,
        (d) => d.total.deaths + d.total.confirmed_cases + d.total.recovered
      );
      y_extent = [0, y_extent[1] > 10 ? y_extent[1] : 10];
      y.domain(y_extent);
      svg.selectAll(`#${name}-yaxis`).transition(t).call(yAxis);

      let latest = data[data.length - 1];
      textConfirmed.text(`${latest.total.confirmed_cases} Cases`);
      textDeaths.text(`${latest.total.deaths} Deaths`);
      textRecovered.text(`${latest.total.recovered} Recovered`);

      barsConfirmed
        .data(data, (d) => d.date.toDateString())
        .call((bar) => bar.transition(t).call(updateBars("confirmed_cases")));

      barsDeaths
        .data(data, (d) => d.date.toDateString())
        .call((bar) =>
          bar
            .transition(t)
            .call(
              updateBars("deaths", (d) => y(0) - y(d.total.confirmed_cases))
            )
        );

      barsRecovered
        .data(data, (d) => d.date.toDateString())
        .call((bar) =>
          bar
            .transition(t)
            .call(
              updateBars(
                "recovered",
                (d) => y(0) - y(d.total.confirmed_cases + d.total.deaths)
              )
            )
        );
    }
    const defaultProvince = "ONTARIO";

    const select = svg.append("select").attr("id", "viz-select");
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
    drawCasesChart(t, "confirmed-cases-chart", "#cases-chart", {
      height: window.innerHeight / 4,
      margin: { top: 20, right: 60, bottom: 30, left: 40 },
    });
  }, []);
  return (
    <div className="visualization">
      <div>
        <div id="viz-select-container">
          In &nbsp;
          <select id="viz-select" selected></select>
          &nbsp; there are...
        </div>
      </div>
      <div id="cases-chart" className="chart" />
      {/* <div id="cases-chart2" className="chart" /> */}
    </div>
  );
}

export default withTranslation()(Visualization);
