import "./taskForm.css";
import { createTask, readTask, updateTask, readProject } from "./data.js";

const formContainer = document.querySelector(".task-form-container")
const form = document.querySelector(".task-form");
const error = document.querySelector(".task-create-error");
const projectField = document.querySelector("#task-project");
const submitButton = document.querySelector(".task-submit");
const dialogTitle = document.querySelector(".task-dialog-title");
let updatingTask = null;

//throws custom event so that we can handle ui updates elsewhere
form.addEventListener("submit", (e) => {
    const submissionResult = submit();
    if (submissionResult.success) {
        document.dispatchEvent(
            new CustomEvent("task-form-submitted",
                {
                    detail:
                    {
                        projectName: submissionResult.projectName,
                        taskName: submissionResult.taskName
                    }
                }));
    }
    e.preventDefault();
});

function displayFor(task, project) {
    formContainer.style.display = "block";
    projectField.value = project;
    form["title"].focus();
    resetError();
    if (task === null || task === undefined) {
        dialogTitle.textContent = "Create Task";
        updatingTask = null;
        submitButton.textContent = "Create";
        return;
    }
    dialogTitle.textContent = "Edit Task";
    updatingTask = task.title;
    fillFromTask(task);

    submitButton.textContent = "Update";
}

function fillFromTask(task) {
    for (let prop in task) {
        if (!form.hasOwnProperty(prop)) {
            continue;
        }
        form[prop].value = task[prop];
    }
}

function hide() {
    formContainer.style.display = "";
    form.reset();
}

function submit() {
    if (!form.checkValidity()) {
        displayError("invalid form input");
        return false;
    }

    const formData = new FormData(form);
    const forProject = formData.get("forProject");
    sanitize(formData);
    if (readProject(forProject) === null) {
        throw new Error(`Can't create task for non existing project ${forProject}`)
    }

    //prevent duplicates, not an error as this is reasonable behaviour from user
    if (updatingTask === null && readTask(forProject, formData.get("title")) !== null) {
        displayError("a task with this name already exists");
        return false;
    }

    if (updatingTask !== null) {
        updateTask(forProject, updatingTask, formData);
    } else {
        createTask(formData);
    }
    form.reset();
    hide();
    return { success: true, projectName: forProject, taskName: formData.get("title") };
}

function displayError(message) {
    error.style.display = "block";
    error.textContent = "Couldn't create task : " + message;
}

function resetError() {
    error.style.display = "none";
}

function sanitize(formData) {
    //todo...
}

export { displayFor, hide };