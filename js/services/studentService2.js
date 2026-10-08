import {
  getStudentsFromStorage,
  saveStudentsToStorage,
  getthem,
  savathem,
} from "./storageService.js";
import { Student } from "../models/Student.js";

const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
////////////////////////////////
export async function loadteme() {
  await delay(1000);
  try {
    let theme = getthem();
    if (theme === null) {
      theme = "light";
      savathem("light");
    }
    return theme;
  } catch (error) {
    throw new Error("اطلاعات  تم قابل خواندن نیست");
  }
}
export async function changethem(them) {
  try {
    savathem(them);
    return them;
  } catch (error) {
    throw new Error("خطا در تقییر تم");
  }
}

//////////////////////////////
// دریافت دانشجوها
export async function loadStudents() {
  await delay(1000);

  try {
    let data = getStudentsFromStorage();
    console.log(data);
    if (data.length === 0) {
      const s1 = new Student(1, "ali", 25, "fdfhg", {
        midterm: 20,
        final: 20,
        activity: 20,
      });
      const s2 = new Student(2, "alireza", 26, "fdfdv", {
        midterm: 2,
        final: 2,
        activity: 2,
      });
      const s3 = new Student(3, "alimohammad", 27, "fgtg", {
        midterm: 15,
        final: 14,
        activity: 14,
      });
      const s4 = new Student(4, "mojtaba", 28, "tgrt", {
        midterm: 17,
        final: 18,
        activity: 19,
      });
      const s5 = new Student(5, "ahmad", 29, "gtdgt", {
        midterm: 12,
        final: 11,
        activity: 10,
      });
      data = [s1, s2, s3, s4, s5];
      console.log("hi");

      for (const s of data) {
        await addStudent(s);
      }
      console.log("hi");
    }

    return data.map(
      (student) =>
        new Student(
          student.id,
          student.name,
          student.age,
          student.course,
          student.scores,
        ),
    );
  } catch (error) {
    throw new Error("اطلاعات دانشجویان قابل خواندن نیست");
  }
}

// اضافه کردن دانشجو
export async function addStudent(student) {
  await delay(300);

  try {
    const students = getStudentsFromStorage();

    students.push(student);

    saveStudentsToStorage(students);

    return student;
  } catch (error) {
    throw new Error("خطا در ذخیره دانشجو");
  }
}

// حذف دانشجو
export async function deleteStudent(id) {
  await delay(300);

  try {
    const students = getStudentsFromStorage();

    const student = students.find((student) => student.id === id);

    if (!student) {
      throw new Error("دانشجو پیدا نشد");
    }

    const newStudents = students.filter((student) => student.id !== id);

    saveStudentsToStorage(newStudents);

    return newStudents;
  } catch (error) {
    throw new Error(error.message || "خطا در حذف دانشجو");
  }
}

//////// ویرایش دانشجو
export async function updateStudent(id, updatedData) {
  await delay(300);

  try {
    const students = getStudentsFromStorage();

    const index = students.findIndex((student) => student.id === id);

    if (index === -1) {
      throw new Error("دانشجو پیدا نشد");
    }

    students[index] = updatedData;

    saveStudentsToStorage(students);

    return updatedData;
  } catch (error) {
    throw new Error(error.message || "خطا در ویرایش دانشجو");
  }
}
