function setup(element, task){
    const dialog = document.createElement("dialog");

    const title = document.createElement("h2");
    title.textContent = task.title;
    dialog.appendChild(title);


    element.appendChild(dialog);

    element.addEventListener("click", (e) => {
        dialog.showModal();
    });
}

export { setup }