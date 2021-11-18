import "./App.css";
import React from "react";
import DateRangeInput from "./DateRangeInput";
import BearishTrend from "./BearishTrend";

class App extends React.Component {
  setDateRange(fromDate, toDate) {
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
        <div>
          <DateRangeInput
            setDateRange={this.setDateRange}
            setBitcoinData={this.setBitcoinData}
          />
        </div>
        <div>
          <BearishTrend data={this.state.bitcoinData} />
        </div>
      </div>
    );
  }
}

export default App;
