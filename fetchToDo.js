async function fetchToDo() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const json = await response.json();
  return json;
}

module.exports = fetchToDo;
