import { elements } from "./base";

export const showModal = (taskDescription) => {
  console.log("runshowmodal");
  const markup = `
    <div class="modal__container">
      <h2 class="modal__title">Editar tarea</h2>
      <form>
        <div class="form-group">
          <input type="text" class="taskform__input" value="${taskDescription}" />
          <button class="btn modal__btn">
            Editar
          </button>
        </div>
      </form>
    </div>
    
  `;
  elements.modal.insertAdjacentHTML("afterbegin", markup);
  elements.modal.classList.add("show");
};

export const hiddenModal = () => {
  elements.modal.innerHTML = "";
  elements.modal.classList.remove("show");
};
