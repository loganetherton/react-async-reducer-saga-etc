import AppTheSecondReducer from './Containers/AppTheSecond/reducer';
import {combineReducers} from 'redux-immutable';
import { LOCATION_CHANGE, routerReducer } from 'react-router-redux';

const initialState = {
  locationBeforeTransitions: null
}

function routeReducer(state = {}, action) {
   switch (action.type) {
     case LOCATION_CHANGE:
       return state.merge({
         locationBeforeTransitions: action.payload,
       });
     default:
       return state;
   }
}

export function createReducer(asyncReducer) {
  return combineReducers({
    routing: routeReducer,
    app: AppTheSecondReducer,
    ...asyncReducer
  });
}