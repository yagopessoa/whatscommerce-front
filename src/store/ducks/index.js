import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import user from './user';

const createReducer = history =>
  combineReducers({
    router: connectRouter(history),
    user,
  });

export default createReducer;
