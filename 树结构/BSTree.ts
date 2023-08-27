import {btPrint} from 'hy-algokit';
class INode<T> {
  value: T;
  constructor(value: T) {
    this.value = value;
  }
}
class TreeNode<T> extends INode<T> {
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;
  parent: TreeNode<T> | null = null;
  // 判断该节点是否为左节点
  get isLeft(): boolean {
    return !!(this.parent && this.parent.left === this);
  }
  get isRight(): boolean {
    return !!(this.parent && this.parent.right === this);
  }
}
class BSTree<T> {
  private root: TreeNode<T> | null = null;
  print() {
    // console.log(this.root);
    btPrint(this.root);
  }
  // 插入数据的操作
  insert(value: T) {
    const newNode = new TreeNode(value);
    // 当前树为空
    if (!this.root) {
      this.root = newNode;
    } else {
      // 树中不为空
      this.insertNode(this.root, newNode);
    }
  }
  // 如何插入
  private insertNode(node: TreeNode<T>, newNode: TreeNode<T>) {
    if (newNode.value < node.value) {
      // 插到左边
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      // 插到右边
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }
  /* ============== 先序遍历 ============== */
  preOderTraverse() {
    this.preOderTraverseNode(this.root);
  }
  private preOderTraverseNode(node: TreeNode<T> | null) {
    if (node) {
      console.log(node.value);
      this.preOderTraverseNode(node.left);
      // 会逐级返回回去
      this.preOderTraverseNode(node.right);
    }
  }
  /* ============== 中序遍历 ============== */
  inOrderTraverse() {
    this.inOrderTraverseNode(this.root);
  }
  private inOrderTraverseNode(node: TreeNode<T> | null) {
    if (node) {
      this.inOrderTraverseNode(node.left);
      console.log(node.value);
      this.inOrderTraverseNode(node.right);
    }
  }
  /* ============== 后序遍历(根节点为最后一个) ============== */
  postOrderTraverse() {
    this.postOrderTraverseNode(this.root);
  }
  private postOrderTraverseNode(node: TreeNode<T> | null) {
    if (node) {
      this.postOrderTraverseNode(node.left);
      this.postOrderTraverseNode(node.right);
      console.log(node.value);
    }
  }
  /* ============== 层序遍历(利用队列结构) ============== */
  levelOrderTraverse() {
    if (!this.root) return;
    const queue: TreeNode<T>[] = [];
    queue.push(this.root); // 第一个节点是根节点

    // 遍历队列中的节点 并出队 随之将其左右节点入列
    while (queue.length) {
      const current = queue.shift()!; // 删除第一个
      console.log(current.value);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
  }
  /* ============== 获取最大值/最小值 ============== */
  getMaxValue(): T | null {
    let current = this.root;
    while (current && current.right) {
      current = current.right;
    }
    return current?.value ?? null;
  }
  getMinValue(): T | null {
    let current = this.root;
    while (current && current.left) {
      current = current.left;
    }
    return current?.value ?? null;
  }
  /* ============== 搜索节点 ============== */
  private searchNode(value: T): TreeNode<T> | null {
    let current = this.root;
    let parent: TreeNode<T> | null = null;
    while (current) {
      // 找到对应node直接返回
      if (current.value === value) return current;
      parent = current; // 保存上个节点
      if (current.value < value) {
        current = current.right;
      } else {
        current = current.left;
      }
      if (current) current.parent = parent;
    }
    return null;
  }
  /* ============== 搜索特定的值是否存在 ============== */
  search(value: T): boolean {
    return !!this.searchNode(value);
  }
  /* 获取后继节点 */
  private getSuccessor(delNode: TreeNode<T>): TreeNode<T> {
    // 获取右子树的最小节点
    let current = delNode.right;
    let successor: TreeNode<T> | null = null;
    while (current) {
      successor = current;
      current = current.left;
      if (current) {
        current.parent = successor;
      }
    }
    // 找到后继节点
    // console.log('删除节点:', delNode.value, '后继节点:', successor!.value);
    if (successor !== delNode.right) {
      successor!.parent!.left = successor!.right;
      successor!.right = delNode.right;
    }
    successor!.left = delNode.left;
    return successor!;
  }
  /* ============== 删除操作(后代节点是不会被删除的) ============== */
  remove(value: T): boolean {
    const current = this.searchNode(value);
    if (!current) return false;

    let replaceNode: TreeNode<T> | null = null;

    // 1. 删除叶子节点(没有子节点)
    if (current.left === null && current.right === null) {
      replaceNode = null;
    }
    // 2. 有且只有一个左子节点
    else if (current.right === null) {
      replaceNode = current.left;
    }
    // 3. 有且只有一个右子节点
    else if (current.left === null) {
      replaceNode = current.right;
    }
    // 4. 有两个子节点的情况
    /* 前驱节点(左子节点最大节点)或者后继节点(右子树中最小节点) */
    else {
      const successor = this.getSuccessor(current);
      replaceNode = successor;
    }
    if (current === this.root) {
      this.root = replaceNode;
    } else if (current.isLeft) {
      current.parent!.left = replaceNode;
    } else {
      current.parent!.right = replaceNode;
    }

    return true;
  }
}
// 二叉搜索树
const bst = new BSTree<number>();
bst.insert(11);
bst.insert(7);
bst.insert(15);
bst.insert(5);
bst.insert(3);
bst.insert(9);
bst.insert(8);
bst.insert(10);
bst.insert(13);
bst.insert(12);
bst.insert(14);
bst.insert(20);
bst.insert(18);
bst.insert(25);
bst.insert(6);
bst.print();
// bst.preOderTraverse();
// bst.inOrderTraverse();
// bst.postOrderTraverse();
// bst.levelOrderTraverse();
// console.log(bst.getMaxValue());
// console.log(bst.getMinValue());
// console.log(bst.search(13));
// console.log(bst.search(199));
bst.remove(11);
// bst.remove(15);
bst.print();
