import { Todo } from "../todos/models/todo-model";
import { createTodo } from "./create-todo-html";

/**
 * 
 * @param {string} elementId 
 * @param {Todo} todos 
 */
export const renderTodos = (elementId, todos = []) => {
    const elementHtml = document.querySelector(elementId);

    elementHtml.innerHTML = '';

    todos.forEach(todo => {
        elementHtml.append( createTodo(todo) )
    });
}