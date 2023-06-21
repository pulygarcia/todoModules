import html from './app.html?raw';  // el ?raw le indica que cargue el archivo como texto para que lo lea el innerHTML y lo cree como html.
import todosStore from '../store/todos.store';
import { Filters } from '../store/todos.store';
import { Todo } from './models/todo-model';
import  {renderTodos, renderPendingsCount}  from '../use-cases';

const elementIds = {
    TodoList: '.todo-list',
    newTodoInput: '.new-todo',
    deleteTodoBtn: '.destroy',
    deleteCompletedBtn: '.clear-completed',
    filterButtons: '.filtro',
    pendingsCount: '#pending-count',
}

/**
 * 
 * @param {string} elementId 
 */
export const app = (elementId) => {

    const displayTodos = () => {
        const todos = todosStore.getTodos( todosStore.getCurrentFilter() );
        renderTodos( elementIds.TodoList, todos );
        updatePendingsCount();
    }

    const updatePendingsCount = () => {
        renderPendingsCount(elementIds.pendingsCount);
    }

    (() => {
        const app = document.createElement('DIV');
        app.innerHTML = html;

        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    
    //Elementos html
    const newTodoInput = document.querySelector(elementIds.newTodoInput),
          todoList = document.querySelector(elementIds.TodoList),
          clearCompletedBtn = document.querySelector(elementIds.deleteCompletedBtn),
          filterBtn = document.querySelectorAll(elementIds.filterButtons);

    //eventos
    newTodoInput.addEventListener('keyup', (e) => {
        if(e.keyCode !== 13) return; //keyCode 13 es la tecla Enter
        if(e.target.value.trim().length === 0) return;

        todosStore.addTodo(e.target.value); //push al array
        displayTodos(); //mostrarHTML
        newTodoInput.value = ''; //vaciar el campo
    })

    todoList.addEventListener('click', (e) => {
        const element = e.target.closest('[data-id]');
        
        todosStore.toggleTodo(element.getAttribute('data-id'));

        displayTodos();
    })

    todoList.addEventListener('click', (e) => {
        if(e.target.className !== 'destroy'){
            return;
        }

        const element = e.target.closest('[data-id]'),
              elementId = element.getAttribute('data-id');

        todosStore.deleteTodo(elementId);

        displayTodos();
    })

    clearCompletedBtn.addEventListener('click', () => {
        todosStore.deleteCompleted();

        displayTodos();
    })

    filterBtn.forEach(element => {
        element.addEventListener('click', (e) => {
            filterBtn.forEach(element => {
                element.classList.remove('selected');
            });

            element.classList.add('selected');

            const filter = e.target.text;
            switch (filter) {
                case 'Todos':
                    todosStore.setFilter(Filters.All);
                    displayTodos();
                    break;
                
                case 'Pendientes':
                    todosStore.setFilter(Filters.Pending);
                    displayTodos();
                    break;

                case 'Completados':
                    todosStore.setFilter(Filters.Completed);
                    displayTodos();
                    break;

                default:
                    break;
            }
        })
    })

}