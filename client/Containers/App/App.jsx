import React, {Component} from 'react';

import {AppTheSecond} from '../AppTheSecond';

export default class App extends Component {
  constructor() {
    super();

    this.hello = ::this.hello;
    this.state = {
      a: 'a'
    }
  }

  hello() {
    return 'hello';
  }

  render() {
    return (
    <div>
      First component
      <AppTheSecond myFunc={this.hello}/>
    </div>);
  }
}