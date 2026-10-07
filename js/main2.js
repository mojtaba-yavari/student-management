import {
  addStudent,
  loadStudents,
  updateStudent,
  deleteStudent,
} from "./services/studentService2.js";
import {
  Validation_name,
  Validation_age,
  Validation_course,
  Validation_score,
} from "./utils/validation.js";
import { Student } from "./models/Student.js";

let editingId = null;
const btn_submit = document.querySelector(".btn-submit");

const form_add = document.getElementById("add-student-section");
const form = document.getElementById("student-form");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const age = document.getElementById("age");
const course = document.getElementById("course");
const midterm = document.getElementById("midterm");
const final = document.getElementById("final");
const activity = document.getElementById("activity");
const details_modal = document.getElementById("details-modal");
const Delay = document.getElementById("Delay");
const success = document.getElementById("Success");

let students = [];
let s1 = [];

const students_list = document.getElementById("students-list");
const students_count = document.getElementById("students-count");
const empty_message = document.getElementById("empty-message");
const allstudents = document.getElementById("allstudents");

const accepted = document.getElementById("Accepted");
const rejected = document.getElementById("Rejected");
const maxscor = document.getElementById("maxscor");
const Average = document.getElementById("ave");

function cheackdasbord() {
  allstudents.textContent = students.length;
  let max = 0;
  let aveg = 0;
  let acc = 0;
  let rej = 0;
  students.forEach((s) => {
    s.passed === "قبول" ? acc++ : rej++;
    if (s.average > max) {
      max = s.average;
    }
    aveg += s.average;
  });
  accepted.textContent = acc;
  rejected.textContent = rej;
  maxscor.textContent = max;
  Average.textContent = students.length
    ? (aveg / students.length).toFixed(2)
    : "0";
}

function cheakvalue() {
  if (
    !Validation_name(firstName.value) ||
    !Validation_name(lastName.value) ||
    !Validation_age(age.value) ||
    !Validation_course(course.value) ||
    !Validation_score(midterm.value) ||
    !Validation_score(final.value) ||
    !Validation_score(activity.value)
  ) {
    return false;
  }
  return true;
}

async function startApp() {
  try {
    Delay.classList.remove("hidden");
    students = await loadStudents();
    s1 = students;

    cheackdasbord();

    // renderStudents(students);
    pagination(students);
  } catch (error) {
    console.error(error);
    alert(error.message);
  } finally {
    Delay.classList.add("hidden");
  }
}

function renderStudents(st) {
  students_list.innerHTML = "";

  st.forEach((student) => {
    const card = document.createElement("div");

    card.className = "student-card";

    card.innerHTML = `
  <h3>${student.name}</h3>

  <p>سن: ${student.age}</p>
  <p>درس: ${student.course}</p>
  <p>میانگین: ${student.average}</p>
  <p>وضعیت: ${student.status}</p>

  <button class="btn-edit" data-id="${student.id}">
    ویرایش
  </button>

  <button class="btn-delete" data-id="${student.id}">
    حذف
  </button>
      <button class="btn-details"  data-id="${student.id}">
      نمایش جزئیات
      </button>

`;

    students_list.appendChild(card);

    const editButton = card.querySelector(".btn-edit");

    editButton.addEventListener("click", () => {
      handleEditStudent(student.id);
    });

    const deleteButton = card.querySelector(".btn-delete");

    deleteButton.addEventListener("click", () => {
      handleDeleteStudent(student.id);
    });

    const detailsButton = card.querySelector(".btn-details");

    detailsButton.addEventListener("click", () => {
      handledetailsStudent(student.id);
    });
  });
  students_count.textContent = st.length;
  cheackdasbord();
  Chart();

  if (st.length === 0) {
    empty_message.classList.remove("hidden");
  } else {
    empty_message.classList.add("hidden");
  }
}

startApp();

async function handleAddStudent(event) {
  event.preventDefault();
  if (cheakvalue()) {
    const name = `${firstName.value.trim()} ${lastName.value.trim()}`;

    const student = new Student(
      editingId ?? Date.now(),
      name,
      Number(age.value),
      course.value.trim(),
      {
        midterm: Number(midterm.value),
        final: Number(final.value),
        activity: Number(activity.value),
      },
    );

    try {
      if (editingId === null) {
        await addStudent(student);

        students.push(student);

        randtext("دانشجو با موفقیت ثبت شد");
      } else {
        await updateStudent(editingId, student);

        const index = students.findIndex((student) => student.id === editingId);

        students[index] = student;

        editingId = null;

        btn_submit.textContent = "ثبت دانشجو";

        randtext("اطلاعات دانشجو با موفقیت ویرایش شد");
      }

      // renderStudents(students);
      pagination(students);

      form.reset();
    } catch (error) {
      alert(error.message);
    }
  }
}

function randtext(text) {
  success.classList.remove("hidden");
  form_add.classList.add("hidden");

  success.textContent = text;
  setTimeout(() => {
    success.classList.add("hidden");
    form_add.classList.remove("hidden");
  }, 5000);
}

form.addEventListener("submit", handleAddStudent);

async function handleDeleteStudent(id) {
  const student = students.find((student) => student.id === id);

  if (!student) {
    alert("دانشجو پیدا نشد");

    return;
  }

  const confirmed = confirm(`آیا از حذف ${student.name} مطمئن هستید؟`);

  if (!confirmed) {
    return;
  }

  try {
    await deleteStudent(id);

    students = students.filter((student) => student.id !== id);

    // renderStudents(students);
    pagination(students);

    alert("دانشجو با موفقیت حذف شد");
  } catch (error) {
    alert(error.message);
  }
}

function handleEditStudent(id) {
  const student = students.find((student) => student.id === id);

  if (!student) {
    alert("دانشجو پیدا نشد");

    return;
  }

  const nameParts = student.name.split(" ");

  firstName.value = nameParts[0] || "";
  lastName.value = nameParts.slice(1).join(" ");

  age.value = student.age;
  course.value = student.course;

  midterm.value = student.scores.midterm;
  final.value = student.scores.final;
  activity.value = student.scores.activity;

  editingId = id;

  btn_submit.textContent = "ویرایش دانشجو";

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

async function handledetailsStudent(id) {
  const student = students.find((student) => student.id === id);

  if (!student) {
    alert("دانشجو پیدا نشد");
    return;
  }
  let st = student.getFullInfo();

  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
                    <p>نام: ${st.name}</p>
                    <p>سن: ${st.age}</p>
                    <p>درس :${st.course}</p>
                    <p> میان ترم : ${st.scores.midterm}</p>
                    <p> پایان ترم : ${st.scores.final}</p>
                    <p> فعالیت: ${st.scores.activity}</p>
                    <p> میانگین : ${st.average}</p>
                    <p> وضعیت : ${st.status}</p>
                    <p> پاس : ${st.passed}</p>

                    `;
  details_modal.hidden = false;
}

document.getElementById("modal-close").addEventListener("click", function (e) {
  details_modal.hidden = true;
});

/////////////////
const search_input = document.getElementById("search-input");
const filter_status = document.getElementById("filter-status");
const sortValue = document.getElementById("sort-grade");

function applyFilters() {
  const tar = search_input.value.trim().toLowerCase();
  const status = filter_status.value;
  let visibleCount = 0;
  let st = [];

  students.forEach((s) => {
    const nameMatch = !tar || s.name.toLowerCase().includes(tar);
    const statusMatch = status === "all" || s.status === status;
    const match = nameMatch && statusMatch;

    if (match) {
      st.push(s);
      visibleCount++;
    }
  });

  if (sortValue.value !== "none") {
    sortCards(st);
  }
  // renderStudents(st);
  pagination(st);

  if (students.length === 0 || visibleCount === 0) {
    empty_message.classList.remove("hidden");
  } else {
    empty_message.classList.add("hidden");
  }
}

function sortCards(st) {
  st.sort((a, b) => {
    const avgA = Number(a.average);
    const avgB = Number(b.average);

    return sortValue.value === "desc" ? avgB - avgA : avgA - avgB;
  });
}

search_input.addEventListener("input", applyFilters);

filter_status.addEventListener("change", applyFilters);

sortValue.addEventListener("change", applyFilters);

//////////////////
//////////
///////////////
const studentsPerPage = 5;
const next_page = document.getElementById("next-page");
const prev_page = document.getElementById("prev-page");
let currentPage = 1;
let x = 0;
let sty = [];

function pagination(st) {
  const number = st.length;
  x = Math.ceil(number / 5);
  sty = st;
  let s = [];
  for (let i = 0; i < 5; i++) {
    if (st[i]) {
      s.push(st[i]);
    }
  }
  currentPage = 1;
  renderStudents(s);
}

function nextpage(st) {
  if (currentPage != x) {
    console.log("hi");
    let s = [];
    for (let i = currentPage * 5; i < currentPage * 5 + 5; i++) {
      if (st[i]) {
        s.push(st[i]);
      }
    }
    currentPage++;
    renderStudents(s);
  }
}
function prevpage(st) {
  if (currentPage != 1) {
    console.log("hi");
    let s = [];
    for (let i = (currentPage - 1) * 5 - 5; i < (currentPage - 1) * 5; i++) {
      if (st[i]) {
        s.push(st[i]);
      }
    }
    currentPage--;
    renderStudents(s);
  }
}
next_page.addEventListener("click", () => nextpage(sty));
prev_page.addEventListener("click", () => prevpage(sty));

///////////
let mybutton = document.getElementById("myBtn");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  console.log("hi");
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

mybutton.addEventListener("click", () => topFunction());

/////////////////////
let al = document.querySelector(".al");
let ga = document.querySelector(".ga");
let kh = document.querySelector(".kh");
let mr = document.querySelector(".mr");

function Chart() {
  let ali = 0;
  let gai = 0;
  let khi = 0;
  let mri = 0;

  console.log("hi");
  students.forEach((s) => {
    switch (s.getStatus()) {
      case "عالی":
        ali++;
        break;
      case "خوب":
        khi++;
        break;
      case "قابل قبول":
        gai++;
        break;
      case "مردود":
        mri++;
        break;
    }
  });
  let len = students.length;
  al.textContent = `${(ali / len) * 100}%`;
  ga.textContent = `${(gai / len) * 100}%`;
  kh.textContent = `${(khi / len) * 100}%`;
  mr.textContent = `${(mri / len) * 100}%`;
  //////////
  al.style.width = `${(ali / len) * 100}%`;
  ga.style.width = `${(gai / len) * 100}%`;
  kh.style.width = `${(khi / len) * 100}%`;
  mr.style.width = `${(mri / len) * 100}%`;
}
