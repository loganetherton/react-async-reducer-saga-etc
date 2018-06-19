import { fromJS } from 'immutable';

const initialState = fromJS({});

function statelessReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default statelessReducer;
