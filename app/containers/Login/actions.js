import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_PROP
} from './constants';

/**
 * Begin login
 */
export function login() {
  return {
    type: LOGIN
  };
}

/**
 * Dispatched when the user is logged in
 *
 * @param  {string} res Server response
 *
 * @return {object}
 */
export function loginSuccess(res) {
  return {
    type: LOGIN_SUCCESS,
    res
  };
}

/**
 * Dispatched when login failed
 *
 * @param  {object} errors The error
 *
 * @return {object}
 */
export function loginFail(errors) {
  return {
    type: LOGIN_FAIL,
    errors,
  };
}

/**
 * Set a property
 *
 * @param  {string} value Field value
 * @param {array} path Prop path
 *
 * @return {object}
 */
export function setProp(value, path) {
  return {
    type: SET_PROP,
    value,
    path
  };
}
