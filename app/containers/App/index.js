import React, {PropTypes} from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import {makeSelectLocationState, makeSelectApp} from './selectors';

export class App extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    router: PropTypes.object.isRequired
  };

  render() {
    const {children} = this.props;
    return (
      <div className="wrapper">
        {React.Children.toArray(children)}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  app: makeSelectApp(),
  location: makeSelectLocationState(),
});

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
