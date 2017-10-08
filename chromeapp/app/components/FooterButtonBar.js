import React, { Component, PropTypes } from 'react';
import _ from 'lodash'
import { Button } from './Elements'

export default class RealtimeAttentionChart extends Component {

  static propTypes = {};

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  handleDashboardButtonClicked() {
    // chrome.tabs.create({ url: "https://berkeley.edu" });
    chrome.windows.create({
      type: 'panel',
      url: 'dashboard.html'
    });
  }

  render() {
    
    return (
      <footer>
        <Button onClick={this.handleDashboardButtonClicked.bind(this)}>Dashboard</Button>
      </footer>
    );
  }
}
