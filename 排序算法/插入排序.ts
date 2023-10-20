import {measureSort, testSort} from 'hy-algokit';

function insertionSort(arr: number[]): number[] {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    const newNum = arr[i]; // 需要插入的元素
    let j = i - 1;
    while (arr[j] > newNum && j >= 0) {
      // 需要插入的元素与前面的每个元素进行比较
      // 如果插入的元素小于某个元素，将这个元素向后移动一位
      arr[j + 1] = arr[j];
      j--;
    }
    // 将新节点插入到指定位置
    arr[j + 1] = newNum;
  }
  return arr;
}

testSort(insertionSort);
// measureSort(insertionSort);
