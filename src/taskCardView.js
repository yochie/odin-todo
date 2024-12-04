import './taskCardView.css'
import { displayTaskInfo } from './taskDialog.js'
import { taskPrinter } from './taskInfoView.js'

function createTaskCard (task, forProject, onDelete) {
  const card = document.createElement('div')
  card.classList.add('task-card')

  const titleRow = document.createElement('div')
  titleRow.classList.add('title-row')
  const taskTitle = document.createElement('h3')
  taskTitle.textContent = task.title
  titleRow.appendChild(taskTitle)

  const deleteButton = document.createElement('button')
  deleteButton.classList.add('delete-button')
  deleteButton.addEventListener('click', (e) => {
    e.stopPropagation()
    onDelete(forProject, task.title)
  })
  titleRow.appendChild(deleteButton)

  card.appendChild(titleRow)

  if (task.dueDate !== '') {
    taskPrinter.printSingleValue(card, task, 'dueDate')
  }

  card.addEventListener('click', (e) => {
    displayTaskInfo(task, forProject)
  })
  return card
}

export { createTaskCard }
