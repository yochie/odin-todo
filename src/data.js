import * as storage from "./storage.js";

const projects = {};

class Project {
    name = "";
    tasks = {};

    constructor(name) {
        this.name = name;
    }

    setTask(taskTitle, task) {
        this.tasks[taskTitle] = task;
    }

    getTask(title) {
        return this.tasks[title];
    }

    hasTask(title) {
        return this.tasks.hasOwnProperty(title);
    }
    
    removeTask(title){
        delete this.tasks[title];
    }
}

class Task {
    title = "";
    description = "";
    dueDate = null;
    priority = "";
    notes = "";

    constructor(title, description, dueDate, priority, notes) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
    }
}

function initFromStorage() {
    const rawProjectList = storage.load();
    if (rawProjectList === null) {
        return;
    }
    for (let projectKey in rawProjectList) {
        const project = rawProjectList[projectKey];
        const newProject = new Project(project.name);
        for (let taskKey in project.tasks) {
            const task = project.tasks[taskKey];
            const newTask = new Task();
            Object.assign(newTask, task);
            if (task.dueDate !== undefined) {
                newTask.dueDate = Date.parse(task.dueDate);
            }
            newProject.setTask(newTask.title, newTask);
        }
        projects[newProject.name] = newProject;
    }
}

function createProject(name) {
    if (name === undefined) {
        throw new Error("Can't delete project without providing name");
    }

    // dont allow duplicate names, we use those as keys
    if (projects.hasOwnProperty(name)) {
        throw new Error(`A project with the name ${name} already exists.`)
    }

    const newProject = new Project(name);
    projects[name] = newProject;
    storage.save(projects);
}

//will also delete all linked tasks
function removeProject(name) {
    const toDelete = projects[name];
    if (toDelete === undefined) {
        throw new Error(`Can't delete project ${name} as it can't be found.`);
    }
    delete projects[name];
    storage.save(projects);
}

function createTask(formData) {
    if (formData.title === undefined || formData.forProject === undefined) {
        throw new Error("Can't create task without both title and project");
    }
    if (!projects.hasOwnProperty(formData.forProject)) {
        throw new Error(`Can't create task for project ${formData.forProject} because that project can't be found.`);
    }
    if (projects[formData.forProject].hasTask(formData.title)) {
        //prevent overwriting existing task
        throw new Error(`A task with the name ${formData.title} already exists`);
    }
    const newTask = new Task(
        formData.title,
        formData.description,
        formData.dueDate,
        formData.priority,
        formData.notes
    );

    projects[formData.forProject].setTask(newTask.title, newTask);
    storage.save(projects);
}

function removeTask(projectName, taskTitle) {
    if (!projects.hasOwnProperty(projectName)) {
        throw new Error(`Can't remove task from project ${projectName} as it can't be found`);
    }
    const project = projects[projectName];
    if (!project.hasTask(taskTitle)) {
        throw new Error(`Can't delete task ${taskTitle} as their is no task by that name on this project.`);
    }
    project.removeTask(taskTitle);
    storage.save(projects);
}

export { projects, createProject, removeProject, createTask, removeTask, initFromStorage };
