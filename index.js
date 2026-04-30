let todosSaved = [
  { text: 'one task', done: false },
  { text: '3 one task', done: true },
  { text: '4 one task', done: false },
];

(() => {
  let todos = document.getElementById('todos');
  for (let todo of todosSaved) {
    console.log(todo);
    newTodo(todo);
  }
})();

function newTodo(todoData) {
  todoData = todoData || {};

  // console.log(todoData);

  let todos = document.getElementById('todos');
  let newTodo = document.createElement('div');
  Object.assign(newTodo, {
    className: 'todo_style',
  });

  let checkBox = document.createElement('input');
  Object.assign(checkBox, {
    type: 'checkbox',
    checked: todoData.done ? true : false,
  });

  let todoText = document.createElement('input');
  Object.assign(todoText, {
    value: todoData.text != undefined ? todoData.text : '',
    type: 'text',
  });

  let deleteButton = document.createElement('button');
  Object.assign(deleteButton, {
    innerHTML: 'x',
    onclick: () => {
      console.log('Delete me me me');
    },
  });
  newTodo.appendChild(checkBox);
  newTodo.appendChild(todoText);
  newTodo.appendChild(deleteButton);

  // /  console.log(newTodo);
  todos.append(newTodo);
}
