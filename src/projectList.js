import "./projectList.css";

function renderProjectList(projects) {
    const container = document.querySelector(".project-list");

    const title = document.createElement("h2");
    title.textContent = "Projects";
    container.appendChild(title);

    const ul = document.createElement("ul");
    ul.role = "list";

    for(let projectName of projects){
        const entry = document.createElement("li");
        const button = document.createElement("button");
        button.textContent = projectName;
        entry.appendChild(button);
        ul.appendChild(entry);
    }
    container.appendChild(ul);
}

export { renderProjectList };