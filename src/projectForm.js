import "./projectForm.css";
import * as string from "string-sanitizer";
import { createProject, readProject } from "./data.js";

const projectCreateField = document.querySelector(".project-form");
const projectCreateFormDisplayButton = document.querySelector(".add-project-button");
const errorMessage = document.querySelector(".project-create-error");

//calls supplied callback on successful project creation
function init(onProjectCreated) {

    projectCreateFormDisplayButton.addEventListener("click", toggleDisplay);

    projectCreateField.addEventListener("keydown", event => {
        if (event.keyCode !== 13) {
            return;
        }

        const createdName = submit(projectCreateField.value);
        if (createdName !== "") {
            onProjectCreated(createdName);
        }
    });
}


function toggleDisplay() {
    const displayed = projectCreateField.style.display !== "";
    projectCreateFormDisplayButton.textContent = displayed ? "+" : "-";
    projectCreateField.style.display = displayed ? "" : "block";
    resetError();
    if (!displayed) {
        projectCreateField.focus();
    }
}

//returns empty string on failure and new project name on success
function submit(projectName) {

    if (!projectCreateField.checkValidity()) {
        displayError("invalid input");
        return "";
    }

    const sanitizedName = string.sanitize(projectName);
    if (readProject(projectName) !== null) {
        displayError("project with this name already exists");
        return "";
    }
    createProject(sanitizedName);
    projectCreateField.value = "";
    toggleDisplay();
    return sanitizedName;
}

function displayError(message) {
    errorMessage.style.display = "block";
    errorMessage.textContent = "Couldn't create project : " + message;
}

function resetError() {
    errorMessage.style.display = "none";
}

export { toggleDisplay, submit, init };