const todoForm = document.querySelector(".js-todo-form");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector(".js-todo-list");

const TODO_STORAGE = "TODO_STORAGE";
let List = [];
let text = "";

function saveList() {
  localStorage.setItem(TODO_STORAGE, JSON.stringify(List));
}

function deleteTodo(e) {
  const btn = e.target;
  const li = btn.parentNode;
  todoList.removeChild(li);
  const cleanToDos = List.filter((v) => v.id !== parseInt(li.id));
  List = cleanToDos;
  saveList();
}

function toggleTodo(e) {
  const btn = e.target;
  const li = btn.parentNode;
  const toggledToDos = List.map((v) =>
    v.id === parseInt(li.id) ? { ...v, done: !v.done } : v
  );

  List = toggledToDos;
  saveList();
  console.log(List[0]);
  List[parseInt(li.id) - 1].done
    ? (btn.className = "far fa-check-circle")
    : (btn.className = "far fa-circle");
}

function makeList(text, done) {
  const li = document.createElement("li");
  const delBtn = document.createElement("i");
  delBtn.className = "far fa-trash-alt";
  delBtn.addEventListener("click", deleteTodo);
  const todoItem = document.createElement("span");
  todoItem.innerText = text;
  const checkBtn = document.createElement("i");

  if (done) {
    checkBtn.className = "far fa-check-circle";
  }
  if (!done) {
    checkBtn.className = "far fa-circle";
  }
  checkBtn.addEventListener("click", toggleTodo);
  li.appendChild(checkBtn);
  li.appendChild(todoItem);
  li.appendChild(delBtn);
  todoList.appendChild(li);
  const newid = List.length + 1;
  li.id = newid;
  const currentTodo = {
    id: newid,
    text: text,
    done: done ? true : false,
  };
  const currentList = List.concat(currentTodo);
  List = currentList;
  saveList();
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODO_STORAGE);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (v) {
      makeList(v.text, v.done);
    });
  }
}

function onSubmit(e) {
  e.preventDefault();
  makeList(todoInput.value);
  todoInput.value = "";
}

function init() {
  loadToDos();
  todoForm.addEventListener("submit", onSubmit);
}

init();
