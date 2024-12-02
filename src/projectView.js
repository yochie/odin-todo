import "./projectView.css"
import * as taskCardView from "./taskCardView.js";
import { displayTaskCreateForm } from "./taskDialog.js";

let currentProjectName;

function renderProject(project) {
    currentProjectName = project.name;
    const nameNode = document.querySelector(".project-name");
    nameNode.textContent = project.name;

    const taskContainer = document.querySelector(".tasks-container");
    taskContainer.replaceChildren();
    for (let task of project.getTaskList()) {
        const card = taskCardView.createTaskCard(task, currentProjectName);
        taskContainer.appendChild(card);
    }
}

registerTaskCreateButtonHandler();
function registerTaskCreateButtonHandler() {
    const taskAddButton = document.querySelector(".add-task-button");
    taskAddButton.addEventListener("click", (e) => {
        displayTaskCreateForm(currentProjectName);
    });
}

export {
    renderProject
};