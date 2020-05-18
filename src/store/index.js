import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
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

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    { ...initialState, ...preloadedState },
    compose(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        sagaMiddleware,
        reduxCookiesMiddleware(COOKIES_PATHS),
        // ... other middlewares ...
      ),
    ),
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
