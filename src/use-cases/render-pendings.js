import todosStore, { Filters } from "../store/todos.store";

export const renderPendingsCount = (elementId) => {
    const element = document.querySelector(elementId);

    element.innerHTML = todosStore.getTodos(Filters.Pending).length;
}