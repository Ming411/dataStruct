import ArrayStack from './stack';

function isValid(str: string): boolean {
  const stack = new ArrayStack<string>();
  for (let i = 0; i < str.length; i++) {
    let s = str[i];
    if (s === '(') {
      stack.push(')');
    } else if (s === '[') {
      stack.push(']');
    } else if (s === '{') {
      stack.push('}');
    } else {
      if (s !== stack.pop()) return false;
    }
  }
  return stack.isEmpty();
}

console.log(isValid('(){}[]')); // true
console.log(isValid('{()}[]')); // true
console.log(isValid('{(})[]')); // false
