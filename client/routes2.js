import { getAsyncInjectors } from 'asyncInjectors';
import {browserHistory} from 'react-router';
import React from 'react';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

// Load components, sagas, and reducers for routes
import routeImports from 'routeImports2';

/**
 * Get a component, inject sagas and reducer
 * @param injectReducer Inject reducer function
 * @param injectSagas Inject sagas function
 * @param container Container being loaded
 */
function getComponent(injectReducer, injectSagas, container) {
  console.log('**************8**********');
  console.log(container);
  return (nextState, cb) => {
    Promise.all(routeImports[container]())
    .then(([reducer, sagas, component]) => {
      if (reducer) {
        console.log('**************10**********');
        console.log(container);
        console.log(reducer);
        console.log(reducer.default);
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

/**
 * Prevent access if no token
 */
function requiresToken() {
  // if (!localStorage.getItem('token')) {
  //   return browserHistory.replace('/login');
  // }
}

/**
 * Prevent access if token
 */
function requiresNoToken() {
  if (localStorage.getItem('token')) {
    return browserHistory.goBack();
  }
}

/**
 * This is where the main routing of the application takes place. Each top level route (for example, /orders or /products)
 * is defined in one of the objects below. Nested routes (eg /orders/123) are defined within the container
 * @param store Reducer/saga store
 */
export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  console.log('**************11**********');
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars
  console.log('**************12**********');
  getComponent = getComponent.bind(null, injectReducer, injectSagas);
  return [
    {path: '/', name: 'app', getComponent: getComponent('app')},
  ];
}
