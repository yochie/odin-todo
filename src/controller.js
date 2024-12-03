import * as projectView from "./projectView.js";
import * as projectList from "./projectList.js";
import * as data from "./data.js";
import * as projectForm from "./projectForm.js";

const DEFAULT_PROJECT_NAME = "Default";
let currentProjectName = DEFAULT_PROJECT_NAME;

function init() {
    data.initFromStorage(DEFAULT_PROJECT_NAME);
    projectList.generate(data.getProjectNameList(), loadProject);
    projectForm.init(onProjectCreated);
    //task form handles relevant data, only need to update ui here
    //using custom event instead of callback, no good reason except to see how it feels
    //should probably be kept uniform...
    document.addEventListener("task-form-submitted", (event) => {
        console.log(`created ${event.detail.taskName} for project ${event.detail.projectName}`);
        loadProject(currentProjectName);
        //todo : read event data to highligh created task/project combo
    });
    loadProject(DEFAULT_PROJECT_NAME);
}


function onProjectCreated(projectName) {
    //form modules handle data creation/modification, we only update ui here
    projectList.generate(data.getProjectNameList(), loadProject);
    loadProject(createdName);
}

function onTaskDeleted(forProject, taskTitle) {
    //we handle database state here instead of task view to keep view independent from data
    data.deleteTask(forProject, taskTitle);
    loadProject(currentProjectName);
}

function loadProject(projectName) {
    projectList.highlight(projectName);
    const project = data.readProject(projectName);
    projectView.renderProject(project, onTaskDeleted, onProjectCreated);
    currentProjectName = projectName;
}

export {
    init
}