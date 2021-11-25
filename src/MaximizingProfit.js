import React from "react";

const priceIndex = 1;
const dateIndex = 0;

// implements the assignment C
class MaximizingProfit extends React.Component {
  // profit is maximized by buying at the start of some bullish (increasing) trend
  // and sold later at the end of (same or another rising trend)
  // if price only decreases, making profit is impossible
  maximizeProfit(data) {
    if (!data || !data.prices) return undefined;

    // each price is array of date, price
    const prices = data.prices;
    // date, price
    // array of buying candidates (start of a rising trend)
    let buyPriceArr = [];
    // start date can also be the best time to sell
    buyPriceArr.push(prices[0]);

    // date, price
    // array of selling candidates (start of a decreasing trend)
    let sellPriceArr = [];
    // end date can also be the best time to sell
    sellPriceArr.push(prices[prices.length - 1]);

    for (let i = 1; i < prices.length - 1; i++) {
      // date, price
      const yesterdayPrice = prices[i - 1];
      // date, price
      const todayPrice = prices[i];
      // date, price
      const tomorrowPrice = prices[i + 1];

      // beginning of a rising trend (possible best buying date)
      if (
        yesterdayPrice[priceIndex] > todayPrice[priceIndex] &&
        tomorrowPrice[priceIndex] > todayPrice[priceIndex]
      ) {
        buyPriceArr.push(todayPrice);
      }
      // end of a rising trend (possible best selling date)
      else if (
        yesterdayPrice[priceIndex] < todayPrice[priceIndex] &&
        tomorrowPrice[priceIndex] < todayPrice[priceIndex]
      ) {
        sellPriceArr.push(todayPrice);
      }
    }

    // traditionally, selling must happen after buying

    let bestBuyPrice = buyPriceArr[0];
    let bestSellPrice = sellPriceArr[0];
    let bestProfit = this.calcProfit(
      bestBuyPrice[priceIndex],
      bestSellPrice[priceIndex]
    );

    for (const buyPrice of buyPriceArr) {
      for (const sellPrice of sellPriceArr) {
        // ignore buying dates after selling dates
        if (buyPrice[dateIndex].getTime() > sellPrice[dateIndex].getTime()) {
          continue;
        }

        const profit = this.calcProfit(
          buyPrice[priceIndex],
          sellPrice[priceIndex]
        );
        // if this buy-sell pair is best so far
        if (profit > bestProfit) {
          bestBuyPrice = buyPrice;
          bestSellPrice = sellPrice;
          bestProfit = profit;
        }
      }
    }

    return {
      buyDate: bestBuyPrice[dateIndex],
      sellDate: bestSellPrice[dateIndex],
      profit: bestProfit,
    };
  }

  // example: 50% profit is 0.5,  30 % loss is -0.3
  calcProfit(buyPrice, sellPrice) {
    return sellPrice / buyPrice - 1;
  }

  // formated date to yyyy-mm-dd format
  formatDate(date) {
    return `${date.getUTCFullYear()}-${
      date.getUTCMonth() + 1
    }-${date.getUTCDate()}`;
  }

  render() {
    const { data } = this.props;

    const profitData = this.maximizeProfit(data);
    if (!profitData) {
      return (
        <div>
          <div>Buy date: -</div>
          <div>Sell date: -</div>
          <div>Profit: -</div>
        </div>
      );
    }

    // price doesn't increase in any period within the range
    // don't buy
    if (profitData.profit <= 0) {
      return <div>No profit can be made</div>;
    }

    return (
      <div>
        <div>Buy date: {this.formatDate(profitData.buyDate)}</div>
        <div>Sell date: {this.formatDate(profitData.sellDate)}</div>
        <div>
          Profit:{" "}
          {Number((profitData.profit * 100).toPrecision(3)).toLocaleString()}%
        </div>
      </div>
    );
  }
}

export default MaximizingProfit;
