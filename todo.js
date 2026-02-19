// Retrieve tasks from localStorage or initialize an empty array
let allTasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to clear input fields
function clearAllFields() {
    document.getElementById('taskInput').value = '';
    document.getElementById('dateInput').value = '';
}

// Function to display tasks
function displayTasks() {
    const completedTasks = document.getElementById('completedTasks');
    completedTasks.innerHTML = '';
    const todaysTasks = document.getElementById('todaysTasks');
    todaysTasks.innerHTML = '';
    const upcomingTasks = document.getElementById('upcomingTasks');
    upcomingTasks.innerHTML = '';

    const today = new Date().toLocaleDateString('en-CA'); // Format: YYYY-MM-DD

    allTasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.className = 'w-full my-3 px-3 py-2 rounded-md flex justify-between items-center border-l-5 shadow-md';

        if (task.isCompleted) {
            // Completed Tasks
            taskElement.classList.add('bg-green-300', 'border-green-800');
            taskElement.innerHTML = `
                <p class="font-bold">${task.taskTitle}</p>
                <button onclick="deleteTask(${index})" class="font-bold bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-red-800">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            `;
            completedTasks.appendChild(taskElement);
        } else if (task.taskDate === today) {
            // Today's Tasks
            taskElement.classList.add('bg-blue-300', 'border-blue-800');
            taskElement.innerHTML = `
                <p class="font-bold">${task.taskTitle}</p>
                <button onclick="markAsCompleted(${index})" class="font-bold bg-blue-500 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-blue-800">
                    <i class="fa-solid fa-check"></i>
                </button>
            `;
            todaysTasks.appendChild(taskElement);
        } else {
            // Upcoming Tasks
            taskElement.classList.add('bg-orange-300', 'border-orange-800');
            taskElement.innerHTML = `
                <p class="font-bold">${task.taskTitle}</p>
                <button onclick="editTask(${index})" class="font-bold bg-orange-500 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-orange-800">
                    <i class="fa-solid fa-pencil"></i>
                </button>
            `;
            upcomingTasks.appendChild(taskElement);
        }
    });
}

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    const dateInput = document.getElementById('dateInput').value;

    if (taskText && dateInput) {
        const newTask = {
            id: Date.now(),
            taskTitle: taskText,
            taskDate: dateInput,
            isCompleted: false
        };
        allTasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(allTasks));
        displayTasks();
        clearAllFields();
    } else {
        alert('Please enter a task and select a date.');
    }
}

// Function to mark a task as completed
function markAsCompleted(index) {
    allTasks[index].isCompleted = true;
    localStorage.setItem('tasks', JSON.stringify(allTasks));
    displayTasks();
}

// Function to edit a task
function editTask(index) {
    const task = allTasks[index];
    document.getElementById('taskInput').value = task.taskTitle;
    document.getElementById('dateInput').value = task.taskDate;
    deleteTask(index); // Remove the task so it can be re-added after editing
}

// Function to delete a task
function deleteTask(index) {
    allTasks.splice(index, 1); // Remove the task from the array
    localStorage.setItem('tasks', JSON.stringify(allTasks));
    displayTasks();
}

// Initial display of tasks
displayTasks();