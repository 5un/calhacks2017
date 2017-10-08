import React, { PropTypes, Component } from 'react';
import styled from 'styled-components';
import { Button } from './Elements'

const AppIcon = styled.img`
  height: 50px;
  vertical-align: middle;
  margin-right: 10px;
`;

const TopRightButtons = styled.div`
  float: right;
`;

export default class PopupHeader extends Component {

  static propTypes = {
    addTodo: PropTypes.func.isRequired
  };

  handleSave = (text) => {
    if (text.length !== 0) {
      this.props.addTodo(text);
    }
  };

  handleDashboardButtonClicked() {
    chrome.windows.create({
      type: 'panel',
      url: 'dashboard.html'
    });
  }

  render() {
    return (
      <header>
        <TopRightButtons>
          <Button onClick={this.handleDashboardButtonClicked.bind(this)}>Dashboard</Button>
        </TopRightButtons>
        <h1><AppIcon src="/img/icon-brain.png" />FOCUS</h1>
      </header>
    );
  }
}
