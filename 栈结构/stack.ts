/**
 * 利用数组封装一个栈结构
 * push 添加一个新的元素放到栈顶的位置
 * pop  移除栈顶位置的元素，同时并返回删除的元素
 * peek 仅返回栈顶的元素
 * isEmpty 如果栈为空返回true 否则返回false
 * size 返回栈内的元素个数
 */
export interface IStack<T> {
  push(element: T): void;
  pop(): T | undefined;
  peek(): T | undefined;
  isEmpty(): boolean;
  size(): number;
}

// implements IStack<T> 用于实现接口
export default class Stack<T> implements IStack<T> {
  private data: T[] = [];
  constructor() {}
  push(element: T): void {
    this.data.push(element);
  }
  pop(): T | undefined {
    return this.data.pop();
  }
  peek(): T | undefined {
    return this.data[this.data.length - 1];
  }
  isEmpty(): boolean {
    return !this.data.length ? true : false;
  }
  size(): number {
    return this.data.length;
  }
}

// const stack1 = new Stack<string>();
// stack1.push('noCoder');
// console.log(stack1.peek());
