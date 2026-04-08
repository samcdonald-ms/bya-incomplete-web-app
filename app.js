const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const emptyMsg = document.getElementById('empty-msg');

// In-memory task store (no persistence yet)
let tasks = [];

function renderTasks() {
  taskList.innerHTML = '';
  emptyMsg.style.display = tasks.length === 0 ? 'block' : 'none';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    if (task.done) li.classList.add('done');

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = task.text;

    const completeBtn = document.createElement('button');
    completeBtn.className = 'complete-btn';
    completeBtn.title = task.done ? 'Mark incomplete' : 'Mark complete';
    completeBtn.textContent = task.done ? '↩️' : '✅';
    completeBtn.addEventListener('click', () => toggleTask(index));

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.title = 'Delete task';
    deleteBtn.textContent = '🗑️';
    deleteBtn.addEventListener('click', () => deleteTask(index));

    li.appendChild(completeBtn);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;
  tasks.push({ text, done: false });
  taskInput.value = '';
  renderTasks();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});

renderTasks();
