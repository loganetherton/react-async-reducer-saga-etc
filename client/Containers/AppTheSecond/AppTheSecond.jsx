import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class AppTheSecond extends Component {
  static propTypes = {
    myFunc: PropTypes.func.isRequired,
    rectangle: PropTypes.shape({
      length: PropTypes.number,
      width: PropTypes.number,
      color: PropTypes.string
    })
  };

  render() {
    return (
      <div>I'm the second component</div>
    );
  }
}