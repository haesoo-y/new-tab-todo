const localTODO = "localtodo";

const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-form input');
const todoList = document.querySelector('.todo-list');

let todos = [];

// 제출 시 리스트 추가
const onSubmit = (e) => {
  e.preventDefault();

  id = new Date();
  id = id.getTime();

  const todoObj = {
    text: todoInput.value,
    id,
    done: false,
  }

  showList(todoObj);
  saveLocal();

  todoInput.value = '';

}

// 화면에 리스트 보여주기
const showList = (obj) => {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const btn = document.createElement('button');

  span.addEventListener('click', onClickDone);
  btn.addEventListener('click', onClickDel);

  span.innerHTML = obj.text;
  btn.innerHTML = 'X';

  li.appendChild(span);
  li.appendChild(btn);
  todoList.appendChild(li)

  li.id = obj.id;

  const todoObj = {
    text: obj.text,
    id: obj.id,
    done: obj.done,
  }

  todos.push(todoObj);
  checkDone(todoObj, span);

}

// done 체크해서 밑줄 긋기
const checkDone = (obj, span) => {
  if (obj.done == false) {
    span.style.textDecoration = 'none';
  } else {
    span.style.textDecoration = 'line-through';
  }
}

// 로컬저장소에 문자열 방식으로 저장
const saveLocal = () => {
  localStorage.setItem(localTODO, JSON.stringify(todos));
}

// 로컬저장소에서 불러오기
const loadLocal = () => {
  if (localStorage.getItem(localTODO)) {
    const arr = JSON.parse(localStorage.getItem(localTODO));
    arr.forEach(item => showList(item))
  }
}

// X버튼 클릭 시 요소 제거
const onClickDel = (e) => {
  const li = e.target.parentNode;
  todoList.removeChild(li);

  todos = todos.filter(item => item.id !== parseInt(li.id, 10))
  
  saveLocal();
}

// 요소 클릭시 done 변경
const onClickDone = (e) => {
  const li = e.target.parentNode;
  const span = e.target;
  const todoIndex = todos.findIndex(item => item.id == parseInt(li.id, 10))
  if (todos[todoIndex].done == true) {
    span.style.textDecoration = 'none';
    todos[todoIndex].done = false;
  } else {
    span.style.textDecoration = 'line-through';
    todos[todoIndex].done = true;
  }
  checkDone(todos[todoIndex], span)
  saveLocal();
}

todoForm.addEventListener('submit', onSubmit);
loadLocal();