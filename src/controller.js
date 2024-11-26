import * as projectView from "./projectView.js";
import * as projectList from "./projectList.js";
import * as data from "./data.js";

const DEFAULT_PROJECT_NAME = "Default";

function init() {
    data.initFromStorage(DEFAULT_PROJECT_NAME);
    projectList.initProjectList(data.getProjectNameList());
    selectProject(DEFAULT_PROJECT_NAME);
    registerEventHandlers();
}

function registerEventHandlers() {
    const projectSelectButtons = document.querySelectorAll(".project-list button");
    projectSelectButtons.forEach(button => {
        button.addEventListener("click", event => {
            selectProject(button["data-attribute"]);
        });
    });
}

function selectProject(projectName) {
    projectList.select(projectName);
    const project = data.readProject(projectName);
    projectView.renderProject(project);
}

export {
    init
}