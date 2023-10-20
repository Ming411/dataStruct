import {measureSort, testSort} from 'hy-algokit';
function mergeSort(arr: number[]): number[] {
  // 分解直至为单个元素
  if (arr.length <= 1) return arr;
  // 1. 分解(divide): 对数组进行分解（分解成两个小数组）
  const mid = Math.floor(arr.length / 2);
  const leftArr = arr.slice(0, mid);
  const rightArr = arr.slice(mid);
  // 1.2 递归拆分
  const newLeftArr = mergeSort(leftArr);
  const newrightArr = mergeSort(rightArr);
  // 2. 合并(merge): 将两个子数组进行合并（双指针）
  // 2.1 定义双指针
  const newArr: number[] = [];
  let i = 0,
    j = 0;
  while (i < newLeftArr.length && j < newrightArr.length) {
    if (newLeftArr[i] <= newrightArr[j]) {
      newArr.push(newLeftArr[i]);
      i++;
    } else {
      newArr.push(newrightArr[j]);
      j++;
    }
  }
  // 2.2 判断是否某一个数组中还有剩余的元素
  if (i < newLeftArr.length) {
    // 左边有剩余
    newArr.push(...newLeftArr.slice(i));
  }
  if (j < newrightArr.length) {
    // 右边有剩余
    newArr.push(...newrightArr.slice(j));
  }
  return newArr;
}

// testSort(mergeSort);
measureSort(mergeSort);
