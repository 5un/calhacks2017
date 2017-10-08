import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import PopupHeader from '../components/PopupHeader';
import MainSection from '../components/MainSection';
import RealtimeAttentionChart from '../components/RealtimeAttentionChart';
import FooterButtonBar from '../components/FooterButtonBar';
import Dashboard from '../components/Dashboard';
import * as TodoActions from '../actions/todos';
import style from './App.css';
import styled from 'styled-components';

const PopupContainer = styled.div`
  padding: 20px;
`

@connect(
  state => ({
    todos: state.todos
  }),
  dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
  })
)
export default class App extends Component {

  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    environment: PropTypes.string
  };

  render() {
    const { todos, actions, environment } = this.props;

    return (
      <div className={style.normal}>
        {/*
        <Header addTodo={actions.addTodo} />
        */}
        {/*
          <MainSection todos={todos} actions={actions} />
        */}
        {(environment === 'dashboard') &&
          <Dashboard />
        }
        {(environment === 'popup') &&
          <PopupContainer>
            <PopupHeader />
            <RealtimeAttentionChart />
          </PopupContainer>
        }   
      </div>
    );
  }
}
