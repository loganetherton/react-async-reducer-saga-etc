import conformsTo from 'lodash/conformsTo';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import invariant from 'invariant';
import warning from 'warning';
import createReducer from './reducers';

// Explanation of why to use import rather than require
// @link https://github.com/webpack/webpack/issues/1973#issuecomment-185744317
const routeImports = {
  app: () => [
    import('./Containers/App/reducer'),
    import('./Containers/App/sagas'),
    import('./Containers/App'),
  ]
};


/**
 * Validate the shape of redux store
 */
export function checkStore(store) {
  const shape = {
    dispatch: isFunction,
    subscribe: isFunction,
    getState: isFunction,
    replaceReducer: isFunction,
    runSaga: isFunction,
    asyncReducers: isObject,
  };
  invariant(conformsTo(store, shape), '(app/utils...) asyncInjectors: Expected a valid redux store');
}

/**
 * Inject an asynchronously loaded reducer
 */
export function injectAsyncReducer(store, isValid) {
  console.log('**************2**********');
  return function injectReducer(name, asyncReducer) {
    if (!isValid) {
      checkStore(store);
    }

    invariant(isString(name) && !isEmpty(name) && isFunction(asyncReducer),
    '(app/utils...) injectAsyncReducer: Expected `asyncReducer` to be a reducer function');

    if (Reflect.has(store.asyncReducers, name)) {
      return;
    }

    store.asyncReducers[name] = asyncReducer; // eslint-disable-line no-param-reassign
    store.replaceReducer(createReducer(store.asyncReducers));
  };
}

/**
 * Inject an asynchronously loaded saga
 */
export function injectAsyncSagas(store, isValid) {
  return function injectSagas(sagas) {
    if (!isValid) {
      checkStore(store);
    }

    invariant(Array.isArray(sagas),
    '(app/utils...) injectAsyncSagas: Expected `sagas` to be an array of generator functions');

    warning(!isEmpty(sagas), '(app/utils...) injectAsyncSagas: Received an empty `sagas` array');

    sagas.map(store.runSaga);
  };
}

/**
 * Helper for creating injectors
 */
export function getAsyncInjectors(store) {
  checkStore(store);

  console.log('**************3**********');
  return {
    injectReducer: injectAsyncReducer(store, true),
    injectSagas: injectAsyncSagas(store, true),
  };
}

/**
 * Get a component, inject sagas and reducer
 * @param injectReducer Inject reducer function
 * @param injectSagas Inject sagas function
 * @param container Container being loaded
 */
function getComponent(injectReducer, injectSagas, container) {
  console.log('*************4**********');
  return (nextState, cb) => {
    Promise.all(routeImports[container]())
    .then(([reducer, sagas, component]) => {
      if (reducer) {
        console.log('**************5**********');
        injectReducer(container, reducer.default);
      }
      if (sagas) {
        injectSagas(sagas.default);
      }
      loadModule(cb)(component)
    })
    .catch(errorLoading);
  }
}



export default function createRoutes(store) {
  console.log('**************6**********');
  const { injectReducer, injectSagas } = getAsyncInjectors(store);
  console.log('**************7**********');

  getComponent = getComponent.bind(null, injectReducer, injectSagas);

  return [
    {
      path: '/', name: 'app', getComponent: getComponent('app')
    }
  ];
}