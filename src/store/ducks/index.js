import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import user from './user';
import authorization from './authorization';
import company from './company';

const createReducer = history => {
  const nonTestReducers = process.env.NODE_ENV !== 'test' ? { router: connectRouter(history) } : {};

  return combineReducers({
    ...nonTestReducers,
    user,
    authorization,
    company,
  });
};
export default createReducer;
