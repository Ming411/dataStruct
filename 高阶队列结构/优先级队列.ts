import Heap from '../堆结构/Heap_maxAndMin';

class PriorityNode<T> {
  priority: number;
  value: T;
  constructor(value: T, priority: number) {
    this.priority = priority;
    this.value = value;
  }
  valueOf() {
    return this.priority;
  }
}
class PriorityQueue<T> {
  private heap: Heap<PriorityNode<T>> = new Heap(); // 使用最大堆实现
  enqueue(value: T, priority: number) {
    // 入队
    const newNode = new PriorityNode(value, priority);
    this.heap.insert(newNode);
  }
  // 出队
  dequeue(): T | undefined {
    return this.heap.extract()?.value;
  }
  peek(): T | undefined {
    return this.heap.peek()?.value;
  }
  isEmpty() {
    return this.heap.isEmpty();
  }
  size() {
    return this.heap.size();
  }
}

const pQueue = new PriorityQueue<string>();
pQueue.enqueue('ccc', 98);
pQueue.enqueue('noCoder', 90);
pQueue.enqueue('bar', 105);
while (!pQueue.isEmpty()) {
  console.log(pQueue.dequeue());
}
