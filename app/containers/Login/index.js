/**
 * Login container
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Panel, Button, FormControl, FormGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import {makeSelectLoginInfo} from './selectors';
import {login, setProp} from './actions';

import CenterHorizontal from 'components/CenterHorizontal';
import ContentWrapper from 'components/ContentWrapper';
import PageHeader from 'components/PageHeader';
import StatelessButton from 'components/Button';

/**
 * @todo Change all components to React.PureComponent (or even better, stateless functions) before deployment
 */
export class Login extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.login = ::this.login;
    this.setField = ::this.setField;
    this.keyUp = ::this.keyUp;
    this.handleStatelessButtonRoute = ::this.handleStatelessButtonRoute;
    this.handleStatelessButtonClick = ::this.handleStatelessButtonClick;
  }

  /**
   * Handle login
   */
  login() {
    this.props.onLogin();
  }

  /**
   * Try to login
   * @param event
   */
  keyUp(event) {
    if (event.key === 'Enter') {
      this.login();
    }
  }

  /**
   * Set field property
   * @param event
   */
  setField(event) {
    const {value, name} = event.target;
    this.props.onSetProp(value, [name]);
  }

  handleStatelessButtonRoute() {
    this.props.router.go('/stateless');
  }

  handleStatelessButtonClick() {
    console.log('**************CLICK**********');
    console.log(arguments);
  }

  render() {
    const {login} = this.props;
    return (
      <ContentWrapper className="content-wrapper">
        <Helmet
          title="Login"
          meta={[
            { name: 'description', content: 'Description of Login' },
          ]}
        />
        {PageHeader('Login', 'Dynamic reducers, sagas, routing, etc')}
        <Row>
          <Col sm={ 6 } smOffset={3}>
            <StatelessButton href="/stateless" handleRoute={this.handleStatelessButtonRoute} onClick={this.handleStatelessButtonClick}>
            I am stateless
            </StatelessButton>
          </Col>
        </Row>
        <Row>
          <Col sm={ 6 } smOffset={3}>
            <CenterHorizontal>
              <Panel header="Login">
                <form role="form">
                  <FormGroup validationState={login.errors.email ? 'error' : null}>
                    <label className="control-label">{login.errors.email || 'Email'}</label>
                    <FormControl type="email" placeholder="Email" className="form-control" name="username"
                                 onChange={this.setField} onKeyUp={this.keyUp}/>
                  </FormGroup>
                  <FormGroup validationState={login.errors.password ? 'error' : null}>
                    <label className="control-label">{login.errors.password || 'Password'}</label>
                    <FormControl type="password" placeholder="Password" className="form-control" name="password"
                                 onChange={this.setField} onKeyUp={this.keyUp}/>
                  </FormGroup>
                  <Button bsStyle="default" bsSize="small" onClick={this.login}>Login</Button>
                </form>
              </Panel>
            </CenterHorizontal>
          </Col>
        </Row>
      </ContentWrapper>
    );
  }
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  login: makeSelectLoginInfo(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLogin: () => dispatch(login()),
    onSetProp: (...vals) => dispatch(setProp(...vals)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
