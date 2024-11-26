import "./projectForm.css";
import * as string from "string-sanitizer";
import { createProject } from "./data.js";

const field = document.querySelector(".project-form");
function toggleDisplay() {
    const button = document.querySelector(".add-project-button");
    const displayed = field.style.display !== "";
    button.textContent = displayed ? "+" : "-";
    field.style.display = displayed ? "" : "block";
}

//returns empty string on failure
function submit(projectName) {

    if (!field.checkValidity()) {
        return "";
    }

    const sanitizedName = string.sanitize(projectName);
    try {
        createProject(sanitizedName);
    } catch (e) {
        return "";
    }
    field.value = "";
    toggleDisplay();
    return sanitizedName;
}

export { toggleDisplay, submit };