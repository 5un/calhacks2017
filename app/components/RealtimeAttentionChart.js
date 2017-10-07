import React, { Component, PropTypes } from 'react';
import TodoItem from './TodoItem';
import Footer from './Footer';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';
import style from './MainSection.css';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines'
import _ from 'lodash'

export default class RealtimeAttentionChart extends Component {

  static propTypes = {};

  constructor(props, context) {
    super(props, context);
    this.state = { 
      attentionHistory: []
    };
  }

  componentDidMount() {
    const { attentionHistory } = this.state;
    var socket = new WebSocket("wss://246b33f7.ngrok.io");
    console.log(socket);
    socket.onopen = (event) => {
      console.log('socket open');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      console.log(data);
      if (data.attention) {
        this.setState({ 
          attention: data.attention,
          attentionHistory: _.concat(this.state.attentionHistory, parseInt(data.attention, 10))
        })
      }
    }
  }


  render() {
    const { attention, attentionHistory } = this.state;
    return (
      <section>
        <h2>Attention</h2>
        <div>{attentionHistory.join(',')}</div>
        <Sparklines data={attentionHistory} limit={20}>
          <SparklinesLine color="#1c8cdc" />
          <SparklinesSpots />
        </Sparklines>
      </section>
    );
  }
}
