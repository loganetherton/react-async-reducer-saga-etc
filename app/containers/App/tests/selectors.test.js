import { fromJS } from 'immutable';

import {
  makeSelectLocationState,
  makeSelectApp,
  appDomain
} from '../selectors';

describe('makeSelectLocationState', () => {
  const locationStateSelector = makeSelectLocationState();
  it('should select the route as a plain JS object', () => {
    const route = fromJS({
      locationBeforeTransitions: null,
    });
    const mockedState = fromJS({
      route,
    });
    expect(locationStateSelector(mockedState)).toEqual(route.toJS());
  });
});

describe('makeSelectApp', function () {
  const appSelector = makeSelectApp();
  const subState = {
    state: 'functional'
  };
  const appState = {
    app: subState,
  };
  const mockedState = fromJS(appState);
  expect(appSelector(mockedState)).toEqual(subState);
});
