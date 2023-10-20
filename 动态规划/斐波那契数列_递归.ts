function fib(n: number): number {
  //  0 1 1 2 3 5
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2); // 存在大量重复计算，性能不好
}

console.log(fib(10));

export {};
