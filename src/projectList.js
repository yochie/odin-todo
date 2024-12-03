import "./projectList.css";
const buttons = [];
const SELECTED_BUTTON_CLASS = "selected";

function generate(projects, onSelect) {
    const container = document.querySelector(".project-list");

    const ul = document.querySelector(".project-list ul");
    ul.replaceChildren();
    ul.role = "list";

    for (let projectName of projects) {
        const entry = document.createElement("li");
        const button = document.createElement("button");
        button.classList.add("project-select-button");
        button["data-attribute"] = projectName;
        button.textContent = projectName;
        button.addEventListener("click", event => {
            onSelect(projectName);
            highlight(projectName)
        });
        entry.appendChild(button);
        buttons.push(button);
        ul.appendChild(entry);
    }
}

function highlight(projectName) {
    for (let button of buttons) {
        if (button["data-attribute"] === projectName) {
            button.classList.add(SELECTED_BUTTON_CLASS);
        } else {
            button.classList.remove(SELECTED_BUTTON_CLASS);
        }
    }
}

export { generate, highlight };