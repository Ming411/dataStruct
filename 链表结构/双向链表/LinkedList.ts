// 每个节点的结构
class Node<T> {
  value: T;
  next: Node<T> | null = null;
  constructor(value: T) {
    this.value = value;
  }
}
// 双向链表
class DoublyNode<T> extends Node<T> {
  prev: DoublyNode<T> | null = null;
  // 重写父类方法
  next: DoublyNode<T> | null = null;
}

export default class LinkedList<T> {
  // protected  TS独有 表示子类可以访问，但其它类不能访问
  protected head: DoublyNode<T> | null = null;
  protected tail: DoublyNode<T> | null = null; // 总是指向尾部
  protected size: number = 0;
  // 获取链表长度
  get length(): number {
    return this.size;
  }
  /* 封装私有方法 */
  // 根据position获取当前节点
  private getNode(position: number): DoublyNode<T> | null {
    let index = 0;
    let current = this.head;
    while (index++ < position && current) {
      current = current.next;
    }
    return current;
  }

  // 判断是否为最后一个节点
  private isTail(node: Node<T>) {
    return this.tail === node;
  }

  // 追加节点
  append(value: T) {
    const newNode = new DoublyNode(value);
    if (!this.head) {
      // 第一次直接是头部
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.size++;
  }
  // 往头部增加元素
  prepend(value: T): void {
    const newNode = new DoublyNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.size++;
  }
  // 遍历链表
  traverse() {
    const values: T[] = [];
    let current = this.head;
    while (current) {
      values.push(current.value);
      if (this.isTail(current)) {
        // 遍历到了最后一个节点，避免无限循环
        current = null;
      } else {
        // 不是最后一个节点
        current = current.next;
      }
    }
    if (this.head && this.tail?.next === this.head) {
      values.push(this.head.value); // 形成闭环效果
    }
    console.log(values.join('->'));
  }

  // 从后向前遍历
  postTraverse() {
    const values: T[] = [];
    let current = this.tail;
    while (current) {
      values.push(current.value);
      current = current.prev;
    }
    console.log(values.join('->'));
  }

  // 插入方法
  insert(value: T, position: number): boolean {
    if (position < 0 || position > this.size) return false;
    if (position === 0) {
      this.prepend(value);
    } else if (position === this.size) {
      this.append(value);
    } else {
      const newNode = new DoublyNode(value);
      const current = this.getNode(position);
      current!.prev!.next = newNode;
      newNode.next = current;
      newNode.prev = current!.prev;
      current!.prev = newNode;
      this.size++;
    }
    return true;
  }
  // 删除方法
  removeAt(position: number): T | null {
    // 判断越界
    if (position < 0 || position >= this.size) return null;
    let current = this.head;
    if (position === 0) {
      if (this.length === 1) {
        // 只剩一个节点
        this.head = null;
        this.tail = null;
      } else {
        this.head = this.head!.next;
        this.head!.prev = null;
      }
    } else if (position === this.length - 1) {
      // 删除的是最后一个
      current = this.tail;
      this.tail = this.tail!.prev;
      this.tail!.next = null;
    } else {
      current = this.getNode(position);
      current!.next!.prev = current!.prev;
      current!.prev!.next = current!.next;
    }
    this.size--;
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

      if (this.isTail(current)) {
        current = null;
      } else {
        current = current.next;
      }
      index++;
    }
    return -1;
  }
  // 判断链表是否为空
  isEmpty(): boolean {
    return this.size === 0;
  }
}
const dLinkedList = new LinkedList<string>();
dLinkedList.append('aaa');
dLinkedList.append('bbb');
dLinkedList.prepend('QQQ');
dLinkedList.prepend('PPP');
dLinkedList.traverse(); // PPP->QQQ->aaa->bbb
dLinkedList.postTraverse(); // bbb->aaa->QQQ->PPP

// dLinkedList.insert('why', 0);
// dLinkedList.insert('coder', 4);
// dLinkedList.insert('no', 2);

// dLinkedList.removeAt(0);
// dLinkedList.removeAt(2);
dLinkedList.removeAt(1);
dLinkedList.traverse();
