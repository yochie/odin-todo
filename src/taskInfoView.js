import "./taskInfoView.css";
import { Printer, Printout, DatePrintout } from "./Printer.js";
import { displayTaskEditForm } from "./taskDialog.js";

const taskPrinter = new Printer();
taskPrinter.addPrintout("forProject", new Printout("Project"));
taskPrinter.addPrintout("title", new Printout("Task"), ["bold"]);
taskPrinter.addPrintout("dueDate", new DatePrintout("Due by"));
taskPrinter.addPrintout("priority", new Printout("Priority"));
taskPrinter.addPrintout("description", new Printout("Description"));
taskPrinter.addPrintout("notes", new Printout("Notes"));

const dialogButtons = document.querySelector(".task-dialog-buttons");
const container = document.querySelector(".task-info-container");

function displayFor(task, project) {
    container.replaceChildren();
    task.forProject = project;
    taskPrinter.print(container, task);

    const editButton = document.createElement("button");
    editButton.classList.add("task-edit-button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", (e) => {
        displayTaskEditForm(task, project);
        e.stopPropagation();
    });
    container.appendChild(editButton);
}

function hide() {
    container.replaceChildren();
}

export { displayFor, hide, taskPrinter };