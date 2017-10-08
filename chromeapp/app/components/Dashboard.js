import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { Row, Col, H1, H2, H3, BigDigits } from './Elements';
import { AreaChart, defs, linearGradient, stop, XAxis, YAxis, CartesianGrid, Tooltip, Area,
          BarChart, Legend, Bar, LineChart, Line } from 'recharts';
import DashboardNav from './DashboardNav';
import ActivityList from './ActivityList';

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
      ]
    };
  }

  render() {
    // const {} = this.state;
    const data = [
      { name: 'Read', attention: 4000, focus: 2400, amt: 2400 },
      { name: 'Read nyt.com', attention: 3000, focus: 1398, amt: 2210 },
      { name: 'Facebook', attention: 2000, focus: 9800, amt: 2290 },
      { name: 'Doing math', attention: 2780, focus: 3908, amt: 2000 },
      { name: 'Facebook', attention: 1890, focus: 4800, amt: 2181 },
      { name: 'Read Kafka', attention: 2390, focus: 3800, amt: 2500 },
      { name: 'Read 61B', attention: 3490, focus: 4300, amt: 2100 },
    ];

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

    const { lowFocusActivities, highFocusActivities } = this.state;
    const currentSessionDuration = '2:31:05';
    const currentAverage = 76;

    return (
      <DashboardContainer>
        <DashboardNav />
        <VisualizationContainer>
          <Row style={{ marginBottom: '10px' }}>
            <Col>
              <h2>Attention</h2>
              <AreaChart width={820} height={300} data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
            </Col>
            <Col>
              <DBBox>
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
              <h2>Previous Sessions</h2>
              <BarChart width={580} height={200} data={dataPreviousSession}>
                <XAxis dataKey="name" />
                <Tooltip />
                <Legend />
                <Bar dataKey="attention" fill="#8884d8" />
              </BarChart>
            </Col>
            <Col style={{ marginRight: '20px' }}>
              <DBBox style={{ width: '200px' }}>
                <DBBoxHeader>
                  <H2>Current Session</H2>
                </DBBoxHeader>
                <DBBoxBody>
                  <H3>Durtation</H3>
                  <BigDigits>{currentSessionDuration}</BigDigits>

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
