import {measureSort, swap, testSort} from 'hy-algokit';

function quickSort(arr: number[]): number[] {
  partition(0, arr.length - 1);

  function partition(left: number, right: number) {
    if (left >= right) return;
    // 1 找到基准元素 双指针思路
    const pivot = arr[right];
    // 2 双指针进行交换操作（左边都是比pivot小的数字，右边都是比pivot大的数字）
    let i = left;
    let j = right - 1;

    while (i <= j) {
      // i找到比基准大的
      while (arr[i] < pivot) {
        i++;
      }
      // j找到比基准小的
      while (arr[j] > pivot) {
        j--;
      }
      // 然后交换二者位置即可
      if (i <= j) {
        swap(arr, i, j);
        i++;
        j--;
      }
    }
    // 将pivot放在正确的位置
    swap(arr, i, right);
    // 继续对左右部分进行划分
    partition(left, j);
    partition(i + 1, right);
  }
  return arr;
}

// testSort(quickSort);
measureSort(quickSort);
