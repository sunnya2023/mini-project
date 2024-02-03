// const todoForm = document.getElementById("todo-form");
// const todoInput = todoForm.querySelector("input");
// const toDoList = document.getElementById("todo-list");

// let toDos = [];

// function saveToDo() {
//   localStorage.setItem("todos", JSON.stringify(toDos));
// }

// function deleteToDo(e) {
//   //   console.dir(e.target.parentElement.textContent);
//   const li = e.target.parentElement;
//   li.remove();
// }

// function paintToDo(newTodo) {
//   //   console.log("I will paint...", newTodo);
//   const li = document.createElement("li");
//   const span = document.createElement("span");
//   span.textContent = newTodo;
//   const button = document.createElement("button");
//   button.textContent = "❌";

//   button.addEventListener("click", deleteToDo);
//   li.appendChild(span);
//   li.appendChild(button);
//   toDoList.appendChild(li);
//   //   console.log(li);
// }

// function handleToDoSubmit(e) {
//   e.preventDefault();
//   //   console.log(todoInput.value);
//   const newTodo = todoInput.value;
//   todoInput.value = " ";
//   toDos.push(newTodo);
//   paintToDo(newTodo);
//   saveToDo();
// }

// todoForm.addEventListener("submit", handleToDoSubmit);

// const savedToDos = localStorage.getItem("todos");
// console.log(savedToDos);

// if (savedToDos !== null) {
//   const parsedToDos = JSON.parse(savedToDos);
//   toDos = parsedToDos;
//   parsedToDos.forEach(paintToDo);
// }

const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

let toDos = [];
const TODOS_KEY = "todolist";

function deletTodo(e) {
  const chosenLi = e.target.parentElement;
  console.log(chosenLi);
  chosenLi.remove();
  toDos = toDos.filter((item) => item.id !== parseInt(chosenLi.id));
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function showTodo(newTodoObj) {
  const li = document.createElement("li");
  todoList.appendChild(li);
  li.id = newTodoObj.id;
  const span = document.createElement("span");
  li.appendChild(span);
  span.textContent = newTodoObj.text;
  const button = document.createElement("button");
  li.appendChild(button);
  button.textContent = "❌";

  button.addEventListener("click", deletTodo);
}

function onSubmit(e) {
  e.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  showTodo(newTodoObj);
  saveToDos();
}

todoForm.addEventListener("submit", onSubmit);

const getTodos = localStorage.getItem(TODOS_KEY);

if (getTodos !== null) {
  const parseTodos = JSON.parse(getTodos);
  toDos = parseTodos;
  toDos.forEach(showTodo);
}
