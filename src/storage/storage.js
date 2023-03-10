function setItem(name, item) {
  localStorage.setItem(name, JSON.stringify(item));
}

function getItem(name) {
  try {
    return JSON.parse(localStorage.getItem(name));
  } catch {
    localStorage.removeItem(name);
    return null;
  }
}

function clearItem(name) {
  localStorage.removeItem(name);
}

export { setItem, getItem, clearItem };
