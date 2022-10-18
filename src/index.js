import './style.css'
import { elements } from './js/views/base'
import TaskList from './js/models/TaskList'
import * as taskView from './js/views/taskView'
import * as modalView from './js/views/modalView'
import { isEmpty } from './js/utils'

const state = { idSelectedTask: null, taskList: new TaskList() }

const taskActions = {
  check: function () {
    state.taskList.toggleCheckTask(state.idSelectedTask)
    taskView.toggleCheckTask(state.idSelectedTask)
  },
  edit: function () {
    const taskDescription = state.taskList.getTaskDescription(
      state.idSelectedTask
    )
    modalView.showModal(taskDescription)
  },
  delete: function () {
    state.taskList.deleteTask(state.idSelectedTask)
    taskView.deleteTask(state.idSelectedTask)
  },
}

function addTask() {
  if (isEmpty(elements.taskInput.value)) return
  const taskDescription = elements.taskInput.value
  const newTask = state.taskList.addTask(taskDescription)
  taskView.renderTask(newTask)
  taskView.clearInput()
}

function onClickToggleThemeBtn() {
  elements.toggleBtn.classList.toggle('enable')
  elements.body.classList.toggle('light')
  elements.body.classList.toggle('dark')
}

function onLoadPage() {
  state.taskList.loadStorage()
  taskView.renderTaskList(state.taskList.tasks)
}

function onClickAddButton(e) {
  e.preventDefault()
  addTask()
}

function onClickClearAllButton() {
  state.taskList.deleteAll()
  taskView.deleteAll()
}

function onClickClearCompletedButton() {
  state.taskList.deleteAllCompleted()
  taskView.deleteAllCompleted()
}

function onClickTaskActions(e) {
  state.idSelectedTask = e.target.closest('.todolist__item').dataset.id
  const actionElement = e.target.closest('.btn-task, .todolist__checkbox')
  if (!actionElement) return
  const action = actionElement.dataset.action
  taskActions[action]()
}

function onClickModalEditButton(e) {
  if (!e.target.matches('.modal__btn-edit')) return
  e.preventDefault()
  const newDescription = modalView.getInputValue()
  if (isEmpty(newDescription)) return
  state.taskList.updateDescription(state.idSelectedTask, newDescription)
  taskView.renderTaskList(state.taskList.tasks)
  modalView.hiddenModal()
}

function onClickModalOutside(e) {
  if (e.target.matches('.modal')) modalView.hiddenModal()
}

window.addEventListener('load', onLoadPage)
elements.toggleBtn.addEventListener('click', onClickToggleThemeBtn)
elements.addButton.addEventListener('click', onClickAddButton)
elements.clearAllButton.addEventListener('click', onClickClearAllButton)
elements.clearCompletedButton.addEventListener(
  'click',
  onClickClearCompletedButton
)
elements.todolist.addEventListener('click', onClickTaskActions)
elements.modal.addEventListener('click', onClickModalEditButton)
elements.modal.addEventListener('click', onClickModalOutside)
elements.todolist.addEventListener(
  'animationend',
  taskView.onDeleteAnimationEnd
)
