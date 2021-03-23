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

  span.addEventListener('click', onClickDone);
  btn.addEventListener('click', onClickDel);

  span.innerHTML = todoInput.value;
  btn.innerHTML = 'X';

  li.appendChild(span);
  li.appendChild(btn);
  todoList.appendChild(li)

  id = new Date();
  id = id.getTime();

  li.id = id;

  const obj = {
    text: todoInput.value,
    id,
    done: false,
  }

  todos.push(obj);
  console.log(todos)

  todoInput.value = '';

}

// X버튼 클릭 시 요소 제거
const onClickDel = (e) => {
  const li = e.target.parentNode;
  todoList.removeChild(li);

  todos = todos.filter(item => item.id !== parseInt(li.id, 10))
  console.log(todos)
}

// 요소 클릭시 선 긋기
const onClickDone = (e) => {
  const li = e.target.parentNode;
  const span = e.target;
  const todoIndex = todos.findIndex(item => item.id == parseInt(li.id, 10))
  if (span.style.textDecoration == 'line-through') {
    span.style.textDecoration = 'none';
    todos[todoIndex].done = false;
  } else {
    span.style.textDecoration = 'line-through';
    todos[todoIndex].done = true;
  }
  console.log(todos);
}

todoForm.addEventListener('submit', onSubmit);