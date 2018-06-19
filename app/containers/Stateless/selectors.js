import { createSelector } from 'reselect';

/**
 * Direct selector to the stateless domain
 */
const selectLoginDomain = () => (state) => state.get('stateless');


/**
 * Default selector used by stateless
 */
const makeSelectLogin = () => createSelector(
  selectLoginDomain(),
  (substate) => substate.toJS()
);

export default makeSelectLogin;
