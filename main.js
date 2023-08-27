(function () {
  const util = await import('/utility.js');

  const params = Object.fromEntries(
    location.search.slice(1).split('&').map(
      (pair) => pair.split('=')
    )
  );

  var meanDailyChange = util.RATES.sp500_20.mean;
  var stdDevDailyChange =  util.RATES.sp500_20.std;
  var starting = 4300;
  var count = 5;

  if (params.mean) meanDailyChange = parseFloat(params.mean);
  if (params.std) stdDevDailyChange = parseFloat(params.std);
  if (params.start) starting = parseFloat(params.start);
  if (params.count) count = parseFloat(params.count);

  var sims = [];

  for (var i = 0; i < count; i++) {
    sims.push(simulateYear(starting));
  }

  displayGraph(sims);

  function simulateYear(currentPrice) {
    let data = [],
      currentDate = new Date();

    for (var i = 0; i < 365; i++) {
      currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
      currentPrice = util.projectVaule(currentPrice, meanDailyChange, stdDevDailyChange);

      data.push({
        date: currentDate,
        value: currentPrice
      });
    }

    return (data);
  }

  /*
   * Data should be an arrray of objects with a date (yyyy-mm-dd) and a value (number).
   */
  function displayGraph(data) {
    const margin = { top: 10, right: 30, bottom: 30, left: 60 },
      width = 920 - margin.left - margin.right,
      height = 800 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#my_dataviz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add X axis --> it is a date format
    const xMin = d3.min(data, function (d) { return d3.min(d, function (e) { return e.date; }); });
    const xMax = d3.max(data, function (d) { return d3.max(d, function (e) { return e.date; }); });

    const x = d3.scaleTime()
      .domain([xMin, xMax])
      .range([0, width]);
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // Add Y axis
    const yMin = d3.min(data, function (d) { return d3.min(d, function (e) { return +e.value; }); })
    const yMax = d3.max(data, function (d) { return d3.max(d, function (e) { return +e.value; }); })

    const y = d3.scaleLinear()
      .domain([yMin, yMax])
      .range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Add the lines
    for (var i = 0; i < data.length; i++) {
      svg.append("path")
        .datum(data[i])
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .x(function (d) { return x(d.date) })
          .y(function (d) { return y(d.value) })
        )
    }

  }
})()