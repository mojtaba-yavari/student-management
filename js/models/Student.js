import { Person } from "./Person.js";

export class Student extends Person {
  constructor(id, name, age, course, scores) {
    super(name, age);
    this.id = id;
    this.course = course;
    this.scores = scores;
    console.log(this.scores);
    this.average = 0;
    this.status = "";
    this.passed = false;

    this.updateResult();
  }

  calculateAverage() {
    const items = [
      { score: this.scores.midterm, weight: 0.3 },
      { score: this.scores.final, weight: 0.5 },
      { score: this.scores.activity, weight: 0.2 },
    ];

    let sum = 0;
    for (let i = 0; i < items.length; i++) {
      sum += items[i].score * items[i].weight;
    }

    this.average = Number(sum.toFixed(2));
    return this.average;
  }

  getStatus() {
    if (this.average >= 18) {
      this.status = "عالی";
    } else if (this.average >= 15) {
      this.status = "خوب";
    } else if (this.average >= 12) {
      this.status = "قابل قبول";
    } else {
      this.status = "مردود";
    }
    return this.status;
  }

  updateResult() {
    this.calculateAverage();
    this.getStatus();
    this.passed = this.average >= 12 ? "قبول" : "مردود";

    return this;
  }

  getFullInfo() {
    return {
      id: this.id,
      name: this.name,
      age: this.age,
      course: this.course,
      scores: { ...this.scores },
      average: this.average,
      status: this.status,
      passed: this.passed,
    };
  }
}
