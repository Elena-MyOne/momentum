const todoBtnAdd = document.querySelector(".todo-add");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");

let tasks;

function Task(description) {
   this.description = description;
   this.completed = false;
}

function getTodoTasksLocal() {
   !localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));
}

getTodoTasksLocal();

let todoItemsElems = [];
let todoComplete;
let close;

function setTodoTasksLocal() {   //updateLocal
   localStorage.setItem('tasks', JSON.stringify(tasks));
}

function completeTask(index) {
   tasks[index].completed = !tasks[index].completed;
   if(tasks[index].completed) {
      todoItemsElems[index].classList.add('checked');
   } else {
      todoItemsElems[index].classList.remove('checked');
   }
   setTodoTasksLocal();
   fillTodoList();
}

function deleteTask(index) {
   todoItemsElems[index].classList.add('deletion');
   setTimeout(() => {
      tasks.splice(index, 1);
      setTodoTasksLocal();
      fillTodoList();
   }, 500)
   
}

function createTodoItemTemplate(task, index) {
   return todoList.innerHTML +=
      `<div class="todo-item ${task.completed ? 'checked' : ''}">
         <div class="todo-description">${task.description}</div>
         <div class="todo-buttons">
            <input class="todo-complete" type="checkbox" ${task.completed ? 'checked' : ''}>
            <div class="close"> 
               <img class="todo-image" src="assets/svg/add.svg" alt="">
            </div>
         </div>
      </div>`
}

function filterTasks() {
   const activeTasks = tasks.length && tasks.filter(item => item.completed === false);
   const completedTasks = tasks.length && tasks.filter(item => item.completed === true);
   tasks = [...activeTasks, ...completedTasks]
}

function fillTodoList() {
   todoList.innerHTML = '';
   if (tasks.length > 0) {
      filterTasks();
      tasks.forEach((item, index) => {
         createTodoItemTemplate(item, index);
      });
      todoItemsElems = document.querySelectorAll('.todo-item');
      todoComplete = document.querySelectorAll('.todo-complete');
      close = document.querySelectorAll('.close');

      todoComplete.forEach((item, index) => {
         item.addEventListener('click', () => {
               completeTask(index);
         })
      });

      close.forEach((item, index) => {
         item.addEventListener('click', () => {
            deleteTask(index);
         })
      });
   }
}

todoBtnAdd.addEventListener('click', () => {
   tasks.push(new Task(todoInput.value));
   setTodoTasksLocal();
   fillTodoList()
   todoInput.value = '';
})

todoInput.addEventListener('keydown', (e) => {
   if (e.keyCode === 13) {
      tasks.push(new Task(todoInput.value));
      setTodoTasksLocal();
      fillTodoList()
      todoInput.value = '';
   }
})

export {getTodoTasksLocal, setTodoTasksLocal, fillTodoList, createTodoItemTemplate}