import React from 'react';
import { shallow } from 'enzyme';

import { App } from '../index';

describe('<App />', () => {
  it('should render the App', () => {
    const renderedComponent = shallow(
    <App />
    );
    expect(renderedComponent.length).toBe(1);
  });

  it('should render its children', () => {
    const children = (<h1>Test</h1>);
    const renderedComponent = shallow(
    <App>
      {children}
    </App>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });

  it('should render a div named "wrapper"', () => {
    const renderedComponent = shallow(
    <App />
    );
    expect(renderedComponent.find('div').length).toBe(1);
  });
});
