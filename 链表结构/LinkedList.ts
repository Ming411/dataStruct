/**
 * 一般diff算法中 都是维护着一套链表
 * 因为在操作链表移动删除新增 开销更小
 */
// 每个节点的结构
class Node<T> {
  value: T;
  next: Node<T> | null = null;
  constructor(value: T) {
    this.value = value;
  }
}

export default class LinkedList<T> {
  private head: Node<T> | null = null;
  private size: number = 0;
  // 获取链表长度
  get length(): number {
    return this.size;
  }
  /* 封装私有方法 */
  // 根据position获取当前节点
  private getNode(position: number): Node<T> | null {
    let index = 0;
    let current = this.head;
    while (index++ < position && current) {
      current = current.next;
    }
    return current;
  }

  // 追加节点
  append(value: T) {
    const newNode = new Node(value);
    if (!this.head) {
      // 第一次直接是头部
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      // 此时current就是最后一个节点了
      current.next = newNode;
    }
    this.size++;
  }
  // 遍历链表
  traverse() {
    const values: T[] = [];
    let current = this.head;
    while (current) {
      values.push(current.value);
      current = current.next;
    }
    console.log(values.join('->'));
  }
  // 插入方法
  insert(value: T, position: number): boolean {
    if (position < 0 || position > this.size) return false;
    const newNode = new Node(value);
    if (position === 0) {
      // 替换head
      newNode.next = this.head;
      this.head = newNode;
    } else {
      // let current = this.head;
      // let previous: Node<T> | null = null;
      // let index = 0;
      // while (index++ < position && current) {
      //   previous = current;
      //   current = current.next;
      // }
      // previous!.next = newNode;
      // newNode.next = current;

      let previous = this.getNode(position - 1);
      newNode.next = previous!.next;
      previous!.next = newNode;
    }
    this.size++;
    return true;
  }
  // 删除方法
  removeAt(position: number): T | null {
    // 判断越界
    if (position < 0 || position >= this.size) return null;
    let current = this.head;
    if (position === 0) {
      // 删除第一个节点
      this.head = this.head?.next ?? null;
    } else {
      // 非第一个节点
      // let previous: Node<T> | null = null;
      // let index = 0;
      // while (index++ < position && current) {
      //   previous = current;
      //   current = current.next;
      // }
      // previous!.next = current?.next ?? null;

      let previous = this.getNode(position - 1);
      current = previous!.next;
      previous!.next = previous?.next?.next ?? null;
    }

    this.size--;
    // `??` 运算符只在左侧操作数为 null 或 undefined 时才返回右侧操作数，否则返回左侧操作数
    return current?.value ?? null;
  }
  // 根据值进行删除
  remove(value: T): T | null {
    const index = this.indexOf(value);
    return this.removeAt(index);
  }
  // 获取节点
  get(position: number): T | null {
    if (position < 0 || position >= this.size) return null;
    // let index = 0;
    // let current = this.head;
    // while (index++ < position && current) {
    //   current = current.next;
    // }
    // return current!.value;

    return this.getNode(position)?.value ?? null;
  }
  // 更新
  update(value: T, position: number): boolean {
    if (position < 0 || position >= this.size) return false;
    const currentNode = this.getNode(position);
    currentNode!.value = value;
    return true;
  }
  // 获取索引
  indexOf(value: T): number {
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.value === value) {
        return index;
      }
      current = current.next;
      index++;
    }
    return -1;
  }
  // 判断链表是否为空
  isEmpty(): boolean {
    return this.size === 0;
  }
}
// const linkedList = new LinkedList<string>();
// linkedList.append('ccc');
// linkedList.append('coder1');
// linkedList.append('coder2'); // 插入 索引2
// linkedList.append('coder3');
// linkedList.traverse();
// linkedList.insert('nocoder', 2);
// console.log(linkedList.removeAt(2));
// console.log(linkedList.get(2));
// console.log(linkedList.update('why', 2));
// console.log(linkedList.indexOf('coder2'));
// console.log(linkedList);
// linkedList.traverse();

// export {};
