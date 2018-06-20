import { fromJS } from 'immutable';

const initialState = fromJS({
  routing: null,
  app: true
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default appReducer;
