import * as storage from "./storage.js";

const LAST_PROJECT_ID_KEY = "lastProjectID";
const LAST_TASK_ID_KEY = "lastTaskID";
const PROJECT_ID_PREFIX = "p_";
const TASK_ID_PREFIX = "t_";

let lastProjectID = 0;
let lastTaskID = 0;
const projects = {};
const tasks = {};

class Project {
    name = "";
    id = "";
    #tasks = [];

    constructor(name, id) {
        this.name = name;
        this.id = id;
    }

    addTask(taskID) {
        this.#tasks.push(taskID);
    }

    getTaskList() {
        return this.#tasks;
    }
}

class Task {
    id = "";
    forProjectID = "";
    title = "";
    description = "";
    dueDate = null;
    priority = "";
    notes = "";

    constructor(id, forProjectID, title, description, dueDate, priority, notes) {
        this.id = id;
        this.forProjectID = forProjectID;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
    }
}

function initFromStorage() {
    const projectKeys = [];
    const taskKeys = [];
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key === null) {
            continue;
        }
        if (key.startsWith(PROJECT_ID_PREFIX)) {
            projectKeys.push(key);
        } else if (key.startsWith(TASK_ID_PREFIX)) {
            taskKeys.push(key);
        } else if (key === LAST_TASK_ID_KEY) {
            lastTaskID = storage.read(LAST_TASK_ID_KEY);
        } else if (key === LAST_PROJECT_ID_KEY) {
            lastProjectID = storage.read(LAST_PROJECT_ID_KEY);
        } else {
            throw new Error(`Can't parse local storage with key ${key}`);
        }
    }

    projectKeys.forEach(key => {
        initProject(key, JSON.parse(localStorage.getItem(key)));
    });

    taskKeys.forEach(key => {
        initTask(key, JSON.parse(localStorage.getItem(key)));
    });

    //will create if not existing
    //should just rewrite same value otherwise
    storage.create(LAST_PROJECT_ID_KEY, lastProjectID);
    storage.create(LAST_TASK_ID_KEY, lastTaskID);
}

function initProject(key, obj) {
    if (!obj.hasOwnProperty("name")) {
        throw new Error("Malformed project storage data");
    }
    projects[key] = new Project(obj.name, obj.id);
}

function initTask(key, obj) {
    const task = new Task(
        key,
        obj.forProjectID,
        obj.title,
        obj.description,
        Date.parse(obj.dueDate),
        obj.priority,
        obj.notes
    );
    tasks[task.id] = task;
    projects[task.forProjectID].addTask(task.id);
}

function generateProjectID() {
    lastProjectID++;
    storage.update(LAST_PROJECT_ID_KEY, lastProjectID);
    return PROJECT_ID_PREFIX + lastProjectID;
}

function generateTaskID() {
    lastTaskID++;
    storage.update(LAST_TASK_ID_KEY, lastTaskID);
    return TASK_ID_PREFIX + lastTaskID;
}

function createProject(name) {
    if(name === undefined){
        return;
    }
    const newProject = new Project(name, generateProjectID());
    storage.create(newProject.id, newProject);
    projects[newProject.id] = newProject;
}

//will also delete all linked tasks
function removeProject(id) {
    const toDelete = projects[id];
    if (toDelete === undefined) {
        return;
    }
    for (let taskID of toDelete.getTaskList()) {
        removeTask(taskID);
    }
    storage.del(id);
    delete projects[id];
}

function createTask(formData) {
    if(formData.title === undefined || formData.forProjectID === undefined){
        return;
    }
    if (!projects.hasOwnProperty(formData.forProjectID)) {
        throw new Error(`Can't create task for project ${formData.forProjectID} because that project can't be found.`);
    }
    const newTask = new Task(
        generateTaskID(),
        formData.forProjectID,
        formData.title,
        formData.description,
        formData.dueDate,
        formData.priority,
        formData.notes
    );

    storage.create(newTask.id, newTask);
    projects[newTask.forProjectID].addTask(newTask.id);
    tasks[newTask.id] = newTask;
}

function removeTask(id) {
    const toDelete = tasks[id];
    if (toDelete === undefined) {
        return;
    }
    storage.del(id);
    delete tasks[id];
}

export { projects, tasks, createProject, removeProject, createTask, removeTask, initFromStorage };
