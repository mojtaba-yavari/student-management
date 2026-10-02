export class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  getInfo() {
    return `نام : ${this.name}- سن : ${this.age}`;
  }
}
