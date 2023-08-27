function binarySearch(array: number[], num: number) {
  let left = 0;
  let right = array.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let midNum = array[mid];
    if (midNum === num) {
      return mid;
    } else if (midNum < num) {
      // 表示目标在右边
      left = mid + 1;
    } else {
      // 表示目标在左边
      right = mid - 1;
    }
  }
  return -1;
}

// console.time();
// performance  JS原生提供的API
const startTime = performance.now();
const arr = new Array(1000000).fill(null).map((_, index) => index + 1);
let idx = binarySearch(arr, 689729);
// console.timeEnd();
const endTime = performance.now();
console.log(idx, endTime - startTime);
