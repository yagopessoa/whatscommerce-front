import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { userLogin, checkAuth, userLogout } from '../services/api';
import { UserTypes } from './ducks/user';
import { AuthTypes } from './ducks/authorization';

const { LOGIN, UPDATE_USER, LOGOUT } = UserTypes;
const { CHECK_AUTH, UPDATE_AUTH, CLEAR_AUTH } = AuthTypes;

function* requestLogin(payload) {
  const response = yield call(userLogin, payload);

  if (response?.status) {
    const {
      data: {
        data: { email, name },
      },
      headers: { 'token-type': tokenType, 'access-token': accessToken, client, uid },
    } = response;

    yield put({ type: UPDATE_USER, email, name });
    yield put({ type: UPDATE_AUTH, tokenType, accessToken, client, uid });

    yield put(push('/administrative'));
  }
}

function* validateToken() {
  const response = yield call(checkAuth);

  if (response?.status) {
    const {
      data: {
        data: { email, name },
        success,
      },
      headers: { 'token-type': tokenType, 'access-token': accessToken, client, uid },
    } = response;

    if (success) {
      yield put({ type: UPDATE_USER, email, name });
      yield put({
        type: UPDATE_AUTH,
        tokenType,
        accessToken: accessToken ? accessToken : null,
        client,
        uid,
      });
    } else {
      yield put({ type: CLEAR_AUTH });
      yield put(push('/'));
    }
  }
}

function* requestLogout(payload) {
  yield call(userLogout, payload);

  yield put({ type: UPDATE_USER, email: null, name: null });
  yield put({ type: CLEAR_AUTH });

  yield put(push('/'));
}

export default function* root() {
  yield takeLatest(LOGIN, requestLogin);
  yield takeLatest(CHECK_AUTH, validateToken);
  yield takeLatest(LOGOUT, requestLogout);
}
