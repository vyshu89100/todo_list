let tasks = []; // Initialize an empty task array.

// Add Task Functionality
document.getElementById('addTaskButton')?.addEventListener('click', () => {
  const taskInput = document.getElementById('taskInput');
  const taskValue = taskInput.value.trim();

  if (taskValue) {
    tasks.push(taskValue);
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save tasks to localStorage.
    taskInput.value = '';
    alert('Task added!');
  } else {
    alert('Please enter a task.');
  }
});

// Function to Navigate to Tasks Page
function navigateToTasks() {
  window.location.href = 'tasks.html';
}

// Display Tasks in `tasks.html`
window.onload = () => {
  const taskList = document.getElementById('taskList');
  
  // Ensure the page has the taskList element before attempting to access it.
  if (taskList) {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || []; // Retrieve tasks from localStorage.

    // Check if there are tasks to display.
    if (storedTasks.length === 0) {
      taskList.innerHTML = "<li>No tasks added yet.</li>"; // Fallback if there are no tasks.
    } else {
      storedTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${task} 
          <button onclick="editTask(${index})">Edit</button>
          <button onclick="deleteTask(${index})">Delete</button>`;
        taskList.appendChild(li);
      });
    }
  }
};

// Edit Task Functionality
function editTask(index) {
  const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const newTask = prompt('Edit your task:', storedTasks[index]);
  
  if (newTask && newTask.trim() !== '') {
    storedTasks[index] = newTask.trim();
    localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Update localStorage.
    location.reload(); // Reload the page to update the tasks list.
  }
}

// Delete Task Functionality
function deleteTask(index) {
  const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  storedTasks.splice(index, 1); // Remove the selected task.
  localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Update localStorage.
  location.reload(); // Reload the page to update the tasks list.
}

// Go Back to index.html
function goBack() {
  window.location.href = 'index.html';
}