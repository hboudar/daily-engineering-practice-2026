/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let i = 0, buy, sell, profit = 0, N = prices.length - 1;
        while (i < N) {
            while (i < N && prices[i] >= prices[i + 1]) i++;
            buy = prices[i];

            while (i < N && prices[i] < prices[i + 1]) i++;
            sell = prices[i];

            console.log(`buy: ${buy}, sell: ${sell}`);
            profit += sell - buy;
        }
        return profit;
};

// example 1
console.log(maxProfit([7, 1, 3, 4, 6, 4])); // Output: 7

// example 2
console.log(maxProfit([1, 2, 3, 4, 5])); // Output: 4

// example 3
console.log(maxProfit([7, 6, 4, 3, 1])); // Output: 0