function fib(n: number, memo: number[] = []): number {
  if (n <= 1) return n;
  // console.log(n, memo);
  // 使用memo保存已计算的值
  if (memo[n]) {
    return memo[n];
  }
  const res = fib(n - 1, memo) + fib(n - 2, memo);
  memo[n] = res;
  return res;
}

console.log(fib(10));

export {};
