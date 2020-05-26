import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import reduxCookiesMiddleware, { getStateFromCookies } from 'redux-cookies-middleware';

import createRootReducer from './ducks';
import rootSaga from './sagas';

const INITIAL_STATE = {
  authorization: { tokenType: null, accessToken: null, client: null, uid: null },
};

const COOKIES_PATHS = {
  'authorization.tokenType': { name: 'auth_token_type' },
  'authorization.accessToken': { name: 'auth_token' },
  'authorization.client': { name: 'client_id' },
  'authorization.uid': { name: 'user_uid' },
};

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const initialState = getStateFromCookies(INITIAL_STATE, COOKIES_PATHS);

const getStoreWithMiddleware = () =>
  createStore(
    createRootReducer(history), // root reducer with router state
    { ...initialState, ...preloadedState },
    compose(
      applyMiddleware(
        createLogger(),
        routerMiddleware(history), // for dispatching history actions
        sagaMiddleware,
        reduxCookiesMiddleware(COOKIES_PATHS),
        // ... other middlewares ...
      ),
    ),
  );

export default function configureStore(preloadedState) {
  let store;

  if (process.env.NODE_ENV !== 'test') {
    store = getStoreWithMiddleware();
    sagaMiddleware.run(rootSaga);
  } else {
    store = createStore(createRootReducer(), { ...preloadedState });
  }

  return store;
}
