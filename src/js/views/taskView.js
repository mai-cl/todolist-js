import { elements } from "./base";

export const renderTaskList = tasklist => {
    tasklist.forEach(cur => renderTask(cur));
}

export const renderTask = task => {
    const markup = `
        <li class="todolist__item ${task.isChecked ? 'checked' : ''}" data-id="${task.id}">
            <span class="todolist__checkbox"></span>
            <div class="todolist__text">
                ${task.description}
            </div>
            <button class="btn btn-delete">
                <ion-icon name="trash-outline" class="icon-medium"></ion-icon>
            </button>
        </li>
    `;
    elements.todolist.insertAdjacentHTML('beforeend', markup);
}

export const checkTaskUI = taskId => {
    const item = document.querySelector(`.todolist__item[data-id="${taskId}"]`);
    item.classList.toggle('checked');
}

export const removeAllUI = () => {
    elements.todolist.innerHTML = '';
}

export const removeAllCompletedUI = () => {
    const checkedTasks = elements.todolist.querySelectorAll('.todolist__item.checked');
    const checkedTasksArr = Array.from(checkedTasks);
    checkedTasksArr.forEach(task => task.parentElement.removeChild(task));
}

export const removeTask = taskId => {
    const item = document.querySelector(`.todolist__item[data-id="${taskId}"]`);
    item.classList.add('todolist__item-delete');
}

export const clearInput = () => elements.taskInput.value = '';

elements.todolist.addEventListener('animationend', e => {
    const target = e.target;
    if (target.matches('li')) target.parentElement.removeChild(target);
})