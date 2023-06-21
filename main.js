import './style.css';
import {app} from './src/todos/app.js';
import toDoStore from './src/store/todos.store.js';

toDoStore.initStore();
app('#app');
