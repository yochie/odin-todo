import "./projectView.css"
import * as taskCardView from "./taskCardView.js";
import { displayTaskCreateForm } from "./taskDialog.js";

let currentProjectName;
const taskCreateButton = document.querySelector(".add-task-button");
taskCreateButton.addEventListener("click", (e) => {
    displayTaskCreateForm(currentProjectName);
});

function renderProject(project, onTaskDeleted) {
    currentProjectName = project.name;
    const nameNode = document.querySelector(".project-name");
    nameNode.textContent = project.name;

    const taskContainer = document.querySelector(".tasks-container");
    taskContainer.replaceChildren();
    for (let task of project.getTaskList()) {
        const card = taskCardView.createTaskCard(task, currentProjectName, onTaskDeleted);
        taskContainer.appendChild(card);
    }
}

export {
    renderProject
};