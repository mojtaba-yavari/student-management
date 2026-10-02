const STORAGE_KEY = "students";

export function getStudentsFromStorage() {
  let data = localStorage.getItem(STORAGE_KEY);
  console.log(data);

  if (!data) {
    return [];
  }

  return JSON.parse(data);
}

export function saveStudentsToStorage(students) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

export function removeStudentsFromStorage() {
  localStorage.removeItem(STORAGE_KEY);
}
