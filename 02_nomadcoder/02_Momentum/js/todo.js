const todoForm = document.getElementById("todo-form");
const todoInput = todoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

let toDos = [];

function saveToDo() {
  localStorage.setItem("todos", JSON.stringify(toDos));
}

function deleteToDo(e) {
  //   console.dir(e.target.parentElement.textContent);
  const li = e.target.parentElement;
  li.remove();
}

function paintToDo(newTodo) {
  //   console.log("I will paint...", newTodo);
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = newTodo;
  const button = document.createElement("button");
  button.textContent = "❌";

  button.addEventListener("click", deleteToDo);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
  //   console.log(li);
}

function handleToDoSubmit(e) {
  e.preventDefault();
  //   console.log(todoInput.value);
  const newTodo = todoInput.value;
  todoInput.value = " ";
  toDos.push(newTodo);
  paintToDo(newTodo);
  saveToDo();
}

todoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem("todos");
console.log(savedToDos);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
