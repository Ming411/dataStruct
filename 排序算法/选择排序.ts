import {testSort, swap, measureSort} from 'hy-algokit';
// 选择排序
function selectionSort(arr: number[]): number[] {
  const n = arr.length;
  // 外层循环作用：经过多少轮找出最小值（最后一轮只剩一个元素无需比较）
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    // 每次找到最小值
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (i !== minIndex) {
      swap(arr, i, minIndex);
    }
  }
  return arr;
}

// testSort(selectionSort);
measureSort(selectionSort);
