import ArrayStack from './stack';
let num = 35;

function decimalToBinary(decimal: number): string {
  const stack = new ArrayStack<number>();
  while (decimal > 0) {
    const ret = decimal % 2;
    decimal = Math.floor(decimal / 2); // 向下取整
    stack.push(ret);
  }
  let binary = '';
  while (!stack.isEmpty()) {
    binary += stack.pop();
  }
  return binary;
}

console.log(decimalToBinary(num));
