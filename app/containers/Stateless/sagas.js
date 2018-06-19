/**
 * Handle login
 */

import {take} from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';

/**
 * Root saga manages watcher lifecycle
 */
export function* noop() {
  yield take(LOCATION_CHANGE);
  console.log('**************LOCATION CHANGE**********');
}

// Bootstrap sagas
export default [
  noop,
];
