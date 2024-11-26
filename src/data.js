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

    removeTask(title) {
        delete this.tasks[title];
    }

    getTaskList(){
        return Object.values(this.tasks);
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
                newTask.dueDate = new Date(task.dueDate);
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

function readProject(name) {
    return projects[name];
}

function updateProject(name, formData) {
    if (!projects.hasOwnProperty(name)) {
        throw new Error(`Can't update ${name}. No such project exists.`);
    }
    
    const toUpdate = projects[name];
    const newName = formData.name;
    if(toUpdate.name !== newName){
        projects[newName] = toUpdate;
        delete projects[name];
    }

    toUpdate.name = newName;
    storage.save(projects);
}

//will also delete all linked tasks
function deleteProject(name) {
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

function readTask(projectName, title) {
    if (title === undefined || projectName === undefined) {
        throw new Error("Can't read task without both title and project.");
    }
    if (!projects.hasOwnProperty(projectName)) {
        throw new Error(`Can't read task for project ${formData.forProject} because that project can't be found.`);
    }
    if (!projects[projectName].hasTask(title)) {
        throw new Error(`Can read task ${title} on ${projectName} because it doesn't exist.`);
    }

    return projects[projectName].getTask(title);
}

function updateTask(projectName, title, formData) {
    if (title === undefined || projectName === undefined) {
        throw new Error("Can't update task without both title and project.");
    }
    if (!projects.hasOwnProperty(projectName)) {
        throw new Error(`Can't update task for project ${formData.forProject} because that project can't be found.`);
    }
    if (!projects[projectName].hasTask(title)) {
        throw new Error(`Can update task ${title} on ${projectName} because it doesn't exist.`);
    }

    deleteTask(projectName, title);
    createTask(formData);
    //no need to save since we are using main interface functions that already save
}

function deleteTask(projectName, taskTitle) {
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

export {
    projects,
    createProject,
    readProject,
    updateProject,
    deleteProject,
    createTask,
    readTask,
    updateTask,
    deleteTask,
    initFromStorage
};
