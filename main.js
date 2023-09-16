(async function main() {
  var util = null;
  var acct = null;

  [ util, acct ] = await Promise.all( [
                    import('/utility.js'),
                    import('/Account.js') ] );

  var savings = new acct.FixedInterestAccount('Savings', 10000, 0.0235);
  var test = savings.start(new Date());

  console.log(test);

  const params = Object.fromEntries(
    location.search.slice(1).split('&').map(
      (pair) => pair.split('=')
    )
  );

  var meanDailyChange = util.RATES.sp500_20_weekly.mean;
  var stdDevDailyChange =  util.RATES.sp500_20_weekly.std;
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

  util.displayLineGraph(sims, '#my_dataviz');

  function simulateYear(currentPrice) {
    let data = [],
      currentDate = new Date();

      data.push({
        date: currentDate,
        value: currentPrice
      });

    for (var i = 0; i < 52; i++) {
      currentDate = new Date(currentDate.getTime() + 7 * (24 * 60 * 60 * 1000));
      currentPrice = util.projectValue(currentPrice, meanDailyChange, stdDevDailyChange);

      data.push({
        date: currentDate,
        value: currentPrice
      });
    }

    return (data);
  }
})()