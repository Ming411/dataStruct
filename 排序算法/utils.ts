// 交换数组中两个元素的位置
export function swap(arr: number[], i: number, j: number) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
// 测试排序是否正确
function isSorted(arr: number[]): boolean {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) return false;
  }
  return true;
}

type SortAlgoFn = (arr: number[]) => number[];
export function testSort(sortFn: SortAlgoFn) {
  const nums = Array.from({length: 10}, () => {
    return Math.floor(Math.random() * 200);
  });
  console.log('排序前的数组', nums);
  const newNums = sortFn(nums);
  console.log('排序后的数组', newNums);
  console.log('排序是否正确', isSorted(newNums));
}
