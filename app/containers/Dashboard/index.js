import React, {PropTypes} from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
import {browserHistory} from 'react-router';

import {makeSelectLocationState, makeSelectApp} from './selectors';

export class App extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    router: PropTypes.object.isRequired
  };

  constructor() {
    super();

    this.logout = ::this.logout;
  }

  logout() {
    const {router} = this.props;
    localStorage.removeItem('token');
    router.go('/');
  }

  render() {
    return (
      <div className="wrapper">
        <Button onClick={this.logout}>Logout</Button>
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
