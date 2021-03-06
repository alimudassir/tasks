//UI Variables
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');

//Load all event listeners
loadEventListeners();

/**
 * Used to add event listeners to DOM elements
 */
function loadEventListeners() {
  //DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks);
  //Add Task event
  form.addEventListener('submit', addTask);
  //Remove Task
  taskList.addEventListener('click', removeTask);
  //Clear All Tasks
  clearBtn.addEventListener('click', clearTasks);
  //Filter tasks
  filter.addEventListener('keyup', filterTasks);
};

/**
 * Invoked on click of form submit
 * @param {JSONObject} event - event object
 */
function addTask(event) {
  if (taskInput.value === '') {
    alert('Task cannot be empty!');
  } else {
    createTaskNodeAndAppendToList(taskInput.value);
    storeTaskInLocalStorage(taskInput.value);
    taskInput.value = '';
    event.preventDefault();
  }
};

/**
 * Invoked on click of delete button
 * @param {JSONObject} event - event object
 */
function removeTask(event) {
  if (event.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure, you want to delete the task?')) {
      event.target.parentElement.parentElement.remove();
      removeTaskFromLocalStorage(event.target.parentElement.parentElement);
    }
  }
};

/**
 * Invoked on click of 'Clear Tasks' button
 * @param {JSONObject} event - event object
 */
function clearTasks(event) {
  if (confirm('Are you sure you want to clear all tasks?')) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
  }
};

/**
 * Invoked on keyup event of filter tasks input
 * @param {JSONObject} event - event object
 */
function filterTasks(event) {
  let text = event.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(
    (task) => {
      const currentText = task.firstChild.textContent;
      if (currentText.toLowerCase().indexOf(text) != -1) {
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    }
  );
};

/**
 * Invoked to store task in local storage
 * @param {string} task - Task to be added
 */
function storeTaskInLocalStorage(task) {
  let tasks = getTasksFromLocalStorage();

  if (task != '' && task != null && task != undefined) {
    tasks.push(task);
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));
};

/**
 * Invoked on page load to fetch and display tasks from local storage
 */
function getTasks() {
  let tasks = getTasksFromLocalStorage();

  tasks.forEach((task) => {
    createTaskNodeAndAppendToList(task);
  });
};

/**
 * Invoked to create list node and append to tasks list
 * @param {string} taskText - Task text to be added
 */
function createTaskNodeAndAppendToList(taskText) {
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskText));
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class = "fa fa-remove"></i>';
  li.appendChild(link);
  taskList.appendChild(li);
};

/**
 * Invoked to remove a task from local storage
 * @param {JSONObject} taskItem - taskItem to be deleted
 */
function removeTaskFromLocalStorage(taskItem) {
  let tasks = getTasksFromLocalStorage();

  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
};

/**
 * Invoked to get tasks from local storage
 */
function getTasksFromLocalStorage() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  return tasks;
};