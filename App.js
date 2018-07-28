import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import Reducers from './src/Reducers';
import Preload from './src/screens/Preload';
import Home    from './src/screens/Home';
import SignIn  from './src/screens/SignIn';
import SignUp  from './src/screens/SignUp';
import Conversation from './src/screens/Conversation';

console.disableYellowBox = true;

let store = createStore(Reducers, applyMiddleware(ReduxThunk));

const Navegador = StackNavigator({

  Preload:{
    screen:Preload
  },
  Conversation:{
    screen:Conversation,
    
  },
  Home:{
    screen:Home
  },
  SignIn:{
    screen:SignIn
  },
  SignUp:{
    screen:SignUp
  }
});

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navegador />
      </Provider>
    );
  }
}