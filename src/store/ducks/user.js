import { createActions, createReducer } from 'reduxsauce';

/**
 * Action types & creators
 */
export const { Types: UserTypes, Creators: UserActions } = createActions({
  login: ['email', 'password'],
  signup: ['name', 'email', 'password', 'passwordConfirmation'],
  updateUser: ['email', 'name'],
  logout: [],
});

/**
 * Handlers
 */
const INITIAL_STATE = { email: null, name: null };

const updateUser = (state, { email, name }) => ({ ...state, email, name });

/**
 * Reducer
 */
export default createReducer(INITIAL_STATE, {
  [UserTypes.UPDATE_USER]: updateUser,
});
