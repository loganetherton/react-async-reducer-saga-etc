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
  loginSuccess: false,
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
        .remove('loginSuccess');
    case LOGIN_SUCCESS:
      const token = action.res.attributes.token;
      localStorage.setItem('token', token);
      return state
        .set('loginSuccess', true)
        .set('errors', fromJS(errorInterface));
    case LOGIN_FAIL:
      const display = {};
      action.errors.map(err => {
        const errKey = err.source.parameter.split(',')[1];
        display[errKey] = _.capitalize(err.title.replace(/this field/i, errKey));
      });
      return state
        .set('loginSuccess', false)
        .set('errors', fromJS(display));
    default:
      return state;
  }
}

export default loginReducer;
