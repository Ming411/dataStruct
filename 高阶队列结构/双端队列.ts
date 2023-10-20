import ArrayQueue from '../队列结构/arrayQueue';
class ArrayDeque<T> extends ArrayQueue<T> {
  // 往头部追加元素
  addFront(value: T) {
    this.data.unshift(value);
  }
  // 移除尾部元素
  removeBack(): T | undefined {
    return this.data.pop();
  }
}
const deque = new ArrayDeque<string>();
deque.enqueue('aaa');
deque.enqueue('bbb');
deque.enqueue('ccc');
deque.addFront('abc');
deque.addFront('cba');
while (!deque.isEmpty()) {
  console.log(deque.removeBack());
  // ccc
  // bbb
  // aaa
  // abc
  // cba
}
