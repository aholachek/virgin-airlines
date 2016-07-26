import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import configureStore from 'store/index'
import { Provider } from 'react-redux'

let store = configureStore();

// Render the main component into the dom
ReactDOM.render(
  <Provider store={ store }>
    <App/>
  </Provider>,
    document.getElementById('app')
  );
