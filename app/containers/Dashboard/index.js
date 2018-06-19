import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
import {browserHistory} from 'react-router';

import {makeSelectLocationState, makeSelectApp} from './selectors';

export class Dashboard extends React.Component {

  static propTypes = {
    children: PropTypes.node
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
        <div>{React.Children.toArray(this.props.children)}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
