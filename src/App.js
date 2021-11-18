import "./App.css";
import React from "react";
import DateRangeInput from "./DateRangeInput";

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
        <DateRangeInput
          setDateRange={this.setDateRange}
          setBitcoinData={this.setBitcoinData}
        />
      </div>
    );
  }
}

export default App;
