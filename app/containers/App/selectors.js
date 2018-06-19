import { createSelector } from 'reselect';
/**
 * App domain state
 */
const appDomain = () => (state) => state.get('app');

/**
 * App selector
 */
const makeSelectApp = () => createSelector(
  appDomain(),
  substate => substate.toJS()
);

// makeSelectLocationState expects a plain JS object for the routing state
const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  appDomain,
  makeSelectApp,
  makeSelectLocationState,
};
