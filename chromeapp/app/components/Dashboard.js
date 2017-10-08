import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { Row, Col, H1, H2, H3, BigDigits } from './Elements';
import { AreaChart, defs, linearGradient, stop, XAxis, YAxis, CartesianGrid, Tooltip, Area,
          BarChart, Legend, Bar, LineChart, Line } from 'recharts';
import DashboardNav from './DashboardNav';
import ActivityList from './ActivityList';
import moment from 'moment';

const DashboardContainer = styled.section`
  margin-top: -20px;
`;

const VisualizationContainer = styled.div`
  padding: 20px;
`;

const DBBox = styled.div`
  margin-bottom: 10px;
`;

const DBBoxHeader = styled.div`
  background-color: rgba(255,255,255,0.1);
  padding: 15px;
`;

const DBBoxBody = styled.div`
  background-color: rgba(255,255,255,0.05);
  padding: 15px;
`;

export default class Dashboard extends Component {

  static propTypes = {};

  constructor(props, context) {
    super(props, context);
    this.state = {
      highFocusActivities: [
        { 
          name: "Scholarly Article 1",
          avg: "82"
        },
        { 
          name: "Research Gate",
          avg: "76"
        },
        { 
          name: "Google",
          avg: "72"
        }
      ],
      lowFocusActivities : [
        { 
          name: "Facebook",
          avg: "40"
        },
        { 
          name: "YouTube",
          avg: "36"
        },
        { 
          name: "GIPHY",
          avg: "22"
        }
      ],
      currentActivities: [
        { name: 'Read', attention: 40, focus: 24 },
        { name: 'Read nyt.com', attention: 30, focus: 13 },
        { name: 'Facebook', attention: 20, focus: 98 },
        { name: 'Doing math', attention: 27, focus: 39 },
        { name: 'Facebook', attention: 18, focus: 48 },
        { name: 'Read Kafka', attention: 23, focus: 38 },
        { name: 'Read 61B', attention: 34, focus: 43 },
      ],
      currentSessionDuration: 0
    };
  }

  extractHostname(url) {
    let hostname;
    if (url.indexOf("://") > -1) {
      hostname = url.split('/')[2];
    } else {
      hostname = url.split('/')[0];
    }
    hostname = hostname.split(':')[0];
    hostname = hostname.split('?')[0];
    return hostname;
  }

  componentDidMount() {

    chrome.tabs.onActivated.addListener(activeInfo => {
      console.log(activeInfo);
      chrome.tabs.get(activeInfo.tabId, (tab) => {
        const host = this.extractHostname(tab.url);
        const newDataPoint = { name: host, attention: this.state.attention || 0, focus: Math.random() * 100, amt: 2100 };
        this.setState({ currentActivities: _.concat(this.state.currentActivities, newDataPoint) });
      });
    });

    setInterval(() => {
      this.setState({ currentSessionDuration: this.state.currentSessionDuration + 1 });
    }, 1000);

    const port = chrome.runtime.connect({ name: 'knockknock2' });
    port.onMessage.addListener((data) => {
      //const data = JSON.parse(event.data);
      const attention = data.attention || 0;
      const attentionRaw = data.raw_attention || 0;
      const beta = data.beta || 0;
      if(attention > 0) {
        this.setState({ attention });
      }
    });
  }

  render() {

    const dataPreviousSession = [
      { name: '1', attention: 4000 },
      { name: '2', attention: 3000 },
      { name: '3', attention: 2000 },
      { name: '4', attention: 2780 },
      { name: '5', attention: 1890 },
      { name: '6', attention: 2390 },
      { name: '7', attention: 3490 },
      { name: '8', attention: 4000 },
      { name: '9', attention: 3000 },
      { name: '10', attention: 2000 },
      { name: '11', attention: 2780 },
      { name: '12', attention: 1890 },
      { name: '13', attention: 2390 },
      { name: '14', attention: 3490 },
      { name: '15', attention: 4000 },
      { name: '16', attention: 3000 },
      { name: '17', attention: 2000 },
      { name: '18', attention: 2780 },
      { name: '19', attention: 1890 },
      { name: '20', attention: 2390 },
      { name: '21', attention: 3490 },
    ];

    const focusDuringDay = [
      { time: '8a', attention: 40 },
      { time: '9a', attention: 42 },
      { time: '10a', attention: 43 },
      { time: '11a', attention: 50 },
      { time: '12p', attention: 60 },
      { time: '1p', attention: 50 },
      { time: '2p', attention: 30 },
      { time: '3p', attention: 20 },
      { time: '4p', attention: 23 },
      { time: '5p', attention: 22 },
      { time: '6p', attention: 33 },
      { time: '7p', attention: 37 },
      { time: '8p', attention: 40 },
      { time: '9p', attention: 41 },
      { time: '10p', attention: 45 },
      { time: '11p', attention: 30 },
      { time: '12p', attention: 17 },
      { time: '1a', attention: 9 },
    ];

    const { lowFocusActivities, highFocusActivities, currentActivities, currentSessionDuration, attention } = this.state;
    const currentAverage = attention;
    console.log(moment);
    console.log(window.moment);
    
    let totalSeconds = currentSessionDuration;
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = ("0" + Math.floor(totalSeconds / 60)).slice(-2);
    const seconds = ("0" + Math.floor(totalSeconds % 60)).slice(-2);


    return (
      <DashboardContainer>
        <DashboardNav />
        <VisualizationContainer>
          <Row style={{ marginBottom: '10px' }}>
            <Col style={{ marginRight: '20px' }}>
              <DBBox>
                <DBBoxHeader>
                  <H2>Attention</H2>
                </DBBoxHeader>
                <DBBoxBody>
                  <AreaChart width={800} height={300} data={currentActivities}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }} >
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    {/* <YAxis /> */}
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <Tooltip />
                    <Area type="monotone" dataKey="attention" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                    <Area type="monotone" dataKey="focus" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                  </AreaChart>
                </DBBoxBody>
              </DBBox>
            </Col>
            <Col>
              <DBBox style={{ width: '330px' }}>
                <DBBoxHeader>
                  <H2>Activities during high focus</H2>
                </DBBoxHeader>
                <DBBoxBody>
                  <ActivityList activities={highFocusActivities} />
                </DBBoxBody>
              </DBBox>

              <DBBox>
                <DBBoxHeader>
                  <H2>Activities during low focus</H2>
                </DBBoxHeader>
                <DBBoxBody>
                  <ActivityList activities={lowFocusActivities} />
                </DBBoxBody>
              </DBBox>
            </Col>
          </Row>
          <Row>
            <Col style={{ marginRight: '20px' }}>
              <DBBox>
                <DBBoxHeader>
                  <H2>Previous Sessions</H2>
                </DBBoxHeader>
                <DBBoxBody>
                  <BarChart width={580} height={200} data={dataPreviousSession}>
                    <XAxis dataKey="name" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="attention" fill="#8884d8" />
                  </BarChart>
                </DBBoxBody>
              </DBBox>
            </Col>
            <Col style={{ marginRight: '20px' }}>
              <DBBox style={{ width: '200px' }}>
                <DBBoxHeader>
                  <H2>Current Session</H2>
                </DBBoxHeader>
                <DBBoxBody>
                  <H3>Durtation</H3>
                  <BigDigits>{hours}:{minutes}:{seconds}</BigDigits>
                  <H3>Average Attention</H3>
                  <BigDigits>{currentAverage}</BigDigits>
                </DBBoxBody>
              </DBBox>
            </Col>
            <Col>
              <DBBox style={{ width: '100%' }}>
                <DBBoxHeader>
                  <H2>Focus Throughout Day</H2>
                </DBBoxHeader>
                <DBBoxBody>
                  <LineChart width={300} height={150} data={focusDuringDay}>
                    <XAxis dataKey="time" />
                    <Line dataKey="attention" stroke="#8884d8" dot={false} />
                  </LineChart>
                </DBBoxBody>
              </DBBox>
            </Col>
          </Row>
        </VisualizationContainer>
      </DashboardContainer>
    );
  }
}
