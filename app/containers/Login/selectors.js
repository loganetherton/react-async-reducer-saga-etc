import { createSelector } from 'reselect';

/**
 * Direct selector to the login state domain
 */
const selectLoginDomain = () => (state) => state.get('login');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Login
 */
const makeSelectLogin = () => createSelector(
  selectLoginDomain(),
  (substate) => substate.toJS()
);

const makeSelectLoginInfo = () => createSelector(
  selectLoginDomain(),
  (substate) => ({
    email: substate.get('username'),
    password: substate.get('password'),
    errors: substate.get('errors').toJS()
  })
);

/**
 * Credentials for API call
 */
const makeSelectLoginCredentials = () => createSelector(
selectLoginDomain(),
(substate) => ({
  email: substate.get('username'),
  password: substate.get('password')
})
);

export default makeSelectLogin;
export {
  selectLoginDomain,
  makeSelectLoginInfo,
  makeSelectLoginCredentials
};
