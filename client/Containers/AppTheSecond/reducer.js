import {fromJs} from 'immutable';

import {SECOND_APP_CONSTANT} from './constants';

const initialState = {
  myProp: ''
};

export default function AppTheSecondReducer(state = fromJs(initialState), action) {
  switch (action.type) {
    case SECOND_APP_CONSTANT:
      return state.set('myProp', action.val);
  }
}

export function modifyMyProp(val) {
  return {
    type: SECOND_APP_CONSTANT,
    val
  };
}