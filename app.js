//UI Variables
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');

//Load all event listeners
loadEventListeners();

function loadEventListeners () {
  //Add Task event
  form.addEventListener('submit', addTask);
};

function addTask(event) {
  if(taskInput.value === ''){
    alert('Task cannot be empty!');
  }
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskInput.value));
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class = "fa fa-remove"></i>';
  li.appendChild(link);
  taskList.appendChild(li);
  taskInput.value = '';
  event.preventDefault();
};