import { fromJS } from 'immutable';
import _ from 'lodash';

import {
  LOGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  SET_PROP,
  TEST,
} from './constants';

const errorInterface = {
  email: null,
  password: null
};

const initialState = fromJS({
  username: '',
  password: '',
  loginFailed: false,
  errors: Object.assign({}, errorInterface)
});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    /**
     * Set a property
     */
    case SET_PROP:
      return state.setIn(action.path, action.value);
    case LOGIN:
      return state
        .set('loginFailed', null);
    case LOGIN_SUCCESS:
      const token = action.res.token;
      localStorage.setItem('token', token);
      return state
        .set('loginFailed', false);
    case LOGIN_FAIL:
      console.log('**************LOGIN FAIL**********');
      console.log(action);
      const display = {};
      action.errors.map(err => {
        const errKey = err.source.parameter.split(',')[1];
        display[errKey] = _.capitalize(err.title.replace(/this field/i, errKey));
      });
      return state
        .set('loginFailed', true)
        .set('errors', fromJS(display));
    default:
      return state;
  }
}

export default loginReducer;
