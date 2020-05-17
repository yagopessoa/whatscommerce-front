import { createActions, createReducer } from 'reduxsauce';

/**
 * Action types & creators
 */
export const { Types: UserTypes, Creators: UserActions } = createActions({
  login: ['email', 'password'],
  updateUser: ['email', 'name'],
  logout: [],
});

/**
 * Handlers
 */
const INITIAL_STATE = { email: null, name: null };

const login = (_, { email, password }) => ({ email, password });

const updateUser = (_, { email, name }) => ({ email, name });

const logout = () => ({ email: null, name: null });

/**
 * Reducer
 */
export default createReducer(INITIAL_STATE, {
  [UserTypes.LOGIN]: login,
  [UserTypes.UPDATE_USER]: updateUser,
  [UserTypes.LOGOUT]: logout,
});
