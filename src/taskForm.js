import "./taskForm.css";
import { createTask } from "./data.js";

const formContainer = document.querySelector(".task-form-container")
const form = document.querySelector(".task-form");
const button = document.querySelector(".add-task-button");

function toggleDisplay() {
    const displayed = formContainer.style.display !== "";
    button.textContent = displayed ? "+" : "-";
    formContainer.style.display = displayed ? "" : "block";
}

function submit(forProject) {
    if(!form.checkValidity()){
        return false;
    }

    const formData = new FormData(form);

    sanitize(formData);
    formData.append("forProject", forProject);
    createTask(formData);
    form.reset();
    toggleDisplay();
    return true;
}

function sanitize(formData){
    //todo...
}

export { toggleDisplay, submit };