import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {makeSelectLocationState, makeSelectApp} from './selectors';

/**
 * @IMPORTANT The connect decorator is not officially supported, and it is in fact considered
 * legacy. I only have it here to demonstrate the way that it works. It is not recommended in production
 */
@connect(() => (createStructuredSelector({
  app: makeSelectApp(),
  location: makeSelectLocationState()
})), {})
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

// const mapStateToProps = createStructuredSelector({
//   app: makeSelectApp(),
//   location: makeSelectLocationState(),
// });

// function mapDispatchToProps(dispatch) {
//   return {};
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(App);
