class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

/* function reverseList(head: ListNode | null): ListNode | null {
  // 1 为空
  if (head === null) return null;
  // 2 只有一个head
  if (head.next === null) return head;

  // 使用栈结构来实现(数组)
  const stack: ListNode[] = [];
  let current: ListNode | null = head;
  while (current) {
    stack.push(current);
    current = current.next;
  }
  // 从栈结构中取出元素
  const newHead: ListNode = stack.pop()!;
  let newHeadCurrent: ListNode = newHead;
  while (stack.length) {
    const node = stack.pop()!;
    newHeadCurrent.next = node;
    newHeadCurrent = node;
  }
  // 清除最后一次引用
  newHeadCurrent.next = null;
  return newHead;
} */

/* function reverseList(head: ListNode | null): ListNode | null {
  // 1 为空 或者 next为空
  if (head === null || head.next === null) return head;
  let newHead: ListNode | null = null;
  // 妙不可言
  while (head) {
    const current: ListNode | null = head.next; // 缓存head的next
    head.next = newHead; // 将head的next置为空
    newHead = head;
    head = current;
  }
  return newHead;
} */

function reverseList(head: ListNode | null): ListNode | null {
  // 1 为空 或者 next为空
  if (head === null || head.next === null) return head;

  const newHead = reverseList(head.next ?? null);

  // 第一次来到这里是倒数第二个节点
  head.next.next = head;
  head.next = null;

  return newHead;
}

const node1 = new ListNode(1);
node1.next = new ListNode(2);
node1.next.next = new ListNode(3);

const newHead = reverseList(node1);
let current = newHead;
while (current) {
  console.log(current.val);
  current = current.next;
}
