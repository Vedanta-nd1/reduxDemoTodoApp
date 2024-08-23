import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import Todo from './component/Todo';
import rootReducer from './redux/reducers/rootReducer';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

class App extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const loggerMiddleware = createLogger();
    const enhancer = applyMiddleware(thunkMiddleware, loggerMiddleware);

    const persistConfig = {
      key: 'root',
      storage: AsyncStorage,
      whitelist: ['todos']
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const store = createStore(persistedReducer,{}, enhancer);
    const persistor = persistStore(store);

    
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Todo />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
