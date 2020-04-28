import * as d3 from "d3";

const responsivefy = (svg) => {
  // get container + svg aspect ratio
  var container = d3.select(svg.node().parentNode);
  var width = parseInt(svg.style("width"));
  var height = parseInt(svg.style("height"));
  var aspect = width / height;

  // add viewBox and preserveAspectRatio properties,
  // and call resize so that svg resizes on inital page load
  svg
    .attr("viewBox", "0 0 " + width + " " + height)
    // .attr("perserveAspectRatio", "xMinYMid")
    .call(resize);

  // to register multiple listeners for same event type,
  // you need to add namespace, i.e., 'click.foo'
  // necessary if you call invoke this function for multiple svgs
  // api docs: https://github.com/mbostock/d3/wiki/Selections#on
  d3.select(window).on("resize." + container.attr("id"), resize);

  // get width of container and resize svg to fit it
  function resize() {
    var targetWidth = parseInt(container.style("width"));
    svg.attr("width", targetWidth);
    svg.attr("height", Math.round(targetWidth / aspect));
  }
};

/* Parse out the confirmed data to a format that is convenient to work with in D3.
 *  raw is the JS object that is stored on the bucket. */
function genConfirmedData(
  raw,
  province,
  timeSeriesProperty = "Time Series (Daily)"
) {
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

/* Fetch one or multiple "csv" or "json" files depending on the type specified */
async function fetchData(urls, type) {
  let ret = {};
  let name, url;
  for ([name, url] of Object.entries(urls)) {
    ret[name] = await d3[type](url);
  }
  return ret;
}

function getSvg(container_selector, [width, height]) {
  let svg = d3
    .select(container_selector)
    .append("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("width", width)
    .attr("height", height)
    .call(responsivefy);
  return svg;
}

export default { genConfirmedData, fetchData, getSvg };
