import { createActions, createReducer } from 'reduxsauce';

export const { Types: AuthTypes, Creators: AuthActions } = createActions({
  updateAuth: ['tokenType', 'accessToken', 'client', 'uid'],
  clearAuth: [],
  checkAuth: [],
});

const INITIAL_STATE = { isAuthenticating: true };

const updateAuth = ({ accessToken: oldToken }, { tokenType, accessToken, client, uid }) => ({
  isAuthenticating: false,
  tokenType,
  accessToken: accessToken ? accessToken : oldToken,
  client,
  uid,
});
const clearAuth = () => ({ tokenType: null, accessToken: null, client: null, uid: null });
const checkAuth = state => ({ isAuthenticating: true, ...state });

export default createReducer(INITIAL_STATE, {
  [AuthTypes.UPDATE_AUTH]: updateAuth,
  [AuthTypes.CLEAR_AUTH]: clearAuth,
  [AuthTypes.CHECK_AUTH]: checkAuth,
});
