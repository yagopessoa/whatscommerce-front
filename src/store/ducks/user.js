import { createActions, createReducer } from 'reduxsauce';

/**
 * Action types & creators
 */
export const { Types, Creators: UserActions } = createActions({
  login: ['email', 'name'],
  logout: [],
});

/**
 * Handlers
 */
const INITIAL_STATE = { email: null, name: null };

const login = (_, { email, name }) => ({ email, name });

const logout = () => ({ email: null, name: null });

/**
 * Reducer
 */
export default createReducer(INITIAL_STATE, {
  [Types.LOGIN]: login,
  [Types.LOGOUT]: logout,
});
