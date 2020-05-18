import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import user from './user';
import authorization from './authorization';

const createReducer = history =>
  combineReducers({
    router: connectRouter(history),
    user,
    authorization,
  });

export default createReducer;
