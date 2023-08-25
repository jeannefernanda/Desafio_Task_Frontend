const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

taskForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const status = document.getElementById('status').value;

    const taskData = { title, description, status };

    try {
        const response = await fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
        });

        if (response.ok) {
            const task = await response.json();
            addTaskToUI(task);
            taskForm.reset();
        } else {
            console.error('Failed to add task');
        }
    } catch (error) {
        console.error(error);
    }
});

async function fetchTasks() {
    try {
        const response = await fetch('http://localhost:5000/tasks');
        if(response.ok) {
            const tasks = await response.json();
            tasks.forEach(addTaskToUI);
        } else {
            console.error('Failed to fetch tasks');
        }
    } catch (error) {
        console.error(error);
    }
}

function addTaskToUI(task) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    taskItem.innerHTML = `
    <h3>${task.title}</h3>
    <p>${task.description}</p>
    <p>Status: ${task.status}</p>
    `;
    taskList.appendChild(taskItem);
}

fetchTasks();