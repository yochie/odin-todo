import "./projectView.css"

function renderProject(project) {
    const nameNode = document.querySelector(".project-name");
    nameNode.textContent = project.name;


    const taskContainer = document.querySelector(".tasks-container");
    for (let task of project.getTaskList()) {
        const card = createTaskCard(task);
        taskContainer.appendChild(card);
    }
}

function createTaskCard(task) {
    const card = document.createElement("div");
    card.classList.add("task-card");

    const taskTitle = document.createElement("h3");
    taskTitle.textContent = task.title;

    card.appendChild(taskTitle);
    return card;
}

export {
    renderProject
};