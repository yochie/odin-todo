import "./taskDialog.css";
import * as taskForm from "./taskForm.js";
import * as taskInfoView from "./taskInfoView.js";

const dialog = document.querySelector(".task-dialog");
const closeButton = document.querySelector(".task-dialog-close");
closeButton.addEventListener("click", (e) => {
  e.stopPropagation();
  closeAll();
});

document.addEventListener("task-form-submitted", (event) => {
  closeAll();
  // todo : read event data to highligh created task/project combo
});

function closeAll() {
  taskInfoView.hide();
  taskForm.hide();
  dialog.close();
}

function displayTaskInfo(task, project) {
  taskForm.hide();
  taskInfoView.displayFor(task, project);
  dialog.showModal();
}

function displayTaskEditForm(task, project) {
  taskInfoView.hide();
  taskForm.displayFor(task, project);
  dialog.showModal();
}

function displayTaskCreateForm(project) {
  taskInfoView.hide();
  taskForm.displayFor(null, project);
  dialog.showModal();
}

export {
  displayTaskInfo,
  displayTaskEditForm,
  displayTaskCreateForm,
  closeAll as close,
};
