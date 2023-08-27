// 顺序查找
function sequentSearch(array: number[], num: number) {
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    if (item === num) {
      return i;
    }
  }
  return -1;
}
console.time();
const arr = new Array(1000000).fill(null).map((_, index) => index + 1);
let idx = sequentSearch(arr, 689729);
console.log(idx);
console.timeEnd();

export {};
