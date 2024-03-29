import React from "react";
import "./DataRangeInput.css";

const volumeIndex = 1;
const dateIndex = 0;

class DateRangeInput extends React.Component {
  // gets market data for bitcoin from coingecko, returns a promise object from the fetch request
  fetchBitcoinData(fromDate, toDate) {
    const fromUnixTime = fromDate.valueOf() / 1000; // converted date string to unix time
    const toUnixTime = toDate.valueOf() / 1000 + 60 * 60; // added 1 hour to the unix time as recommended in the assignment

    const url = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=${fromUnixTime}&to=${toUnixTime}`;

    const dataPromise = fetch(url);
    return dataPromise;
  }

  // array of bitcoin data is truncated so that only first datapoint
  // is taken from each day if there are multiple on the same day
  // market cap info is not needed and is ignored
  truncateDataArrayToDaily(data) {
    const truncated = { prices: [], totalVolumes: [] };

    let prevDate = new Date(0);
    let currentDate = new Date(0);
    // priceData is an array of timestamp (milliseconds), price
    // take first price from each day
    for (const priceData of data.prices) {
      const timestamp = priceData[dateIndex];
      const price = priceData[volumeIndex];

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
      const timestamp = volumeData[dateIndex];
      const volume = volumeData[volumeIndex];

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

  constructor(props) {
    super(props);
    this.state = { dateFromStr: "", dateToStr: "" };

    this.handleChangeDateFrom = this.handleChangeDateFrom.bind(this);
    this.handleChangeDateTo = this.handleChangeDateTo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeDateFrom(e) {
    this.setState({ dateFromStr: e.target.value });
  }

  handleChangeDateTo(e) {
    this.setState({ dateToStr: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const fromDate = new Date(this.state.dateFromStr);
    const toDate = new Date(this.state.dateToStr);

    if (fromDate > toDate) {
      console.error("start date must be before end date");
      return;
    }

    this.fetchBitcoinData(fromDate, toDate)
      .then((response) => response.json())
      .then((data) => {
        this.props.setBitcoinData(this.truncateDataArrayToDaily(data));
      });

    this.props.setDateRange(
      new Date(this.state.dateFromStr),
      new Date(this.state.dateToStr)
    );
  }

  render() {
    return (
      <div className="input-container">
        <div className="input-form-container">
          <div className="input-info">
            <div>Please enter dates</div>
            <div>yyyy-mm-dd format is used</div>
            <div>Example: 2019-05-12</div>
          </div>
          <form className="input-form" onSubmit={this.handleSubmit}>
            <div>from</div>
            <input
              type="text"
              value={this.state.dateFromStr}
              onChange={this.handleChangeDateFrom}
            />
            <div>to</div>
            <input
              type="text"
              value={this.state.dateToStr}
              onChange={this.handleChangeDateTo}
            />
            <input type="submit" value="Ok" />
          </form>
        </div>
      </div>
    );
  }
}

export default DateRangeInput;
