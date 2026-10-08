const STORAGE_KEY = "students";
const THEME = "THEME";

export function getStudentsFromStorage() {
  let data = localStorage.getItem(STORAGE_KEY);
  console.log(data);

  if (!data) {
    return [];
  }

  return JSON.parse(data);
}
export function getthem() {
  let them = localStorage.getItem(THEME);
  return JSON.parse(them);
}
export function savathem(theme) {
  localStorage.setItem(THEME, JSON.stringify(theme));
}
export function saveStudentsToStorage(students) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

export function removeStudentsFromStorage() {
  localStorage.removeItem(STORAGE_KEY);
}
