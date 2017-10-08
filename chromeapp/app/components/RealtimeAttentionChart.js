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
      attentionHistory: [],
      attentionRawHistory: [],
      betaHistory: [],
    };
  }

  componentDidMount() {
    const port = chrome.runtime.connect({ name: 'knockknock' });
    port.onMessage.addListener((data) => {
      //const data = JSON.parse(event.data);
      const attention = data.attention || 0;
      const attentionRaw = data.raw_attention || 0;
      const beta = data.beta || 0;
      this.setState({
        attention,
        attentionHistory: _.concat(this.state.attentionHistory, parseInt(attention, 10)),
        attentionRaw,
        attentionRawHistory: _.concat(this.state.attentionRawHistory, parseInt(attentionRaw, 10)),
        beta,
        betaHistory: _.concat(this.state.betaHistory, parseInt(beta, 10)),
      });
    });
  }


  render() {
    const { attention, attentionRaw, beta, attentionHistory, 
      attentionRawHistory, betaHistory,
    } = this.state;
    return (
      <section>
        <h2>Attention</h2>
        <div>Attention: {attention}</div>
        <Sparklines data={attentionHistory} limit={20}>
          <SparklinesLine color="rgb(255,255,255)" />
          <SparklinesSpots />
        </Sparklines>
        <div>Attention Raw: {attentionRaw}</div>
        <Sparklines data={attentionRawHistory} limit={20}>
          <SparklinesLine color="rgb(255,255,255)" />
          <SparklinesSpots />
        </Sparklines>
        <div>Beta: {beta}</div>
        <Sparklines data={betaHistory} limit={20}>
          <SparklinesLine color="rgb(255,255,255)" />
          <SparklinesSpots />
        </Sparklines>
      </section>
    );
  }
}
