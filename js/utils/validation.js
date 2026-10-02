const form_message = document.getElementById("form-message");

function err(eroor) {
  form_message.classList.remove("hidden");
  form_message.textContent = eroor;
}

export function Validation_name(name) {
  form_message.classList.add("hidden");

  if (name.trim() === "") {
    err("لطفا نام دانشجو را کامل وراد کنید");
    return false;
  }
  if (name.trim().length < 3) {
    err("نام و نام خانوادگی باید حداقل 3 کاراکتر باشد ");
    return false;
  }
  return true;
}

export function Validation_age(age) {
  form_message.classList.add("hidden");

  if (isNaN(age) || age.trim() === "") {
    err("عدد وارد کنید ");
    return false;
  }
  if (age < 15 || age > 100) {
    err("سن باید بین ۱۵ تا ۱۰۰ باشد");
    return false;
  }
  return true;
}

export function Validation_course(course) {
  form_message.classList.add("hidden");

  if (course.trim() === "") {
    err(" لطفاً نام درس را وارد کنید");
    return false;
  }
  return true;
}

export function Validation_score(score) {
  form_message.classList.add("hidden");

  if (isNaN(score) || score.trim() === "") {
    err("لطفاً عدد وارد کنید");
    return false;
  }
  const num = Number(score);
  if (num < 0 || num > 20) {
    err("نمره باید بین ۰ تا ۲۰ باشد");
    return false;
  }
  return true;
}
