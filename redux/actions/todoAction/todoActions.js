import {ADD_TODO, REMOVE_TODO, TOGGLE_TODO, ADD_RANDOM_TODO} from './ActionTypes';

export const AddTodo = payload => ({type: ADD_TODO, payload});

export const RemoveTodo = payload => ({type: REMOVE_TODO, payload});

export const ToggleTodo = payload => ({type: TOGGLE_TODO, payload});

export const AddRandomTodo = () => {
    const deviceIP = "172.16.21.203"; // obtain using : "ifconfig en0 | grep 'inet ' | awk '{print $2}'"
    
    return async (dispatch) => {
        try {
            const response = await fetch(`http://${deviceIP}:8000/api/todos`);
            const randomTodos = await response.json();

      if (Array.isArray(randomTodos) && randomTodos.length > 0) {
        const randomTodo = {
          text: randomTodos[0], // Assuming it's a string
          completed: false,
        };

        dispatch({
          type: ADD_RANDOM_TODO,
          payload: randomTodo,
        });
      }
    } catch (error) {
      console.error('Failed to fetch random todos:', error);
    }
  };
};
