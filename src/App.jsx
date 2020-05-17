import React from 'react';
import { Provider } from 'react-redux';

// import store from './store';
import configureStore from './store';
import Routes from './routes';

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
