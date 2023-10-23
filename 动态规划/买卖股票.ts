function maxProfit(prices: number[]): number {
  const n = prices.length;
  if (n <= 1) return 0;
  // 定义状态
  const dp: number[] = [];
  // 设置初始化值
  dp[0] = 0;
  // 状态转移方程求dp
  let minPrice = prices[0];
  for (let i = 1; i < n; i++) {
    // dp[i] = prices[i] - minPrice;
    dp[i] = Math.max(prices[i] - minPrice, dp[i - 1]); // 保存最大利润的数值
    minPrice = Math.min(prices[i], minPrice);
    // console.log(dp[i], minPrice);
  }
  // return Math.max(...dp);
  return dp[n - 1];
}
// 状态压缩
function maxProfit2(prices: number[]): number {
  const n = prices.length;
  if (n <= 1) return 0;
  let preValue = 0;
  let minPrice = prices[0];
  for (let i = 1; i < n; i++) {
    preValue = Math.max(prices[i] - minPrice, preValue); // 保存最大利润的数值
    minPrice = Math.min(prices[i], minPrice);
  }
  return preValue;
}

console.log(maxProfit([7, 1, 5, 3, 6, 0, 4]));
console.log(maxProfit2([7, 1, 5, 3, 6, 0, 4]));
