// Task Management Application
//import functions used throughout the application
import { getCurrentDateTime } from "./utils.js";
// store all tasks in memory while application is running
const taskList = [];

//represents a single task
class Task {
    constructor(title, description, priority) {

        if (!title || !description) {
            throw new Error("Title and description are required.");
        }

        const validPriorities = ["High", "Medium", "Low"];

        if (!validPriorities.includes(priority)) {
            throw new Error("Invalid priority.");
        }

        this.title = title;
        this.description = description;
        this.priority = priority;
        this.completed = false;

        //save a unique ID and the date/time the task was created
        const { id, dateCreated, timeCreated } = getCurrentDateTime();
        this.id = id;
        this.dateCreated = dateCreated;
        this.timeCreated = timeCreated;
    }
    
    // switch a task between completed and incomplete
    toggleCompletion() {
        this.completed = !this.completed;
    }
    
    getInfo() {
        // template literals string concatenation
        return `Task: ${this.title} - Priority: ${this.priority}`;
    }
}

class SubTask extends Task {
    constructor(title, description, priority, parentTask) {
        super(title, description, priority);
        this.parentTask = parentTask;
    }
}

//create and add a validated task
function addTask(title, description, priority) {
    try {
    const newTask = new Task(title, description, priority);  // Should use const*
    taskList.push(newTask);
    return newTask;
    } catch(error) {
        console.error(error.message);
        return null;
    }
}

function displayAllTasks() {
    for (const task of taskList) {
        console.log(task.getInfo());
    }
}

//Search for a task using its title
function findTaskByTitle(title) {
    for (const task of taskList) {
        if (task.title === title) {
            return task;
        }
    }
    return undefined;
}

// Updating task priorities to be medium, high and low
function updateTaskPriority(taskId, newPriority) {

    if (typeof taskId !== "string" || typeof newPriority !== "string") {
        return false;
    }

    const validPriorities = ["High", "Medium", "Low"];

    if (!validPriorities.includes(newPriority)) {
        return false;
    }
    
    if (taskId == null || newPriority == null) {
        return false;
    }

    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === taskId) {  // Wrong operator (= instead of ===)*
            taskList[i].priority = newPriority;
            return true;
        }
    }

    return false;
}

// Function that uses destructuring
function getTaskDetails(task) {
    const {
        title,
        description,
        priority,
        completed,
        dateCreated,
        timeCreated
    } = task;
    
    return {
        title,
        description,
        priority,
        completed,
        dateCreated,
        timeCreated
    };
}

// merge two arrays using a spread operator
function mergeTasks(list1, list2) {
    return [...list1, ...list2];
}
//Return a copy of a task with a new priority
function changeTaskPriority(task, priority) {
    return { ...task, priority};
}

// Recursive function counting completed tasks
function countCompletedTasks(tasks, index = 0) {
    if (!tasks || index >= tasks.length) {
        return 0;
    }
    
    if (tasks[index].completed) {
        return 1 + countCompletedTasks(tasks, index + 1);
    }
        return countCompletedTasks(tasks, index + 1);
    }

    // convert priority labels into numbers so an average can be calculated
function calculateAveragePriority() {
    let total = 0;

    if(taskList.length === 0) {
        return 0;
    }
//Assign values to priority strings
    const priorityValues = {
        High: 3,
        Medium: 2,
        Low: 1
    };
    
    for (const task of taskList) {
        total += priorityValues[task.priority];
    }
  
    return Math.round(total / taskList.length);
}

// Filter function 
function getHighPriorityTasks() {
    return taskList.filter(task => task.priority === "High");
}

// object with methods used for managing tasks
const TaskManager = {
    tasks: taskList,

    //return the total number of tasks
    getTotalTasks() {
        return this.tasks.length;
    },
    //add a task to the task list
    addTask(task) {
        this.tasks.push(task);
    },
    //return only completed tasks
    getCompletedTasks() {
        return this.tasks.filter(task => task.completed);
    },
    //return an array of task titles
    getTaskTitles() {
        return this.tasks.map(task => task.title);
    },
    //find a task using its unique ID
    findTask(id) {
        return this.tasks.find(task => task.id === id);
    },
    //calculate average priority value of all tasks
    getAveragePriority() {
        const priorityValues = {
            High: 3,
            Medium: 2,
            Low: 1
        };
        const total = this.tasks.reduce((sum, task) => {
            return sum + priorityValues[task.priority];
        }, 0);

        return this.tasks.length === 0
        ? 0
        : Math.round(total / this.tasks.length);
    },
    //add multiple tasks at once using rest operator
    addMultipleTasks(...tasks) {
        this.tasks.push(...tasks);
    },
    //remove a task from the task list
    deleteTask(taskId) {
        const index = this.tasks.findIndex(task => task.id === taskId);

        if (index !== -1) {
            this.tasks.splice(index, 1);
            //returning whether or not it worked for testing
            return true;
        }
        return false;
    },
    //check if completed tasks exists
    hasCompletedTasks() {
        return this.tasks.some(task => task.completed);
    },
    //remove every completed task from task list
    clearCompletedTasks() {
        this.tasks = this.tasks.filter(task => !task.completed);
        taskList.length = 0;
        taskList.push(...this.tasks);
    },
    // toggle the completion status of a task
    toggleTask(taskId) {
        const task = this.findTask(taskId);

        if (task) {
            task.completed = !task.completed;
        }
        return false;
    }
};

// export functions and classes to use in other modules
export {
    taskList,
    Task,
    SubTask,
    addTask,
    displayAllTasks,
    findTaskByTitle,
    updateTaskPriority,
    getTaskDetails,
    mergeTasks,
    changeTaskPriority,
    countCompletedTasks,
    calculateAveragePriority,
    getHighPriorityTasks,
    TaskManager
};