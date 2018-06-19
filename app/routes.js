import { getAsyncInjectors } from 'asyncInjectors';
import {browserHistory} from 'react-router';
import React from 'react';

// Load components, sagas, and reducers for routes
import routeImports from './routeImports';

// Handle a specific module load
const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

/**
 * Get a component, inject sagas and reducer
 * @param injectReducer Inject reducer function
 * @param injectSagas Inject sagas function
 * @param container Container being loaded
 */
function getComponent(injectReducer, injectSagas, container) {
  return (nextState, cb) => {
    Promise.all(routeImports[container]())
    .then(([reducer, sagas, component]) => {
      if (reducer) {
        injectReducer(container, reducer.default);
      }
      if (sagas) {
        injectSagas(sagas.default);
      }
      loadModule(cb)(component)
    })
    .catch(err => {
      console.error('Dynamic page loading failed', err)
    });
  }
}

/**
 * Prevent access if no token
 */
function requiresToken() {
  if (!localStorage.getItem('token')) {
    return browserHistory.replace('/login');
  }
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
  const { injectReducer, injectSagas } = getAsyncInjectors(store);
  getComponent = getComponent.bind(null, injectReducer, injectSagas);
  return [
    {path: '/', name: 'app', getComponent: getComponent('app'), onEnter: requiresToken},
    {path: '/login', name: 'login', getComponent: getComponent('login'), onEnter: requiresNoToken},
  ];
}