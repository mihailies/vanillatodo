'use strict';
const LOCAL_STORAGE_ID = 'my_todos';

let todosActiveContainerDiv;
let todosDoneContainerDiv;
let todosSaved = [];

let bodyOnLoadPromise = new Promise((resolve) => {
  document.addEventListener('DOMContentLoaded', () => {
    resolve('loaded');
  });
});

(async () => {
  await bodyOnLoadPromise.then((val) => console.log(val));
  todosActiveContainerDiv = document.getElementById('todos_active');
  todosDoneContainerDiv = document.getElementById('todos_done');

  loadFromLocalStorage();

  for (let todo of todosSaved) {
    newTodo(todo, todo.done ? todosDoneContainerDiv : todosActiveContainerDiv);
  }
})();

function newTodo(todoData, container) {
  if (todoData == undefined) {
    todoData = { id: crypto.randomUUID(), done: false };
    todosSaved.unshift(todoData);
    container = todosActiveContainerDiv;
    saveToLocalStorage();
  }

  let newTodo = document.createElement('div');
  newTodo.dataset.id = todoData.id;
  Object.assign(newTodo, {
    className: 'todo_style',
  });

  let checkBox = document.createElement('input');
  Object.assign(checkBox, {
    dataId: todoData.id,
    type: 'checkbox',
    checked: todoData.done ? true : false,
    onchange: () => setDoneTodo(todoData.id),
  });

  let todoText = document.createElement('input');
  Object.assign(todoText, {
    placeholder: "what's the task ?",
    name: 'Text',
    value: todoData.text != undefined ? todoData.text : '',
    type: 'text',
    onchange: (evt) => {
      changeTodoText(evt.target.dataset.id, evt.target.value);
    },
  });
  todoText.dataset.id = todoData.id;

  let deleteButton = document.createElement('button');
  Object.assign(deleteButton, {
    innerHTML: 'x',
    onclick: () => {
      deleteTodo(todoData.id);
    },
  });
  deleteButton.dataset.id = todoData.id;
  newTodo.appendChild(checkBox);
  newTodo.appendChild(todoText);
  newTodo.appendChild(deleteButton);

  // /  console.log(newTodo);
  if (container) {
    container.append(newTodo);
  } else {
    console.error('No container for todo');
  }
}

function changeTodoText(id, value) {
  todosSaved.find((todo) => todo.id == id).text = value;
}

function setDoneTodo(id) {
  // debugger;
  let todo = todosSaved.find((todo) => todo.id == id);
  todo.done = !todo.done;
  let todoNode = document.querySelector(`[data-id="${id}"]`);
  if (todo.done) {
    todosDoneContainerDiv.appendChild(todoNode);
  } else {
    todosActiveContainerDiv.appendChild(todoNode);
  }
  saveToLocalStorage();
}

function deleteTodo(id) {
  todosSaved = todosSaved.filter((el) => el.id != id);
  console.log(document.querySelector(`[data-id="${id}"]`));
  let nodeToDelete = document.querySelector('[data-id="' + id + '"]');
  nodeToDelete.remove();
  saveToLocalStorage();
}

// function redrawList() {
//   todosActive = document.getElementById('todos_active');
//   todosDone = document.getElementById('todos_done');

//   for (let todo of todosSaved) {
//     newTodo(todo, todo.done ? todosDone : todosActive);
//   }
// }

function loadFromLocalStorage() {
  todosSaved = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_ID)) || [];
  console.log(todosSaved);
}
function saveToLocalStorage() {
  window.localStorage.setItem(LOCAL_STORAGE_ID, JSON.stringify(todosSaved));
}

let color = 'blue';
function getChangeColor() {
  let color = 'red';
  return function () {
    console.log(this);
    console.log(color);
  };
}

let changeColor = getChangeColor();
changeColor();

console.log('1');
setTimeout(() => {
  console.log('3');
}, 0);
Promise.resolve().then(() => {
  console.log('2');
});

console.log('4');
