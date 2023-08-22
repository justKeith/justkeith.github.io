(function() {
      // These are based on the last 20 years.
      var meanDailyChange = 0.0003626870482;
      var stdDevDailyChange = 0.0121599971;
      var starting = 4300;
      var count = 5;

      import('/Simulation.js').then(function(Simulation) {
        var s = new Simulation(new Date(), newDate());

        console.log( s.run() );
      })
      const params = Object.fromEntries(
        location.search.slice(1).split('&').map(
          (pair) => pair.split('=')
        )
      );

      if (params.mean)   meanDailyChange   = parseFloat(params.mean);
      if (params.std)    stdDevDailyChange = parseFloat(params.std);
      if (params.start)  starting          = parseFloat(params.start);
      if (params.count)  count             = parseFloat(params.count);

      var sims = [];

      for(var i = 0; i < count; i++) {
        sims.push( simulateYear(starting) );
      }

      displayGraph(sims);

      function simulateYear(currentPrice) {
        let data = [],
            currentDate = new Date();

        for(var i = 0; i < 365; i++) {
          currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
          currentPrice = projectStockPrice(currentPrice, meanDailyChange, stdDevDailyChange);

          data.push({
              date: currentDate,
              value: currentPrice
          });
        }

        return(data);
      }

      function projectStockPrice(currPrice, meanDailyChange, stdDevDailyChange) {
        const drift = meanDailyChange - (stdDevDailyChange * stdDevDailyChange) / 2;
        const randomShock = stdDevDailyChange * normSinv(Math.random());
        return currPrice * Math.exp(drift + randomShock);
      }

      function normSinv(p) {
        const a1 = -3.969683028665376e1;
        const a2 = 2.209460984245205e2;
        const a3 = -2.759285104469687e2;
        const a4 = 1.38357751867269e2;
        const a5 = -3.066479806614716e1;
        const a6 = 2.506628277459239;
      
        const b1 = -5.447609879822406e1;
        const b2 = 1.615858368580409e2;
        const b3 = -1.556989798598866e2;
        const b4 = 6.680131188771972e1;
        const b5 = -1.328068155288572e1;
      
        const c1 = -7.784894002430293e-3;
        const c2 = -3.223964580411365e-1;
        const c3 = -2.400758277161838;
        const c4 = -2.549732539343734;
        const c5 = 4.374664141464968;
        const c6 = 2.938163982698783;
      
        const d1 = 7.784695709041462e-3;
        const d2 = 3.224671290700398e-1;
        const d3 = 2.445134137142996;
        const d4 = 3.754408661907416;
      
        const p_low = 0.02425;
        const p_high = 1 - p_low;
      
        let q;
      
        // Rational approximation for lower region
        if (0 < p && p < p_low) {
          q = Math.sqrt(-2 * Math.log(p));
          return (
            (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
            ((((d1 * q + d2) * q + d3) * q + d4) * q + 1)
          );
        }
      
        // Rational approximation for central region
        if (p_low <= p && p <= p_high) {
          q = p - 0.5;
          const r = q * q;
          return (
            ((((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q) /
            (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1)
          );
        }
      
        // Rational approximation for upper region
        if (p_high < p && p < 1) {
          q = Math.sqrt(-2 * Math.log(1 - p));
          return (
            -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
            ((((d1 * q + d2) * q + d3) * q + d4) * q + 1)
          );
        }
    }

    /*
     * Data should be an arrray of objects with a date (yyyy-mm-dd) and a value (number).
     */
    function displayGraph(data) {
        const margin = {top: 10, right: 30, bottom: 30, left: 60},
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
        const xMin = d3.min(data, function(d) { return d3.min(d, function(e) { return e.date; }); });
        const xMax = d3.max(data, function(d) { return d3.max(d, function(e) { return e.date; }); });

        const x = d3.scaleTime()
          .domain([xMin, xMax])
          .range([ 0, width ]);
        svg.append("g")
          .attr("transform", `translate(0, ${height})`)
          .call(d3.axisBottom(x));
    
        // Add Y axis
        const yMin = d3.min(data, function(d) { return d3.min(d, function(e) { return +e.value; }); })  
        const yMax = d3.max(data, function(d) { return d3.max(d, function(e) { return +e.value; }); })  
  
        const y = d3.scaleLinear()
          .domain([yMin, yMax])
          .range([ height, 0 ]);
        svg.append("g")
          .call(d3.axisLeft(y));
    
        // Add the lines
        for(var i = 0; i < data.length; i++) {
          svg.append("path")
            .datum(data[i])
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
              .x(function(d) { return x(d.date) })
              .y(function(d) { return y(d.value) })
              )
        }
    
    }
})()