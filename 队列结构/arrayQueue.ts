// 通过数组来实现队列
/**
 * enqueue(element)：向队列尾部添加一个（或多个）新的项。
 * dequeue():移除队列的第一（即排在队列最前面的）项，并返回被移除的元素。
 * front/peek():返回队列中第一个元素(最先被添加}，也将是最先被移除的元素。
 * 队列不做任何变动（不移除元素，只返回元素信息与Stack类的peek方法非常类似)
 * isEmpty():如果队列中不包含任何元素，返回true,否则返回false.。
 * size():返回队列包含的元素个数，与数组的length属性类似。
 */
interface IList<T> {
  peek(): T | undefined;
  isEmpty(): boolean;
  get size(): number;
}
interface IQueue<T> extends IList<T> {
  enqueue(element: T): void;
  dequeue(): T | undefined;
}
export default class ArrayQueue<T> implements IQueue<T> {
  private data: T[] = [];
  enqueue(element: T) {
    this.data.push(element);
  }
  dequeue(): T | undefined {
    return this.data.shift();
  }
  peek(): T | undefined {
    return this.data[0];
  }
  isEmpty(): boolean {
    return !this.data.length ? true : false;
  }
  get size(): number {
    return this.data.length;
  }
}
// const queue = new ArrayQueue<string>();
// queue.enqueue('coder');
// queue.enqueue('ccc');
// console.log(queue.peek());
// console.log(queue.size); // get语法糖，无需再调用
