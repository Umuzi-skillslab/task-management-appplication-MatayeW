// Utilities

// task priority levels
const priorities = ["High", "Medium", "Low"];

function saveToStorage(data) {
    try {
    localStorage.setItem("tasks", JSON.stringify(data));
    } catch (error) {
        console.error("Error saving tasks", error);
    }
}
// load tasks from local Storage
function loadFromStorage() {
    try {
    const data = localStorage.getItem("tasks");
    if (!data) {
        return [];
    }
    return JSON.parse(data);
    } catch (error) {
        console.error("Error loading tasks", error);
        return []; 
    }
}

// generates a unique ID for each task
function generateRandomId() {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
}

// object containing a unique ID, creation date and time
function getCurrentDateTime() {
    const now = new Date();

    return {
        id: generateRandomId(),
        dateCreated: now.toLocaleDateString(),
        timeCreated: now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        })
    };
}

// format a task title neatly
function formatTaskName(name) {
    if (typeof name !== "string") {
        return "";
    }
    const trimmedName = name.trim();
    return trimmedName.charAt(0).toUpperCase() + trimmedName.slice(1);
}

// Check if a task has a High priority
function isHighPriority(task) {
    return task && task.priority === "High";
}

// check if priority value is valid
function isValidPriority(priority) {
    return priorities.includes(priority);
}

// count the number of tasks recursively
function countTasks(tasks, index = 0) {
    if (!Array.isArray(tasks)) {
        return 0;
    }
    if (index >= tasks.length) {
        return 0;
    }
    return 1 + countTasks(tasks, index +1);
}
// return formatted task names
function formatTaskNames(tasks) {
    if (!Array.isArray(tasks)) {
        return [];
    }
    return tasks.map(task => formatTaskName(task.title || ""));
}
// format a task for display
function formatTaskInfo(task) {
    return `${task.title} (${task.priority}) - ${task.dateCreated} ${task.timeCreated}`;
}

// export utility functions to use in other modules
export {
    priorities,
    saveToStorage,
    loadFromStorage,
    generateRandomId,
    getCurrentDateTime,
    formatTaskName,
    isHighPriority,
    isValidPriority,
    countTasks,
    formatTaskNames,
    formatTaskInfo
};