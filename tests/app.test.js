// Jest Tests

import {
    Task,
    SubTask,
    taskList,
    addTask,
    findTaskByTitle,
    updateTaskPriority,
    getTaskDetails,
    mergeTasks,
    changeTaskPriority,
    countCompletedTasks,
    calculateAveragePriority,
    getHighPriorityTasks,
    TaskManager
} from "../src/app.js";

// to reset the task list before every test
beforeEach(() => {
    taskList.length = 0;
});

describe("Task Class", () => {
    test("should create a task", () => {
        const task = new Task("Test Task", "Description", "High");
        expect(task.title).toBe("Test Task");
        expect(task.description).toBe("Description");
        expect(task.priority).toBe("High");
        expect(task.completed).toBe(false);
        expect(task.id).toBeDefined();
        expect(task.dateCreated).toBeDefined();
        expect(task.timeCreated).toBeDefined();
    });
    
    // test for getInfo method
    test("should return formatted task information", () => {
        const task = new Task("Homework", "Math", "High");

        expect(task.getInfo()).toBe(
            "Task: Homework - Priority: High"
        );
    })
    // test for toggle completion
    test("should toggle completion status", () => {
        const task = new Task("Homework", "Math", "High");
        task.toggleCompletion();
        expect(task.completed).toBe(true);
    })
    // test that invalid priorities are rejected
    test("should reject an invalid priority", () => {
        expect(() => {
            new Task("Study", "JavaScript", "Urgent");
        }).toThrow("Invalid priority.");
    });
});

describe("Task Functions", () => {
    // Missing: beforeEach to reset taskList
    
    test("should add task", () => {
        const task = addTask("New Task", "Test", "Medium");
        // Wrong assertion - should check taskList
        expect(taskList.length).toBe(1);
        expect(task.title).toBe("New Task");
    });
    
    // test for findTaskByTitle
    test("should find a task by title", () => {
        addTask("Study", "JavaScript", "High");
        const task = findTaskByTitle("Study");
        expect(task.title).toBe("Study");
    });
    // test for updateTaskPriority()
    test("should update task priority", () => {
        const task = addTask("Study", "JavaScript", "Low");
        updateTaskPriority(task.id, "High");
        expect(task.priority).toBe("High");
    });
    // Missing: test for calculateAveragePriority()
    test("should calculate the average priority", () => {
        addTask("One", "Task", "High");
        addTask("Two", "Task", "Medium");
        addTask("Three", "Task", "Low");

        expect(calculateAveragePriority()).toBe(2);
    });

    // test for error handling
    test("should return null when task is invalid", () => {
        const task = addTask("", "", "High");
        expect(task).toBeNull();
    });

});

describe("Array Operations", () => {
    // tests for mergeTasks
    test("should merge two task arrays", () => {
        const list1 = [ new Task("A", "One", "High")];
        const list2 = [ new Task("B", "Two", "Low")];
        expect(mergeTasks(list1, list2).length).toBe(2);
    });

    // tests for getHighPriorityTasks
    test("should return only high priority tasks", () => {
        addTask("Task 1", "One", "High");
        addTask("Task 2", "Two", "Low");
        expect(getHighPriorityTasks().length).toBe(1);
    });

    // tests for recursive function
    test("should count completed tasks", () => {
        const one = addTask("A", "One", "High");
        const two = addTask("B", "Two", "Low");
        one.completed = true;
        expect(countCompletedTasks(taskList)).toBe(1);
    });
});

// - Module exports/imports

// describe block for SubTask class and inheritance
describe("SubTask Class", () => {
    test("should inherit from Task", () => {
        const subTask = new SubTask(
            "Sub Task", 
            "Description",
            "Medium",
            "Main Task"
        );
        expect(subTask.title).toBe("Sub Task");
        expect(subTask.parentTask).toBe("Main Task");
        expect(subTask).toBeInstanceOf(Task);                                                                                                                          
    });
})

// describe block for Destructuring functions
describe("Destructuring Functions", () => {
    test("should return task details", () => {
        const task = addTask("Study", "JavaScript", "Medium");
        const details = getTaskDetails(task);

        expect(details.title).toBe("Study");
        expect(details.priority).toBe("Medium");
        expect(details.completed).toBe(false);
    });
})

// describe block for Spread/rest operator functions
describe("Spread and Rest Operators", () => {
    test("should add multiple tasks", () => {
        const one = new Task("One", "Task", "High");
        const two = new Task("Two", "Task", "Low");

        TaskManager.addMultipleTasks(one, two);
        expect(taskList.length).toBe(2);
    });
    // test for changeTaskPriority
    test("should return a copy of a task with a new priority", () => {
        const task = new Task("Homework", "Math", "Low");
        const updated = changeTaskPriority(task, "High");

        expect(updated.priority).toBe("High");
        expect(task.priority).toBe("Low");
    });
})

// describe block for TaskManager
describe("TaskManager Methods", () => {
// test for getTotalTasks
    test("should return total number of tasks", () => {
        addTask("Task 1", "One", "High");
        addTask("Task 2", "Two", "Low");

        expect(TaskManager.getTotalTasks()).toBe(2);
    });

// test for getCompletedTasks
    test("should return completed tasks", () => {
        const task = addTask("Study", "JavaScript", "High");
        task.completed = true;
        expect(TaskManager.getCompletedTasks().length).toBe(1);
    });

// test for getTaskTitles
    test("should return task titles", () => {
        addTask("Homework", "Math", "High");
        expect(TaskManager.getTaskTitles()).toEqual(["Homework"]);
    });

// test for findTask
    test("should find a task by id", () => {
        const task = addTask("Study", "JavaScript", "Medium");
        expect(TaskManager.findTask(task.id)).toBe(task);
    });

// test for hasCompletedTasks
    test("should detect completed tasks", () => {
        const task = addTask("Homework", "Math", "High");
        task.completed = true;
        expect(TaskManager.hasCompletedTasks()).toBe(true);
    });

// test for clearCompletedTasks
    test("should clear completed tasks", () => {
        const one = addTask("One", "Task", "High");
        const two = addTask("Two", "Task", "Low");

        one.completed = true;
        TaskManager.clearCompletedTasks();

        expect(taskList.length).toBe(1);
        expect(taskList[0].title).toBe("Two");
    });

// test for deleteTask
    test("should delete a task", () => {
        const task = addTask("Homework", "Math", "High");
        TaskManager.deleteTask(task.id);
        expect(taskList.length).toBe(0);
    });
// test for toggleTask
    test("should toggle task completion", () => {
        const task = addTask("Homework", "Math", "High");
        TaskManager.toggleTask(task.id);
        expect(task.completed).toBe(true);
    });
// test for getAveragePriority()
    test("should return average priority", () => {
        addTask("One", "Task", "High");
        addTask("Two", "Task", "Medium");
        addTask("Three", "Task", "Low");

        expect(TaskManager.getAveragePriority()).toBe(2);
    });

})