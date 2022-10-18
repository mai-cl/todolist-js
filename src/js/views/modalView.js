import { elements } from './base'

export const showModal = taskDescription => {
  const markup = `
    <div class="modal__container">
      <h2 class="modal__title">Editar tarea</h2>
      <form>
        <div class="form-group">
          <input type="text" class="text-input modal__input-edit" value="${taskDescription}" />
          <button class="btn modal__btn-edit">
            Editar
          </button>
        </div>
      </form>
    </div>
    
  `
  elements.modal.insertAdjacentHTML('afterbegin', markup)
  elements.modal.classList.add('show')
}

export const hiddenModal = () => {
  elements.modal.innerHTML = ''
  elements.modal.classList.remove('show')
}

export const getInputValue = () =>
  elements.modal.querySelector('.modal__input-edit').value
