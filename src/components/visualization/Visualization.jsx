import React, { useState, useEffect } from "react";
import { withTranslation } from "react-i18next";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from "recharts";
import * as d3 from "d3";

let height = 180;
let margin = { top: 20, right: 30, bottom: 30, left: 40 };

// Recharts example
let Chart1 = function() {
  let [data, setData] = useState([]);
  // let container = document.getElementById("chart1");
  // let width = container ? container.clientWidth : 0;

  useEffect(async () => {
    let url =
      "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo";
    let raw = await d3.json(url);
    let priceData = raw["Time Series (Daily)"];
    let dates = Object.keys(priceData);
    let data = dates.map(date => ({
      date: new Date(date),
      upper: priceData[date]["2. high"]
    }));
    setData(data);
  }, []);

  return (
    <ResponsiveContainer debounce={15}>
      <LineChart data={data}>
        <Line type="monotone" dataKey="upper" stroke="steelblue" />
        <XAxis dataKey="date" />
        <YAxis dataKey="upper" />
      </LineChart>
    </ResponsiveContainer>
  );
};

// d3 example
let drawChart2 = async t => {
  let width = document.getElementById("chart2").clientWidth;

  let svg = d3
    .select("#chart2")
    .append("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("width", width)
    .attr("height", height);

  let url =
    "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo";
  let raw = await d3.json(url);
  let priceData = raw["Time Series (Daily)"];
  let dates = Object.keys(priceData);
  let data = dates.map(date => ({
    date: new Date(date),
    upper: priceData[date]["2. high"]
  }));

  let x = d3
    .scaleTime()
    .domain(d3.extent(data, d => d.date))
    .range([margin.left, width - margin.right]);

  let y = d3
    .scaleLinear()
    .domain(d3.extent(data, d => d.upper))
    .range([height - margin.bottom, margin.top]);

  let line = d3
    .line()
    .x(d => x(d.date))
    .y(d => y(d.upper));

  let xAxis = g =>
    g.attr("transform", `translate(0,${height - margin.bottom})`).call(
      d3
        .axisBottom(x)
        .ticks(width / 80)
        .tickSizeOuter(0)
    );

  let yAxis = g =>
    g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(height / 40))
      .call(g => g.select(".domain").remove());

  svg.append("g").call(xAxis);

  svg.append("g").call(yAxis);

  svg
    .append("path")
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("d", line(data));
};

function Visualization({ t }) {
  useEffect(() => {
    drawChart2(t);
  }, []);
  return (
    <div className="visualization">
      <div id="chart1" className="chart">
        <Chart1 />
      </div>
      <div id="chart2" className="chart" />
    </div>
  );
}

export default withTranslation()(Visualization);
