const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-form input');
const todoList = document.querySelector('.todo-list');

let todos = [];

// 제출 시 리스트 추가
const onSubmit = (e) => {
  e.preventDefault();
  const li = document.createElement('li');
  const span = document.createElement('span');
  const btn = document.createElement('button');

  btn.addEventListener('click', onClickDel);

  span.innerHTML = todoInput.value;
  btn.innerHTML = 'X';

  li.appendChild(span);
  li.appendChild(btn);
  todoList.appendChild(li)

  todoInput.value = '';

}

const onClickDel = (e) => {
  const li = e.target.parentNode;
  todoList.removeChild(li);

}

todoForm.addEventListener('submit', onSubmit);