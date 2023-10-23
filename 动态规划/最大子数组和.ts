function maxSubArray(nums: number[]): number {
  const n = nums.length;
  const dp: number[] = [];
  dp[0] = nums[0];
  for (let i = 1; i < n; i++) {
    dp[i] = Math.max(nums[i], nums[i] + dp[i - 1]);
  }
  console.log(dp);
  return Math.max(...dp);
}
// 状态压缩
function maxSubArray2(nums: number[]): number {
  const n = nums.length;
  let preValue = nums[0];
  let max = preValue;
  for (let i = 1; i < n; i++) {
    preValue = Math.max(nums[i], nums[i] + preValue);
    max = Math.max(preValue, max);
  }
  return max;
}
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
console.log(maxSubArray2([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
