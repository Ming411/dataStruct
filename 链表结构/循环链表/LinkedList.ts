// 每个节点的结构
class Node<T> {
  value: T;
  next: Node<T> | null = null;
  constructor(value: T) {
    this.value = value;
  }
}

export default class LinkedList<T> {
  // protected  TS独有 表示子类可以访问，但其它类不能访问
  protected head: Node<T> | null = null;
  protected size: number = 0;
  protected tail: Node<T> | null = null; // 总是指向尾部
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

  // 判断是否为最后一个节点
  private isTail(node: Node<T>) {
    return this.tail === node;
  }

  // 追加节点
  append(value: T) {
    const newNode = new Node(value);
    if (!this.head) {
      // 第一次直接是头部
      this.head = newNode;
    } else {
      this.tail!.next = newNode; // 相当于指定上一个节点的next
    }
    this.tail = newNode;
    this.size++;

    // super.append(value) // 如果是继承可以这样调用父类方法
    // 将最后一个节点的next指向head
    this.tail!.next = this.head;
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
  // 插入方法
  insert(value: T, position: number): boolean {
    if (position < 0 || position > this.size) return false;
    const newNode = new Node(value);
    if (position === 0) {
      // 替换head
      newNode.next = this.head;
      this.head = newNode;
      this.tail!.next = this.head; // 插到头节点前，更新tail链接
    } else {
      let previous = this.getNode(position - 1);
      newNode.next = previous!.next;
      previous!.next = newNode;
      if (position === this.length) {
        // 正好插入在最后时，更新tail
        this.tail = newNode;
        this.tail.next = this.head; // 链接到头节点
      }
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
      this.tail!.next = this.head;
      if (this.length === 1) {
        // 正好只有一个节点且被删除
        this.tail = null;
      }
    } else {
      let previous = this.getNode(position - 1);
      current = previous!.next;
      previous!.next = previous?.next?.next ?? null;
      // 正好删除最后一个节点
      if (position === this.length - 1) {
        this.tail = previous;
        this.tail!.next = this.head; // 链接到头节点
      }
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

const cLinkedList = new LinkedList<string>();
cLinkedList.append('aaa');
cLinkedList.append('bbb');
cLinkedList.append('ccc');
cLinkedList.append('vvv');
cLinkedList.traverse(); // aaa->bbb->ccc->vvv->aaa

cLinkedList.insert('abc', 0);
cLinkedList.traverse(); // abc->aaa->bbb->ccc->vvv->abc
cLinkedList.insert('cba', 2);
cLinkedList.traverse(); // abc->aaa->cba->bbb->ccc->vvv->abc
cLinkedList.insert('nba', 6);
cLinkedList.traverse(); // abc->aaa->cba->bbb->ccc->vvv->nba->abc

cLinkedList.removeAt(0);
cLinkedList.traverse(); // aaa->cba->bbb->ccc->vvv->nba->aaa
cLinkedList.removeAt(2);
cLinkedList.traverse(); // aaa->cba->ccc->vvv->nba->aaa
cLinkedList.removeAt(4);
cLinkedList.traverse(); // aaa->cba->ccc->vvv->aaa

console.log(cLinkedList.get(0)); // aaa
console.log(cLinkedList.get(1)); // cba
console.log(cLinkedList.get(2)); // ccc

cLinkedList.update('***', 1);
cLinkedList.update('+++', 2);
cLinkedList.traverse(); // aaa->***->+++->vvv->aaa

console.log(cLinkedList.indexOf('vvv')); // 3
console.log(cLinkedList.indexOf('no')); // -1
