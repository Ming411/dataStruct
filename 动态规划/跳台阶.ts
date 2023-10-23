/**
 * 递归法
 */
// function jump(n: number): number {
//   // 0 和 1 都只有一种跳法
//   if (n <= 1) return 1;
//   return jump(n - 1) + jump(n - 2);
// }

/**
 * 记忆化搜索
 */
// function jump(n: number): number {
//   const memo = new Array(n + 1).fill(0);
//   return jumpMemo(n, memo);
// }
// function jumpMemo(n: number, memo: number[]): number {
//   if (n <= 1) return 1;
//   if (memo[n] !== 0) return memo[n];
//   memo[n] = jumpMemo(n - 1, memo) + jumpMemo(n - 2, memo);
//   return memo[n];
// }

// console.log(jump(3)); // 111 12 21

/**
 * 动态规划
 * 只有最后一步是 n-1 或者 n-2 时才能登上台阶
 * 所以 跳n阶的概率为 跳n-1和n-2阶的方法之和
 * 以此类推 一直往前推导
 */
// function jump(n: number): number {
//   const dp: number[] = [];
//   dp[0] = 1;
//   dp[1] = 1;
//   for (let i = 2; i <= n; i++) {
//     dp[i] = dp[i - 1] + dp[i - 2];
//   }
//   return dp[n];
// }
// console.log(jump(3));

/**
 * 动态规划-状态压缩
 */
function jump(n: number): number {
  let prev = 1;
  let cur = 1;
  for (let i = 2; i <= n; i++) {
    let newValue = prev + cur;
    prev = cur;
    cur = newValue;
  }
  return cur;
}
// console.log(jump(3));
