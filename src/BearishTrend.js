import React from "react";

// implements the assignment A
class BearishTrend extends React.Component {
  // data is assumed to be ordered
  calculateBearishLength(data) {
    if (!data || !data.prices) return 0;

    // amount of bearish days
    let bearishCount = 0;
    let maxBearishCount = 0;

    for (let i = 0; i < data.prices.length - 1; i++) {
      // data.prices contains timestamp, price arrays
      const todayPrice = data.prices[i][1];
      const tomorrowPrice = data.prices[i + 1][1];

      // check if bearish day
      if (tomorrowPrice < todayPrice) {
        bearishCount++;
      }
      // bearish trend ends
      // if bearish trend longest so far, set it as the longest trend
      else if (bearishCount > maxBearishCount) {
        maxBearishCount = bearishCount;
        bearishCount = 0;
      }
      // reset the current trend
      else {
        bearishCount = 0;
      }
    }

    // needed if bearish trend didn't end before the range end date
    if (bearishCount > maxBearishCount) {
      maxBearishCount = bearishCount;
    }

    return maxBearishCount;
  }

  render() {
    const { data } = this.props;
    console.log(data);
    return <div>{this.calculateBearishLength(data)}</div>;
  }
}

export default BearishTrend;
