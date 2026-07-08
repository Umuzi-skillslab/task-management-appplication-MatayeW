// DOM Manipulation - Starter Code with Errors

// Missing: proper DOM selectors
function setupEventListeners() {
    // Wrong selector method*
    const addButton = document.getElementById(".add-task-btn");  // Wrong - mixing ID and class
    const taskInput = document.querySelector("task-input");  // Missing #
    
    // Missing: null checks before adding listeners*
    if (addButton) {
    addButton.addEventListener("click", handleAddTask);
    }
    // Missing: other event listeners for form submission, etc.
}

// Function with DOM manipulation errors
function handleAddTask() {

    event.preventDefault();

    const titleInput = document.getElementById("title");
    const descInput = document.getElementById("description");
    
    // No validation
    // Should use event.preventDefault() if form*
    
    if (!titleInput ||!descInput) return;

    const title = titleInput.value;
    const description = descInput.value;
    
    // Missing: priority input*
    if (title === "") {
        alert("Please enter a title.");
        return;
    }
    
    addTask(title, description, 1);
    saveTasks():
    displayTasks();
    
    // Missing: clear inputs after adding*
    titleInput.value = "";
    descInput.value = "";
}

// Function that should use better selectors
function displayTasks() {
    const container = document.getElementById("task-list");
    
    // Should clear existing content first
    // Missing: null check*
    if (!container) return;
    
    // Inefficient - should use template literals and insertAdjacentHTML
    // for (var i = 0; i < taskList.length; i++) {
    //     var div = document.createElement("div");
    //     div.innerHTML = "<h3>" + taskList[i].title + "</h3>";
    //     div.innerHTML = div.innerHTML + "<p>" + taskList[i].description + "</p>";
    //     container.appendChild(div);
        
        // Missing: task ID, completion status, event handlers for delete/complete
        container.innerHTML = "";

        for (const task of tasklist) {
            "beforeend",
            `
            <div class ="task" data-id="${task.id}">
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p>Priority: ${task.priority}</p>
            </div>
            `
        };
    }
}

// Function with event handling issues
function handleTaskClick(event) {
    // Missing: event.target check
    // Missing: proper event delegation
    
    const taskElement = event.target.closest(".task");

    if (!taskElement) return;

    const taskId = Number(taskElement.dataset.id);  // Wrong way to get task ID
    
    // Should toggle task completion
    console.log(`Task clicked: ${taskId}`);
}

// Missing: JSON conversion functions
// Missing: functions to save/load tasks from localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(taskList));
}
function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");

    if (!savedTasks) return;

    taskList = JSON.parse(savedTasks);
}
// Initialize (wrong placement - should use DOMContentLoaded)
document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    displayTasks();
    setupEventListeners();
});


