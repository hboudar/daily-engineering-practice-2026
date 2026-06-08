/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let [minPrice, maxProfit] =[prices[0], 0];

    for (let i = 1; i < prices.length; i++) {
        if (minPrice > prices[i])
            minPrice = prices[i];
        else if (maxProfit < prices[i] - minPrice)
            maxProfit = prices[i] - minPrice;

    }
    return maxProfit;
};