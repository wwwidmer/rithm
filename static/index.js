import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Page from './components/Page';

import store from './store';


ReactDOM.render(
  <Provider store={store}>
    <Page />
  </Provider>,
  document.getElementById('content')
);
