import * as projectView from "./projectView.js";
import * as projectList from "./projectList.js";
import * as data from "./data.js";
import * as projectForm from "./projectForm.js";
import * as taskForm from "./taskForm.js";

const DEFAULT_PROJECT_NAME = "Default";
let currentProjectName = DEFAULT_PROJECT_NAME;

function init() {
    data.initFromStorage(DEFAULT_PROJECT_NAME);
    generateProjectListWithHandlers();
    selectProject(DEFAULT_PROJECT_NAME);
    registerEventHandlers();
}

function generateProjectListWithHandlers(){
    projectList.initProjectList(data.getProjectNameList());

    const projectSelectButtons = document.querySelectorAll(".project-list .project-select-button");
    projectSelectButtons.forEach(button => {
        button.addEventListener("click", event => {
            selectProject(button["data-attribute"]);
        });
    });
}

function registerEventHandlers() {
    registerProjectFormHandlers();
    registerTaskFormHandlers();
}

function registerProjectFormHandlers(){
    const projectAddButton = document.querySelector(".add-project-button");
    projectAddButton.addEventListener("click", projectForm.toggleDisplay);

    const field = document.querySelector(".project-form");
    field.addEventListener("keydown", event => {
        if (event.keyCode !== 13) {
            return;
        }
        
        const createdName = projectForm.submit(field.value);
        if(createdName !== ""){
            generateProjectListWithHandlers();
            selectProject(createdName);
        }
    });
}

function registerTaskFormHandlers(){
    const taskAddButton = document.querySelector(".add-task-button");
    taskAddButton.addEventListener("click", taskForm.toggleDisplay);

    document.addEventListener("submit", event => {
        const success = taskForm.submit(currentProjectName);
        if(success){
            const project = data.readProject(currentProjectName)
            projectView.renderProject(project);
        }

        event.preventDefault();
    });
}

function selectProject(projectName) {
    projectList.select(projectName);
    const project = data.readProject(projectName);
    projectView.renderProject(project);
    currentProjectName = projectName;
}

export {
    init
}