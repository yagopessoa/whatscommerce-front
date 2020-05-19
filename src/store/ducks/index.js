import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import user from './user';
import authorization from './authorization';
import company from './company';

const createReducer = history =>
  combineReducers({
    router: connectRouter(history),
    user,
    authorization,
    company,
  });

export default createReducer;
