import "./taskCardView.css";
import { displayTaskInfo } from "./taskDialog.js";
import { taskPrinter } from "./taskInfoView.js";

function createTaskCard(task, forProject) {
    const card = document.createElement("div");
    card.classList.add("task-card");

    const taskTitle = document.createElement("h3");
    taskTitle.textContent = task.title;
    card.appendChild(taskTitle);

    if (task.dueDate !== "") {
        taskPrinter.printSingleValue(card, task, "dueDate");
    }

    card.addEventListener("click", (e) => {
        displayTaskInfo(task, forProject);
    });
    return card;
}

export { createTaskCard }