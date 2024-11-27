import "./projectForm.css";
import * as string from "string-sanitizer";
import { createProject, readProject } from "./data.js";

const field = document.querySelector(".project-form");
const button = document.querySelector(".add-project-button");
const error = document.querySelector(".project-create-error");
function toggleDisplay() {
    const displayed = field.style.display !== "";
    button.textContent = displayed ? "+" : "-";
    field.style.display = displayed ? "" : "block";
    resetError();
    if(!displayed){
        field.focus();
    }
}

//returns empty string on failure
function submit(projectName) {

    if (!field.checkValidity()) {
        displayError("invalid input");
        return "";
    }

    const sanitizedName = string.sanitize(projectName);
    if(readProject(projectName) !== null){
        displayError("project with this name already exists");
        return "";
    }
    createProject(sanitizedName);
    field.value = "";
    toggleDisplay();
    return sanitizedName;
}

function displayError(message){
    error.style.display = "block";
    error.textContent = "Couldn't create project : " + message;
}

function resetError(){
    error.style.display = "none";
}

export { toggleDisplay, submit };