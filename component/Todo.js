import React, { Component } from 'react';
import { connect } from 'react-redux';
import { styles } from './TodoStyles';
import {
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import * as TodoActions from '../redux/actions/todoAction/todoActions';
import { bindActionCreators } from 'redux';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoValue: '',
    };
  }

  handleAddTodo = () => {
    const { todos } = this.props;
    const { todoValue } = this.state;
    if (todos && !todos.find(todo => todo.text === todoValue)) {
      this.props.AddTodo({ text: todoValue, completed: false });
      this.setState({ todoValue: '' });
    } else {
      alert(`${todoValue} already added in Todo List`);
    }
  };

  handleRemoveTodo = (item) => {
    this.props.RemoveTodo(item);
  };

  handleToggleTodo = (item) => {
    this.props.ToggleTodo(item);
  };

  handleAddRandomTodo = async () => {
    this.props.AddRandomTodo();
  };

  renderTodoList = () => {
    const { todos } = this.props;

    return (
      <FlatList
        data={todos}
        keyExtractor={(item, index) => item.text + index.toString()} // Ensures a unique key
        extraData={todos} // Ensures FlatList re-renders when todos change
        renderItem={({ item }) => (
          <View style={styles.todoView}>
            <TouchableOpacity
              style={styles.todoList}
              onPress={() => this.handleToggleTodo(item)}
            >
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
              onPress={() => this.handleRemoveTodo(item)}
            >
              <Text style={{ color: 'red', fontWeight: '700', fontSize: 22 }}> X </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    );
  };

  render() {
    return (
      <SafeAreaView style={[styles.main, {flex: 1}]}>
        <View style={{flexDirection: 'row', margin: 5}}>
          <View style={{flex: 3}}>
            <TextInput
              style={{flex: 5, borderWidth: 1, borderRadius: 9}}
              onChangeText={(todoValue) => this.setState({ todoValue })}
              placeholder={'Add your todo here'}
              value={this.state.todoValue}
            />
          </View>
          <View style={{flex: 1, marginHorizontal: 7}}>
            <Button title="Add Todo" onPress={this.handleAddTodo} />
          </View>
        </View>
        <Text style={{ fontSize: 24, alignSelf: 'flex-start', fontWeight: 'bold', padding: 5 }}>
          List of Todos:
        </Text>
        {this.renderTodoList()}

        <Button name="Add random todo" title="Add random todo" onPress={this.handleAddRandomTodo} />
      </SafeAreaView>
    );
  }
}

// Map state to props
const mapStateToProps = (todoReducer) => {
  return {
    todos: todoReducer.todos.todos
  };
};

// Map dispatch to props
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(TodoActions, dispatch);
};

// Connect the component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(Todo);
