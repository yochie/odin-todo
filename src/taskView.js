import "./taskView.css";
import { Printer, Printout, DatePrintout } from "./Printer.js";

const taskPrinter = new Printer();
taskPrinter.addPrintout("title", new Printout("Task"), ["bold"]);
taskPrinter.addPrintout("dueDate", new DatePrintout("Due by"));
taskPrinter.addPrintout("priority", new Printout("Priority"));
taskPrinter.addPrintout("description", new Printout("Description"));
taskPrinter.addPrintout("notes", new Printout("Notes"));

function setupModal(parent, task) {
    const dialog = document.createElement("dialog");
    const container = document.createElement("div");
    container.classList.add("task-view");

    taskPrinter.print(container, task);

    dialog.appendChild(container);
    parent.appendChild(dialog);

    parent.addEventListener("click", (e) => {
        dialog.showModal();
    });
}

function createTaskCard(task) {
    const card = document.createElement("div");
    card.classList.add("task-card");

    const taskTitle = document.createElement("h3");
    taskTitle.textContent = task.title;
    card.appendChild(taskTitle);

    if (task.dueDate !== "") {
        taskPrinter.printSingleValue(card, task, "dueDate");
    }

    setupModal(card, task);

    return card;
}

export { createTaskCard }