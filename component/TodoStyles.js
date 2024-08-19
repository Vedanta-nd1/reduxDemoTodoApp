import { color } from 'mocha/lib/reporters/base';
import {StyleSheet, Dimensions} from 'react-native';

let width = Dimensions.get('window').width;

const TodoStyles = {
  main: {
    alignItems: 'center',
  },
  mainInput: {
    borderWidth: 1,
    height: 55,
    width: width * 0.9,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    borderRadius: 9,
  },
  todoList: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    width: width * 0.8,
    height: 40,
  },
  todoView: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    padding: 5,
  },
  removeTodo: {
    borderRadius: 4,
    alignItems: 'center',
    margin: 4,
  },
};
export const styles = StyleSheet.create(TodoStyles);
