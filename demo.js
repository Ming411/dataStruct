class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  // valueOf 可以指定对象比较的规则
  valueOf() {
    return this.age;
  }
}

const p1 = new Person('张三', 18);
const p2 = new Person('李四', 19);
const p3 = new Person('王五', 18);

console.log(p1 > p2); // false
console.log(p1 < p2); //  true
console.log(p1 === p3); //  false  对象仍然不会相等
