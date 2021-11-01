import './style.css'
import { elements } from './js/views/base'
import TaskList from './js/models/TaskList'
import * as taskView from './js/views/taskView'
import * as modalView from './js/views/modalView'

const state = { idSelectedTask: null, taskList: new TaskList() }

elements.toggleBtn.addEventListener('click', () => {
  elements.toggleBtn.classList.toggle('enable')
  elements.body.classList.toggle('light')
  elements.body.classList.toggle('dark')
})

window.addEventListener('load', () => {
  state.taskList.loadStorage()
  taskView.renderTaskList(state.taskList.tasks)
})

elements.addButton.addEventListener('click', e => {
  e.preventDefault()
  if (!e.target.matches('.btn-add, .btn-add *')) return
  addTask()
})

elements.clearAllButton.addEventListener('click', e => {
  e.preventDefault()
  state.taskList.deleteAll()
  taskView.removeAllUI()
})

elements.clearCompletedButton.addEventListener('click', e => {
  e.preventDefault()
  state.taskList.deleteAllCompleted()
  taskView.removeAllCompletedUI()
})

elements.todolist.addEventListener('click', e => {
  if (e.target.matches('.btn-delete, .btn-delete *')) {
    const idTask = e.target.closest('.todolist__item').dataset.id
    state.taskList.deleteTask(idTask)
    taskView.removeTask(idTask)
  }

  if (e.target.matches('.btn-edit, .btn-edit *')) {
    const idTask = e.target.closest('.todolist__item').dataset.id
    state.idSelectedTask = idTask
    const taskDescription = state.taskList.getTaskDescription(idTask)
    modalView.showModal(taskDescription)
  }

  if (e.target.matches('.todolist__checkbox')) {
    const idTask = e.target.parentElement.dataset.id
    state.taskList.checkTask(idTask)
    taskView.checkTaskUI(idTask)
  }
})

elements.modal.addEventListener('click', e => {
  if (!e.target.matches('.modal__btn-edit')) return
  e.preventDefault()
  const newDescription = modalView.getInputValue()
  if (/^\s*$/.test(newDescription)) return
  state.taskList.updateDescription(state.idSelectedTask, newDescription)
  taskView.renderTaskList(state.taskList.tasks)
  modalView.hiddenModal()
})

elements.modal.addEventListener('click', e => {
  if (e.target.matches('.modal')) modalView.hiddenModal()
})

const addTask = () => {
  if (/^\s*$/.test(elements.taskInput.value)) return
  const taskDescription = elements.taskInput.value
  const newTask = state.taskList.addTask(taskDescription)
  taskView.renderTask(newTask)
  taskView.clearInput()
}
