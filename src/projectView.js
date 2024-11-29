import "./projectView.css"
import * as taskView from "./taskView.js";
import { parseISO, format, differenceInCalendarDays } from "date-fns";

function renderProject(project) {
    const nameNode = document.querySelector(".project-name");
    nameNode.textContent = project.name;

    const taskContainer = document.querySelector(".tasks-container");
    taskContainer.replaceChildren();
    for (let task of project.getTaskList()) {
        const card = createTaskCard(task);
        taskContainer.appendChild(card);
    }
}

function createTaskCard(task) {
    const card = document.createElement("div");
    card.classList.add("task-card");

    const taskTitle = document.createElement("h3");
    taskTitle.textContent = task.title;
    card.appendChild(taskTitle);

    if (task.dueDate !== "") {
        const dueDate = parseISO(task.dueDate);
        const dueDatePrintout = document.createElement("p");
        dueDatePrintout.textContent = format(dueDate, "MM/dd/yyyy");
        let diff = differenceInCalendarDays(dueDate, Date.now());
        if (diff == 0) {
            dueDatePrintout.classList.add("today");
        } else if (diff < 0) {
            dueDatePrintout.classList.add("past");
        }
        card.appendChild(dueDatePrintout);
    }

    taskView.setup(card, task);

    return card;
}

export {
    renderProject
};