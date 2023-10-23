function fib(n: number): number {
  // dp 保留斐波那契数列中的每一个位置对应的值(状态)
  const dp: number[] = [];
  // 设置初始值
  dp[0] = 0;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    // 状态转移方程（通常都是在循环中 for/while）
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

console.log(fib(10)); // 55
console.log(fib(50));

export {};
