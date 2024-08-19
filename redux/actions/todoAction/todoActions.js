import {ADD_TODO, REMOVE_TODO, TOGGLE_TODO} from './ActionTypes';

export const AddTodo = payload => ({type: ADD_TODO, payload});

export const RemoveTodo = payload => ({type: REMOVE_TODO, payload});

export const ToggleTodo = payload => ({type: TOGGLE_TODO, payload});