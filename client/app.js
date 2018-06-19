// Needed for redux-saga es6 generator support
import 'babel-polyfill';

import {App} from 'Containers/App';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';

import { makeSelectLocationState } from 'rootSelector';

import configureStore from 'configureStore2';

import createRoutes from 'routes2';

const initialState = {};
const store = configureStore(initialState, browserHistory);

export default store;

// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: makeSelectLocationState(),
});

// Set up the router, wrapping all Routes in the Root component
const rootRoute = {
  component: App,
  childRoutes: createRoutes(store),
};

const render = () => {
  ReactDOM.render(
  <Provider store={store}>
    <Router
    history={history}
    routes={rootRoute}
    render={
      // Scroll to top when going to a new page, imitating default browser
      // behaviour
      applyRouterMiddleware()
    }
    />
  </Provider>,
  document.getElementById('root')
  );
};

render();

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}



// const initialState = {};
// const store = configureStore(initialState, browserHistory);

// export default store;




// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state
// const history = syncHistoryWithStore(browserHistory, store, {
//   selectLocationState: makeSelectLocationState(),
// });
//
// // Set up the router, wrapping all Routes in the Root component
// const rootRoute = {
//   component: Root,
//   childRoutes: createRoutes(store),
// };

// const render = () => {
//   ReactDOM.render(
//   <Provider store={store}>
//     <Router
//     history={history}
//     routes={rootRoute}
//     render={
//       // Scroll to top when going to a new page, imitating default browser
//       // behaviour
//       applyRouterMiddleware(useScroll())
//     }
//     />
//   </Provider>,
//   document.getElementById('root')
//   );
// };
//
// render();

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}