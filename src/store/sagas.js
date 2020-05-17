import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { UserTypes } from '../store/ducks/user';
import { userLogin } from '../services/api';

const { LOGIN, UPDATE_USER } = UserTypes;

// worker Saga: will be fired on LOGIN actions
function* requestLogin(payload) {
  const response = yield call(userLogin, payload);

  if (response?.status) {
    const {
      data: {
        data: { email, name },
      },
      headers: { 'token-type': tokenType, 'access-token': accessToken, client, uid },
    } = response;

    // TODO: update 'auth' duck or something with the data below...
    //        ...to be used on every API request (also save and get from cookies)
    console.log('tokenType, accessToken, client, uid ->', tokenType, accessToken, client, uid);

    yield put({ type: UPDATE_USER, email, name });
    yield put(push('/administrative'));
  }
}

// Starts requestLogin on the last LOGIN action dispatched
export default function* root() {
  yield takeLatest(LOGIN, requestLogin);
}
