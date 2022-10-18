import { elements } from './base'

export const renderTaskList = tasklist => {
  deleteAll()
  tasklist.forEach(cur => renderTask(cur))
}

export const renderTask = task => {
  const markup = `
        <li class="todolist__item ${
          task.isChecked ? 'checked' : ''
        }" data-id="${task.id}">
            <span class="todolist__checkbox" data-action="check"></span>
            <div class="todolist__text">
                ${task.description}
            </div>
            <button class="btn btn-task btn-edit" data-action="edit">
              <i class="fas fa-pencil-alt"></i>
            </button>
            <button class="btn btn-task btn-delete" data-action="delete">
              <i class="far fa-trash-alt"></i>
            </button>
        </li>
    `
  elements.todolist.insertAdjacentHTML('beforeend', markup)
}

export const toggleCheckTask = taskId => {
  const item = document.querySelector(`.todolist__item[data-id="${taskId}"]`)
  item.classList.toggle('checked')
}

export const deleteAll = () => {
  elements.todolist.innerHTML = ''
}

export const deleteAllCompleted = () => {
  const checkedTasks = elements.todolist.querySelectorAll(
    '.todolist__item.checked'
  )
  const checkedTasksArr = Array.from(checkedTasks)
  checkedTasksArr.forEach(task => task.remove())
}

export const deleteTask = taskId => {
  const item = document.querySelector(`.todolist__item[data-id="${taskId}"]`)
  item.classList.add('todolist__item-delete')
}

export const onDeleteAnimationEnd = e => {
  const item = e.target
  if (item.matches('.todolist__item-delete')) item.remove()
}

export const clearInput = () => (elements.taskInput.value = '')
