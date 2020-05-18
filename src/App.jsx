import React from 'react';
import { Provider } from 'react-redux';

import configureStore from './store';
import Routes from './routes';

export const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
