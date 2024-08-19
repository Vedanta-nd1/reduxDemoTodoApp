import React, {useState} from 'react';
import {connect} from 'react-redux';
import {AddTodo, RemoveTodo, ToggleTodo} from '../redux/actions/todoAction/todoActions';
import {styles} from './TodoStyles';
import {
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const Todo = ({ todos, addTodo, removeTodo, toggleTodo }) => {
  const [todoValue, setTodoValue] = useState('');

  const handleAddTodo = () => {
    if (todos && !todos.find(todo => todo.text === todoValue)) {
      addTodo({ text: todoValue, completed: false });
      setTodoValue('');
    } else {
      alert(`${todoValue} already added in Todo List`);
    }
  };

  const handleRemoveTodo = item => {
    removeTodo(item);
  };

  const handleToggleTodo = item => {
    toggleTodo(item);
  };

  const renderTodoList = () => {
    return (
      <FlatList
        data={todos}
        keyExtractor={(item, index) => item.text + index.toString()} // Ensures a unique key
        extraData={todos} // Ensures FlatList re-renders when todos change
        renderItem={({item}) => (
          <View style={styles.todoView}>
            <TouchableOpacity
              style={styles.todoList}
              onPress={() => handleToggleTodo(item)}>
              <Text
                style={[
                  { padding: 7 },
                  item.completed && { textDecorationLine: 'line-through', color: 'gray' }
                ]}
              >
                {item.text}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.removeTodo}
              onPress={() => handleRemoveTodo(item)}>
              <Text style={{color: 'red', fontWeight: '700', fontSize: 22}}> X </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    );
  };

  return (
    <View style={styles.main}>
      <TextInput
        style={styles.mainInput}
        onChangeText={setTodoValue}
        placeholder={'Add your todo here'}
        value={todoValue}
      />
      <Button name="increase" title="Add Todo" onPress={handleAddTodo} />

      <Text style={{alignSelf: 'stretch', paddingLeft: 40}}>
        List of Todos:
      </Text>
      {renderTodoList()}
    </View>
  );
};

// Map state to props
const mapStateToProps = (state) => ({
  todos: state.todos.todos,
});

// Map dispatch to props
const mapDispatchToProps = {
  addTodo: AddTodo,
  removeTodo: RemoveTodo,
  toggleTodo: ToggleTodo,
};

// Connect the component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(Todo);
