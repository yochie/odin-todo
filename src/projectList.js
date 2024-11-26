import "./projectList.css";
const buttons = [];
const SELECTED_BUTTON_CLASS = "selected";

function initProjectList(projects) {
    const container = document.querySelector(".project-list");

    const title = document.createElement("h2");
    title.textContent = "Projects";
    container.appendChild(title);

    const ul = document.createElement("ul");
    ul.role = "list";

    for (let projectName of projects) {
        const entry = document.createElement("li");
        const button = document.createElement("button");
        button["data-attribute"] = projectName;
        button.textContent = projectName;
        entry.appendChild(button);
        buttons.push(button);
        ul.appendChild(entry);
    }
    container.appendChild(ul);
}

function select(projectName){
    for(let button of buttons){
        if(button["data-attribute"] === projectName){
            button.classList.add(SELECTED_BUTTON_CLASS);
        } else {
            button.classList.remove(SELECTED_BUTTON_CLASS);
        }
    }
}

export { initProjectList, select };