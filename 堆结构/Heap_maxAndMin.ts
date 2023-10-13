class Heap<T> {
  data: T[] = [];
  private length: number = 0;
  private isMax: boolean = true; // 是否为最大堆

  constructor(arr: T[] = [], isMax = true) {
    this.isMax = isMax;
    if (arr.length === 0) return;
    this.buildHeap(arr);
  }

  // 交换两个变量的位置
  private swap(i: number, j: number) {
    const temp = this.data[i];
    this.data[i] = this.data[j];
    this.data[j] = temp;
  }
  private compare(i: number, j: number): boolean {
    if (this.isMax) {
      return this.data[i] >= this.data[j];
    } else {
      return this.data[i] <= this.data[j];
    }
  }

  insert(value: T) {
    // 将数组放到数组的尾部
    this.data.push(value);
    this.length++;
    this.heapify_up();
  }
  private heapify_up() {
    // 维护最大堆的特性（上滤）
    let index = this.length - 1;
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.compare(parentIndex, index)) {
        // 子节点小于等于父节点 不需要改动
        break;
      }
      this.swap(index, parentIndex);
      index = parentIndex; // 重新赋值递归比较
    }
  }
  // 提取操作(删除第一个元素)
  extract(): T | undefined {
    // 判断元素个数为0或1的情况
    if (this.length === 0) return undefined;
    if (this.length === 1) {
      this.length--;
      return this.data.pop();
    }
    // 提取并返回最大值
    const topValue = this.data[0];

    this.data[0] = this.data.pop()!; // 将第一个元素替换为最后一个元素
    this.length--;

    this.heapify_down(0);
    return topValue;
  }
  private heapify_down(start: number) {
    // 维护最大堆的特性 （下滤）
    let index = start;
    while (2 * index + 1 < this.length) {
      // 找到左右子节点
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = leftChildIndex + 1;
      // 找到左右子节点中比较大的值
      let largerIndex = leftChildIndex;
      if (rightChildIndex < this.length && this.compare(rightChildIndex, leftChildIndex)) {
        largerIndex = rightChildIndex;
      }
      // 较大的值和index位置进行比较
      if (this.compare(index, largerIndex)) {
        break;
      }
      // 交换位置
      this.swap(index, largerIndex);
      index = largerIndex;
    }
  }
  // 获取第一个元素
  peek(): T | undefined {
    return this.data[0];
  }
  size() {
    return this.length;
  }
  isEmpty() {
    return this.length === 0;
  }
  buildHeap(arr: T[]) {
    // 原地建堆（直接将数组变为堆结构）
    this.data = arr;
    this.length = arr.length;

    // 对第一个非叶子节点，进行下滤操作
    const start = Math.floor((this.length - 1) / 2);
    for (let i = start; i >= 0; i--) {
      // console.log(i);
      this.heapify_down(i);
    }
  }
}
// const heap = new Heap<number>();
// const arr = [19, 100, 36, 17, 3, 25, 1, 2, 7];
// for (const item of arr) {
//   heap.insert(item);
// }
// // heap.insert(133);
// heap.extract();
// console.log(heap.data);

const heap = new Heap<number>([9, 11, 20, 56, 23, 45]);
console.log(heap.data);

export {};
