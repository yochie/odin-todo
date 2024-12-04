import './taskInfoView.css'
import { Printer, Printout, DatePrintout } from './Printer.js'
import { displayTaskEditForm } from './taskDialog.js'

const taskPrinter = new Printer()
taskPrinter.addPrintout('forProject', new Printout('Project'))
taskPrinter.addPrintout('title', new Printout('Task'), ['bold'])
taskPrinter.addPrintout('dueDate', new DatePrintout('Due by'))
taskPrinter.addPrintout('priority', new Printout('Priority'))
taskPrinter.addPrintout('description', new Printout('Description'))
taskPrinter.addPrintout('notes', new Printout('Notes'))

const container = document.querySelector('.task-info-container')
const closeButton = document.querySelector('.task-dialog-close')
const dialogTitle = document.querySelector('.task-dialog-title')

function displayFor (task, project) {
  dialogTitle.textContent = 'Task'
  closeButton.setAttribute('autofocus', '')
  container.replaceChildren()
  task.forProject = project
  taskPrinter.print(container, task)

  const editButton = document.createElement('button')
  editButton.classList.add('task-edit-button')
  editButton.classList.add('mybutton')
  editButton.textContent = 'Edit'
  editButton.addEventListener('click', (e) => {
    displayTaskEditForm(task, project)
    e.stopPropagation()
  })
  container.appendChild(editButton)
}

function hide () {
  container.replaceChildren()
  closeButton.removeAttribute('autofocus')
}

export { displayFor, hide, taskPrinter }
