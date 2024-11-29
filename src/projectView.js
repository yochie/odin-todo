import "./projectView.css"
import * as taskView from "./taskView.js";
import { parseISO, format, differenceInCalendarDays } from "date-fns";

function renderProject(project) {
    const nameNode = document.querySelector(".project-name");
    nameNode.textContent = project.name;

    const taskContainer = document.querySelector(".tasks-container");
    taskContainer.replaceChildren();
    for (let task of project.getTaskList()) {
        const card = taskView.createTaskCard(task);
        taskContainer.appendChild(card);
    }
}


export {
    renderProject
};