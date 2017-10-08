import React, { Component, PropTypes } from 'react';
import _ from 'lodash'

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
        <button onClick={this.handleDashboardButtonClicked.bind(this)}>Dashboard</button>
      </footer>
    );
  }
}
