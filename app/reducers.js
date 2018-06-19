/**
 * Combine all reducers in this file and export the combined reducers.
 * @IMPORTANT If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { LOCATION_CHANGE, routerReducer } from 'react-router-redux';

/*
 * react-router-redux 4 requires this.
 * bring into app state
 */
const initialState = fromJS({
  locationBeforeTransitions: null,
});

// Route reducer
function routeReducer(state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload
      });
    default:
      return state;
  }
}

/**
 * Available routers from which to dynamically inject
 * @param asyncReducers
 */
export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    route: routeReducer,
    ...asyncReducers
  });
}
