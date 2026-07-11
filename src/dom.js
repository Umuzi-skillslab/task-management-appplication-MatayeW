// DOM Manipulation
// handles user interactions, updates the webpage, and saves task changes
import { taskList, addTask, TaskManager } from "./app.js";
import { saveToStorage, loadFromStorage } from "./utils.js";

// add all event listeners when the page loads
function setupEventListeners() {
    // find the add task button
    const addButton = document.querySelector(".add-task-btn");
    // click event to create a new task
    if (addButton) {
    addButton.addEventListener("click", handleAddTask);
    }
    // find the task list container
    const taskContainer = document.getElementById("task-list");

    if (taskContainer) {
        // uses event delegation to detect clicks on task buttons
        taskContainer.addEventListener("click", handleTaskClick);
    }
}

// create a new task using the user's input
function handleAddTask(event) {
// prevents the page from refreshing
    event.preventDefault();

    // get input fields from the page
    const titleInput = document.getElementById("title");
    const descInput = document.getElementById("description");
    
    const priorityInput = document.getElementById("priority");
    const priority = priorityInput.value;

    if (!titleInput || !descInput || !priorityInput) {
        console.error("Required form elements were not found.");
        return;
    }

    // remove extra spaces from the user's input
    const title = titleInput.value.trim();
    const description = descInput.value.trim();

    if (!priority) {
        alert("Please select a priority.")
        return;
    }
    
    if (title === "" || description === "") {
        alert("Please enter a title and description.");
        return;
    }
    
    // create and save the new task
    const task = addTask(title, description, priority);

    if (task) {
    saveToStorage(taskList);
    displayTasks();
    console.log("Task added successfully.");
}

// clear the form, ready for the next task
    priorityInput.value = "";
    titleInput.value = "";
    descInput.value = "";
}

// display all tasks currently stored
function displayTasks() {
    const container = document.getElementById("task-list");
    if (!container) return;
    // remove any tasks currently displayed to avoid duplicates
        container.innerHTML = "";

        for (const task of taskList) {
            // extract task properties using object destructing
            const {
                id,
                title,
                description,
                priority,
                completed,
                dateCreated,
                timeCreated
            } = task;

            // create the HTML for each task and add it to the page
            container.insertAdjacentHTML(
            "beforeend",
            `
            <div class ="task" data-id="${id}">
                <h3>${title}</h3>
                <p>${description}</p>
                <p><strong>Priority:</strong> ${priority}</p>
                <p><strong>Date:</strong> ${dateCreated}</p>
                <p><strong>Time:</strong> ${timeCreated}</p>
                <p><strong>Status:</strong> ${completed ? "Completed" : "Pending"}</p>
                <button class = "complete-btn"> ${completed ? "Undo" : "Complete"}</button>
                <button class = "delete-btn">Delete</button>
            </div>
            `
            );
        }
    }

// handle clicks on task buttons using event delegation
function handleTaskClick(event) {
    // check whether the Complete button was clicked
    const completeButton = event.target.closest(".complete-btn");

    if (completeButton) {
        const taskElement = deleteButton.closest(".task");
        const taskId = taskElement.dataset.id;

        const task = TaskManager.findTask(taskId);

        if (task) {
            TaskManager.toggleTask(taskId);
            saveToStorage(taskList);
            displayTasks();

            console.log("Task completion updated.")
        }
        return;
    }
    
    // check if the Delete button was clicked
    const deleteButton = event.target.closest(".delete-btn");

    if (!deleteButton) return;

    const taskElement = deleteButton.closest(".task");
    const taskId = taskElement.dataset.id;

    // delete the selected task and update storage
    TaskManager.deleteTask(taskId);

    saveToStorage(taskList);

    displayTasks();
    
    console.log("Task deleted.");
}

// load saved tasks and prepare the application when page has loaded
document.addEventListener("DOMContentLoaded", () => {
    // retrieve previously saved tasks
    const savedTasks = loadFromStorage();
    // restore saved tasks into task list
    taskList.push(...savedTasks);

    // display tasks and enable user interactions
    displayTasks();
    setupEventListeners();
});