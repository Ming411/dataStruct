function fib(n: number): number {
  let prev = 0;
  let cur = 1;
  for (let i = 2; i <= n; i++) {
    // 状态转移方程
    const newValue = prev + cur;
    prev = cur;
    cur = newValue;
  }
  return cur;
}

console.log(fib(10)); // 55
console.log(fib(50));
