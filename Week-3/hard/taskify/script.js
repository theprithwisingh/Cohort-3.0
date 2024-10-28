document.addEventListener('DOMContentLoaded', loadTasks);

// Modal for adding tasks
let selectedColumn = '';

function showAddTaskModal(column) {
    selectedColumn = column;
    document.getElementById('addTaskModal').style.display = 'flex';
}

function closeAddTaskModal() {
    document.getElementById('addTaskModal').style.display = 'none';
}

function addTask() {
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const priority = document.getElementById('taskPriority').value;
    const task = {
        title: title,
        description: description,
        priority: priority,
        date: new Date().toLocaleDateString(),
        time: 'Just now',
        status: selectedColumn
    };

    saveTaskToLocalStorage(task);
    renderTask(task);
    closeAddTaskModal();
    clearForm();
}

// Save tasks to localStorage
function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage on page load
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => renderTask(task));
}

// Render task card dynamically
function renderTask(task) {
    const container = document.getElementById(`${task.status}-cards`);
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <span class="label ${task.priority.toLowerCase()}">${task.priority}</span>
        <span class="date">${task.date}</span>
        <span class="time">${task.time}</span>
    `;
    container.appendChild(card);
}

// Clear form inputs
function clearForm() {
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('taskPriority').value = 'Low';
}
