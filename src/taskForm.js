import "./taskForm.css";
import { createTask, readTask, readProject } from "./data.js";

const formContainer = document.querySelector(".task-form-container")
const form = document.querySelector(".task-form");
const button = document.querySelector(".add-task-button");
const error = document.querySelector(".task-create-error");

function toggleDisplay() {
    const displayed = formContainer.style.display !== "";
    button.textContent = displayed ? "+" : "-";
    formContainer.style.display = displayed ? "" : "block";
    resetError();
    if(!displayed){
        form["title"].focus();
    }
}

function submit(forProject) {
    if (!form.checkValidity()) {
        displayError("invalid form input");
        return false;
    }

    const formData = new FormData(form);

    sanitize(formData);
    formData.append("forProject", forProject);
    if(readProject(forProject) === null){
        throw new Error(`Can't create task for non existing project ${forProject}`)
    }

    //prevent duplicates, not an error as this is reasonable behaviour from user
    if(readTask(forProject, formData.get("title")) !== null){
        displayError("a task with this name already exists");
        return false;
    }

    createTask(formData);
    form.reset();
    toggleDisplay();
    return true;
}

function displayError(message){
    error.style.display = "block";
    error.textContent = "Couldn't create task : " + message;
}

function resetError(){
    error.style.display = "none";
}

function sanitize(formData) {
    //todo...
}

export { toggleDisplay, submit };