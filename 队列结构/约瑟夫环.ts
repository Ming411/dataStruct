/**
 * 人们站在一个等待被处决的圈子里。
 * 计数从圆圈中的指定点开始，并沿指定方向围绕圆圈进行。
 * 在跳过指定数量的人之后，处刑下一个人。
 * 对剩下的人重复该过程，从下一个人开始，朝同一方向跳过相同数量的人，
 * 直到只剩下一个入，并被释放。
 * 在给定数量的情况下，站在第几个位置可以避免被处决？
 *
 * 0,1,...,n-1这n个数字排成一个圆圈
 * 从数字0开始 每次从这个圆圈里删除第个数字（删除后从下一个数字开始计数）。
 * 求出这个圆圈里剩下的最后一个数字。
 */
import ArrayQueue from './arrayQueue';

function lastRemaining(n: number, m: number) {
  const queue = new ArrayQueue<number>();
  for (let i = 0; i < n; i++) {
    queue.enqueue(i);
  }
  while (queue.size > 1) {
    for (let i = 1; i < m; i++) {
      // 不符合的 出列并重新入列
      queue.enqueue(queue.dequeue()!);
    }
    // 符合的出列
    queue.dequeue();
  }
  // 最后一个幸存者
  return queue.dequeue();
}
console.log(lastRemaining(5, 3));
console.log(lastRemaining(10, 17));
