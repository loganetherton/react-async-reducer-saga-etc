import {applyMiddleware} from 'react';
import {createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {routerMiddleware} from 'react-router-redux';
import {fromJS} from 'immutable';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}, history) {
  console.log('**************1**********');
  const middleware = [
    sagaMiddleware,
    routerMiddleware(history)
  ];
  console.log('**************20**********');
  console.log(middleware);

  const enhancers = [
    applyMiddleware(middleware)
  ];

  // const composeEnhancers = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
  //                         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
  //                         compose;

  console.log('**************2**********');
  const store = createStore(
    createReducer(),
    fromJS(initialState),
    // composeEnhancers(...enhancers)
  );

  store.runSaga = sagaMiddleware.run;
  store.asyncReducers = {};

  if (module.hot) {
    console.log('**************3**********');
    module.hot.accept('./reducers', () => {
      import('./reducers').then(reducerModule => {
        const createReducer = reducerModule.default;
        const nextReducer = createReducer(store.asyncReducers);

        store.replace(nextReducer);
      })
    })
  }
  console.log('**************4**********');
}