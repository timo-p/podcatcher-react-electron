import React from 'react';
import { render } from 'react-dom';
import App from './App';
import store, { persistor, history } from './process.store';

render(
  <App store={store} persistor={persistor} history={history} />,
  document.getElementById('root')
);
