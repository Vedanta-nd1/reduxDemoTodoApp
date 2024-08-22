import {ADD_TODO, REMOVE_TODO, TOGGLE_TODO} from '../actions/todoAction/ActionTypes';

const INITIAL_STATE = {todos: [{text: 'Learn Redux', completed: false}, {text:'Learn React', completed: false}]};

// Example reducer snippet
const todoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload] // Returning a new array
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.text !== action.payload.text)
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.text === action.payload.text
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    default:
      return state;
  }
};


export default todoReducer;
