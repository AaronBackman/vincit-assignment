import "./App.css";
import React from "react";
import DateRangeInput from "./DateRangeInput";

class App extends React.Component {
  // gets market data for bitcoin from coingecko, returns a promise object from the fetch request
  fetchBitcoinData(fromDate, toDate) {
    const fromUnixTime = fromDate.valueOf() / 1000; // converted date string to unix time
    const toUnixTime = toDate.valueOf() / 1000 + 60 * 60; // added 1 hour to the unix time as recommended in the assignment

    const url = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=${fromUnixTime}&to=${toUnixTime}`;

    const dataPromise = fetch(url);
    return dataPromise;
  }

  // array of bitcoin data is truncated so that only first datapoint
  // is taken from each day
  // market cap info is not needed and is ignored
  truncateDataArrayToDaily(data) {
    const truncated = { prices: [], totalVolumes: [] };

    let prevDate = new Date(0);
    let currentDate = new Date(0);
    // priceData is an array of timestamp (milliseconds), price
    // take first price from each day
    for (const priceData of data.prices) {
      const timestamp = priceData[0];
      const price = priceData[1];

      currentDate = new Date(timestamp);

      // only year, month and day are relevant
      prevDate.setUTCHours(0);
      prevDate.setUTCMinutes(0);
      prevDate.setUTCSeconds(0);
      prevDate.setUTCMilliseconds(0);

      currentDate.setUTCHours(0);
      currentDate.setUTCMinutes(0);
      currentDate.setUTCSeconds(0);
      currentDate.setUTCMilliseconds(0);

      // check that this date is after the previous date,
      // otherwise it is the same date and is ignored
      if (prevDate < currentDate) {
        truncated.prices.push([currentDate, price]);
      }

      prevDate = currentDate;
    }

    prevDate = new Date(0);
    currentDate = new Date(0);
    // volumeData is an array of timestamp (milliseconds), volume
    // take first volume from each day
    for (const volumeData of data.total_volumes) {
      const timestamp = volumeData[0];
      const volume = volumeData[1];

      currentDate = new Date(timestamp);

      // only year, month and day are relevant
      prevDate.setUTCHours(0);
      prevDate.setUTCMinutes(0);
      prevDate.setUTCSeconds(0);
      prevDate.setUTCMilliseconds(0);

      currentDate.setUTCHours(0);
      currentDate.setUTCMinutes(0);
      currentDate.setUTCSeconds(0);
      currentDate.setUTCMilliseconds(0);

      // check that this date is after the previous date,
      // otherwise it is the same date and is ignored
      if (prevDate < currentDate) {
        truncated.totalVolumes.push([currentDate, volume]);
      }

      prevDate = currentDate;
    }

    return truncated;
  }

  setDateRange(fromDate, toDate) {
    this.fetchBitcoinData(fromDate, toDate)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ bitcoinData: this.truncateDataArrayToDaily(data) });
      });

    this.setState({ dateRange: { fromDate, toDate } });
  }

  setBitcoinData(bitcoinData) {
    this.setState({ bitcoinData: bitcoinData });
  }

  constructor(props) {
    super(props);
    this.state = { dateRange: undefined, bitcoinData: undefined };

    this.setDateRange = this.setDateRange.bind(this);
    this.setBitcoinData = this.setBitcoinData.bind(this);
  }

  render() {
    console.log(this.state.bitcoinData);

    return (
      <div className="App">
        <DateRangeInput setDateRange={this.setDateRange} />
      </div>
    );
  }
}

export default App;
