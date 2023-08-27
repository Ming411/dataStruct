// 从1开始数数，每次数到3的淘汰
import ArrayQueue from './arrayQueue';
function hotPotato(names: string[], num: number) {
  const queue = new ArrayQueue<string>();
  // 入列操作
  for (const name of names) {
    queue.enqueue(name);
  }
  while (queue.size > 1) {
    for (let i = 1; i < num; i++) {
      const name = queue.dequeue(); // 1 or 2 出列入列
      if (name) queue.enqueue(name);
    }
    queue.dequeue(); // 3 淘汰
  }
  return queue.dequeue();
}
const list = ['ccc', 'coder', 'origin'];
console.log(hotPotato(list, 3));
