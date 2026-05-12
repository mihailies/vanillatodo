// todos list is Array
let todosSaved = [
  { id: crypto.randomUUID(), text: 'one task', done: false },
  { id: crypto.randomUUID(), text: '3 one task', done: true },
  { id: crypto.randomUUID(), text: '4 one task', done: false },
];

let todosActive;
let todosDone;

let bodyOnLoadPromise = new Promise((resolve) => {
  document.body.onload = () => {
    resolve('loaded');
  };
});

(async () => {
  await bodyOnLoadPromise.then((val) => console.log(val));
  todosActive = document.getElementById('todos_active');
  todosDone = document.getElementById('todos_done');
  for (let todo of todosSaved) {
    newTodo(todo, todo.done ? todosDone : todosActive);
  }
})();

function newTodo(todoData, container) {
  if (todoData == undefined) {
    todoData = { id: crypto.randomUUID() };
    container = todosActive;
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
  });

  let todoText = document.createElement('input');
  Object.assign(todoText, {
    name: 'Text',
    value: todoData.text != undefined ? todoData.text : '',
    type: 'text',
    onchange: (evt) => {
      changeTodoText(evt.target.dataId, evt.target.value);
    },
  });

  let deleteButton = document.createElement('button');
  Object.assign(deleteButton, {
    dataId: todoData.id,
    innerHTML: 'x',
    onclick: () => {
      deleteTodo(todoData.id);
    },
  });
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

function deleteTodo(id) {
  todosSaved = todosSaved.filter((el) => el.id != id);
  console.log(document.querySelector('[data-id="' + id + '"]'));
  let nodeToDelete = document.querySelector('[data-id="' + id + '"]');
  nodeToDelete.remove();
}
// function redrawList() {
//   todosActive = document.getElementById('todos_active');
//   todosDone = document.getElementById('todos_done');

//   for (let todo of todosSaved) {
//     newTodo(todo, todo.done ? todosDone : todosActive);
//   }
// }
