import React from "react";

const priceIndex = 1;
// const dateIndex = 0;

// implements the assignment A
class BearishTrend extends React.Component {
  // data is assumed to be ordered
  // calculates the max number of bearish (price decreases) days in a row
  calculateBearishLength(data) {
    if (!data || !data.prices) return 0;

    // amount of bearish days
    let bearishCount = 0;
    let maxBearishCount = 0;

    for (let i = 0; i < data.prices.length - 1; i++) {
      // data.prices contains date, price arrays
      const todayPrice = data.prices[i][priceIndex];
      const tomorrowPrice = data.prices[i + 1][priceIndex];

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

    if (!data || !data.prices) {
      return (
        <div>
          <div>Longest bearish trend: - days</div>
        </div>
      );
    }

    return (
      <div>
        <div>
          Longest bearish trend: {this.calculateBearishLength(data)} days
        </div>
      </div>
    );
  }
}

export default BearishTrend;
