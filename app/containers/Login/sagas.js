/**
 * Handle login
 */

import {take, call, put, select, cancel, takeLatest, takeEvery} from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';
import {browserHistory} from 'react-router';

import {LOGIN, LOGIN_SUCCESS, SET_PROP} from 'containers/Login/constants';
import {loginSuccess, loginFail} from './actions';
import request from 'doRequest';
import {makeSelectLoginCredentials} from './selectors';

/**
 * Handle login requests
 */
export function* handleLogin() {
  // Select credentials from store
  const credentials = yield select(makeSelectLoginCredentials());
  const opts = {
    url: 'login',
    method: 'POST',
    body: credentials
  };
  try {
    const res = yield call(request, opts);
    yield put(loginSuccess(res));
  } catch (err) {
    yield put(loginFail(err.errors));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* login() {
  // Handle login
  const watcher = yield takeLatest(LOGIN, handleLogin);
  // Redirect on success
  yield takeEvery(LOGIN_SUCCESS, () => {
    browserHistory.push('/');
  });

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  login,
];
